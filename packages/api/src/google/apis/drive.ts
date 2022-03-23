import { createReadStream } from "fs";
import { google } from "googleapis";

// service account
const auth = new google.auth.GoogleAuth({
  keyFile: "key.json",
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.metadata",
    "https://www.googleapis.com/auth/drive.photos.readonly",
  ],
});

const folderMapping: any = {
  "group meeting": "1g_Tx9n7wGu_Z3BT1Fug7kmdnVptnVNwl",
  photo: "0B1ClbR-jUXR9ODZrQWR4Sm9JTVE",
};

export async function listFolder(folderName = "group meeting") {
  const drive = google.drive({
    version: "v3",
    auth,
  });
  var {
    data: { id },
  } = await drive.files.get({
    fileId: folderMapping[folderName],
  });
  const folderId = id;
  var {
    data: { files },
  } = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields:
      "files/id, files/mimeType, files/name, files/webViewLink, files/modifiedTime, files/owners, files/parents",
  });
  let directories: any[] = [];

  let promiseList = [];
  if (!files) return directories;
  for (let file of files) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      promiseList.push(
        new Promise(async (resolve) => {
          if (folderName === "photo") {
            let tryCount = 0;
            let hasFile = false;
            let preview = null;
            let pageToken: string | undefined = undefined;
            while (!hasFile && tryCount < 5) {
              let {
                data: { files, nextPageToken },
              } = await drive.files.list({
                q: `'${file.id}' in parents`,
                pageSize: 2,
                pageToken,
                fields: "files/id, files/thumbnailLink",
              });
              pageToken = nextPageToken as string;
              if (files && files[0]) {
                preview = files[0];
                break;
              }
              tryCount++;
            }
            directories.push({
              id: file.id,
              name: file.name,
              preview,
            });
          } else {
            directories.push({
              id: file.id,
              name: file.name,
            });
          }
          resolve(0);
        })
      );
    }
  }
  await Promise.all(promiseList);
  return directories;
}

export async function listFile(folderId: string) {
  const drive = google.drive({
    version: "v3",
    auth,
  });
  if (!folderId) {
    return;
  }

  const {
    data: { files },
  } = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields:
      "files/id, files/mimeType, files/name, files/webViewLink, files/webContentLink, files/modifiedTime, files/owners, files/parents",
  });
  let _files = [];

  if (!files) return;
  for (let file of files) {
    if (file.mimeType !== "application/vnd.google-apps.folder") {
      _files.push(file);
    }
  }
  return _files;
}

export async function updateFile(
  fileId: string,
  requestBody: any,
  token: string
) {
  const drive = google.drive({
    version: "v3",
    headers: {
      Authorization: token,
    },
  });
  const { data } = await drive.files.update({
    fileId,
    requestBody,
  });
  return data;
}

export async function createFile(requestBody: any, file: any, token: string) {
  if (!file) throw new Error("no file found");
  const { title, mimeType, folderId } = requestBody;
  const drive = google.drive({
    version: "v3",
    headers: {
      Authorization: token,
    },
  });
  const { data } = await drive.files.create(
    {
      requestBody: {
        name: title,
        mimeType,
        parents: [folderId],
      },
      media: {
        body: createReadStream(file.path),
      },
      fields: "id, webViewLink, parents",
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: (evt) => {
        // const progress = (evt.bytesRead / fileSize) * 100;
        // readline.clearLine(process.stdout, 0);
        // readline.cursorTo(process.stdout, 0);
        // process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  );
  return data;
}

export async function deleteFile(fileId: string, token: string) {
  const drive = google.drive({
    version: "v3",
    headers: {
      Authorization: token,
    },
  });
  const { data } = await drive.files.delete({
    fileId,
  });
  return data;
}
