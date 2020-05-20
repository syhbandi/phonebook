const mongoose = require("mongoose");

const kontakSchema = mongoose.Schema({
  namaDepan: {
    type: String,
    required: true,
  },
  namaBelakang: String,
  noHp: String,
  email: String,
  alamat: String,
});

module.exports = mongoose.model("kontak", kontakSchema);
