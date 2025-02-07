const express = require("express");
const prodRouter = express.Router();
const { ProdModel } = require("../models/prodmodel");

prodRouter.post("/add", (req, res) => {
  const { name, description, price } = req.body;
  const prod = new ProdModel({ name, description, price });
  prod.save();
  res
    .status(201)
    .json({ message: "Product created" })
    .catch((err) => res.status(500).json({ message: err.message }));
});

prodRouter.get("/", (req, res) => {
  ProdModel.find().then((products) => {
    res.status(200).json(products);
  });
});

prodRouter.put("/update/:id", (req, res) => {
  const { name, description, price } = req.body;
  ProdModel.findByIdAndUpdate(req.params.id, { name, description, price })
    .then(() => {
      res.status(200).json({ message: "Product updated" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

prodRouter.delete("/delete/:id", (req, res) => {
  ProdModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Product deleted" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = { prodRouter };
