const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    imagePath: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
