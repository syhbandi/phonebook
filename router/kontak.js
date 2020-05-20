const express = require("express");
const Kontak = require("../models/Kontak");

const router = express.Router();

router.use(function (req, res, next) {
  // this middleware will call for each requested
  // and we checked for the requested query properties
  // if _method was existed
  // then we know, clients need to call DELETE request instead
  if (req.query._method == "DELETE") {
    // change the original METHOD
    // into DELETE method
    req.method = "DELETE";
    // and set requested url to /user/12
    req.url = req.path;
  }
  next();
});

router.get("/", async (req, res) => {
  try {
    const kontak = await Kontak.find({}).sort({ namaDepan: "asc" });
    res.render("kontak/index", { kontak });
  } catch (err) {
    console.log(err);
  }
});

router.get("/tambah", (req, res) => {
  res.render("kontak/tambah");
});

router.post("/tambah", async (req, res) => {
  const { namaDepan, namaBelakang, noHp, email, alamat } = req.body;
  const kontak = new Kontak({
    namaDepan,
    namaBelakang,
    noHp,
    email,
    alamat,
  });
  try {
    await kontak.save();
    res.redirect("/kontak");
  } catch (error) {
    console.log(error);
  }
});

router.get("/ubah/:id", async (req, res) => {
  try {
    const kontak = await Kontak.findById(req.params.id);
    res.render("kontak/ubah", { kontak });
  } catch (error) {
    res.redirect("/kontak");
  }
});

router.put("/ubah/:id", async (req, res) => {
  const { namaDepan, namaBelakang, noHp, email, alamat } = req.body;
  try {
    const update = await Kontak.updateOne(
      { _id: req.params.id },
      {
        $set: {
          namaDepan,
          namaBelakang,
          noHp,
          email,
          alamat,
        },
      }
    );
    res.redirect("/kontak");
  } catch (error) {
    return new Error(error);
  }
});

router.delete("/hapus/:id", async (req, res) => {
  try {
    const hapus = await Kontak.findByIdAndRemove(req.params.id);
    res.redirect("/kontak");
  } catch (error) {
    return new Error(error);
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const kontak = await Kontak.findById(req.params.id);
    res.render("kontak/detail", { kontak });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
