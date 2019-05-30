const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const CVSchema = new mongoose.Schema({
  fio: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  birthDate: {
    type: String,
    required: true,
    trim: true
  },
  education: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true,
    trim: true
  },
  photoLink: {
    type: String,
    required: true,
    trim: true
  },
  mainSkills: {
    type: String,
    required: true,
    trim: true
  },
  aboutMe: {
    type: String,
    required: true,
    trim: true
  }
});

CVSchema.plugin(timestamp);

const CV = new mongoose.model("CV", CVSchema);

module.exports = CV;
