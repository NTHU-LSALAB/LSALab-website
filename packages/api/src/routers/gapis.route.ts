import { Router } from "express";
import multiparty from "multiparty";
import { listEvent } from "../google/apis/calendar";
import {
  createFile,
  deleteFile,
  listFile,
  listFolder,
  updateFile,
} from "../google/apis/drive";

const gapisRouter = Router();

gapisRouter.get("/events", (req, res) => {
  const { month, year } = req.params as { month: number; year: number };
  listEvent(year, month)
    .then((items) => res.status(200).json(items))
    .catch(() => res.send("Error"));
});

gapisRouter.delete("/files/:fileId", (req, res) => {
  const { fileId } = req.params;
  deleteFile(fileId, req.headers.authorization!)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(err.code).json({ message: err });
    });
});

gapisRouter.patch("/files/:fileId", (req, res) => {
  const { fileId } = req.params;
  updateFile(fileId, req.body, req.headers.authorization!)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(err.code).json({ message: err });
    });
  //   let form = new multiparty.Form();
  //   form.parse(req, function (err, fields, _) {
  //     if (err) {
  //       res.status(200).json({ message: err });
  //     }
  //     updateFile(fields)
  //       .then((slide) => {
  //         console.log(slide);
  //         res.status(200).json(slide);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(400).json({ message: err });
  //       });
  //   });
});

gapisRouter.post("/files", (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function (err, params, files) {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    Object.keys(params).forEach(
      (key: string) => (params[key] = params[key][0])
    );
    Object.keys(files).forEach((key: string) => (files[key] = files[key][0]));
    createFile(params, files["file"], req.headers.authorization!)
      .then((slide) => {
        res.status(200).json(slide);
      })
      .catch((err) => {
        res.status(err.code).json({ message: err.message });
      });
  });
});

gapisRouter.get("/folders", (req, res) => {
  const { folderName } = req.query as any;
  listFolder(folderName)
    .then((file) => {
      res.status(200).json(file);
    })
    .catch((err) => {
      res.status(err.code).json({ message: err });
    });
});

gapisRouter.get("/files", (req, res) => {
  const params: any = req.query;
  const { folderId } = params;
  listFile(folderId)
    .then((file) => {
      res.status(200).json(file);
    })
    .catch((err) => {
      res.status(err.code).json({ message: err });
    });
});

export default gapisRouter;
