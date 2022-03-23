import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";
import {
  refreshToken,
  getToken,
  checkToken,
  getLoginURI,
} from "../google/apis/auth";

const authRouter = Router();

authRouter.get("/auth/signup", signup);
authRouter.get("/auth/signin", signin);

authRouter.get("/auth/login-uri", (req, res) => {
  getLoginURI(req.query as any)
    .then((url) => {
      return res.status(200).json(url);
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

authRouter.post("/auth/tokeninfo", (req, res) => {
  checkToken(req.body.accessToken)
    .then((payload) => {
      return res.status(200).json(payload);
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

authRouter.post("/auth/refresh", (req, res) => {
  refreshToken(req.body.email)
    .then((payload) => {
      return res.status(200).json(payload);
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

authRouter.post("/auth/token", (req, res) => {
  getToken(req.body)
    .then((payload) => {
      res.status(200).json(payload);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    });
});

export default authRouter;
