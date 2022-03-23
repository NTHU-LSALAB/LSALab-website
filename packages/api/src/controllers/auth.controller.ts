import { RequestHandler } from "express";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup: RequestHandler = (req, res) => {
  // Save User to Database
  UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user: User) => {
      console.log(user);
      res.status(200).send({ message: "User was registered successfully!" });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    });
};

export const signin: RequestHandler = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid: boolean) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error: any) => {
          console.log(error);
          res.status(400).json({
            message: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
};
