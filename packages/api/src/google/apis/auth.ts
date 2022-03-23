import axios from "axios";
import bcrypt from "bcrypt";
import { google } from "googleapis";
import { UserModel } from "../../models/user.model";

export async function getLoginURI({ redirect_uri }: { redirect_uri: string }) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirect_uri
  );
  const scopes = [
    "https://www.googleapis.com/auth/plus.me",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.metadata",
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes.join(" "),
    prompt: "consent",
  });
  return url;
}

export async function refreshToken(email: string) {
  const user = await UserModel.findOne({ email });
  if (!user) throw Error("user not found");
  console.log(user.googleRefreshToken);
  var { data } = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: user.googleRefreshToken,
  });
  const { access_token } = data;
  // await user.save();
  return {
    access_token,
  };
}

export async function checkToken(token: string) {
  try {
    var { data } = await axios.post(
      "https://oauth2.googleapis.com/tokeninfo",
      null,
      {
        params: {
          access_token: token,
        },
      }
    );
    return data;
  } catch ({
    response: {
      data: { error },
    },
  }) {
    return error;
  }
}

export async function getToken({
  code,
  redirect_uri,
}: {
  code: string;
  redirect_uri: string;
}) {
  // get tokens by code
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirect_uri
  );
  const { tokens } = await oauth2Client.getToken(code);
  const { access_token, refresh_token, token_type } = tokens;
  // get profile by tokens
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token });
  const oauth2 = google.oauth2({
    version: "v2",
    auth,
  });
  const { data } = await oauth2.userinfo.get();

  const { email } = data;

  const user = await UserModel.findOne({ email });
  if (user) {
    if (refresh_token) {
      user.googleRefreshToken = refresh_token!;
      await user.save();
    }
  } else {
    await UserModel.create({
      username: `googlelogin-${Date.now()}`,
      email: email,
      googleRefreshToken: refresh_token,
      password: bcrypt.hashSync(Date.now().toString(), 8),
    });
  }
  return {
    access_token,
    me: data,
  };
}
