import { Router } from "express";
import { DocModel } from "../models/doc.model";

const docRouter = Router();

docRouter.get("/docs", (req, res) => {
  const { tag } = req.query;
  DocModel.find({ tag })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

docRouter.post("/docs", (req, res) => {
  DocModel.create(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

docRouter.patch("/docs/:docId", (req, res) => {
  const { docId } = req.params;
  DocModel.updateOne(
    {
      id: docId,
    },
    req.body
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
});

docRouter.delete("/docs/:docId", (req, res) => {
  const { docId } = req.query;
  DocModel.deleteOne({
    id: docId,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

export default docRouter;
