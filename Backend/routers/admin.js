const express = require("express");
const Admin = require("../models/admin");
var multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isAuth = require("../middleware/auth");

// const { upload, uploadPhoto } = require("../helpers/upload-admin.js");

const adminRouter = express.Router();

const mime_types = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = mime_types[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const fileExtension = mime_types[file.mimetype];
    cb(null, fileName + "-" + Date.now() + "." + fileExtension);
  },
});

//get all admins
adminRouter.get("/all-admins", (req, res, next) => {
  Admin.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(new Error(err));
    });
});
//add admin
adminRouter.post(
  "/admin-signup",
  isAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.Password, 8).then((hashedPassword) => {
      const admin = new Admin({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        imagePath: req.body.imagePath,
      });
      admin
        .save()
        .then((response) => {
          res.status(201).json({
            message: "Account created successfully",
            result: response,
          });
        })
        .catch((e) => {
          res.result(500).json({
            error: e,
          });
        });
    });
  }
);

adminRouter.post("/admin-login", (req, res, next) => {
  let fetchedUser;
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({
          message: "Email does not match",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Either email or password is wrong",
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "osamaPDuZIalMisvZ8BYIO2daAd2dmiSKGnuwdtA2CRenTmerinFicAngauladr",
          { expiresIn: "1h" }
        );
        console.log(token);
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id,
        });
      });
    })
    .catch((e) => {
      return res.status(401).json({
        message: "Login Failed",
      });
    });
});

// //update admin record by id
// adminRouter.put("/update-admin/:id", (req, res, next) => {
//   let dataInserted = req.body;
//   let id = req.params.id;
//   Admin.findByIdAndUpdate(id, dataInserted)
//     .then(() => {
//       res.status(200).json({ success: "data is Updated" });
//     })
//     .catch((err) => {
//       return next(new Error(err));
//     });
// });
// //delete admin by id
// adminRouter.delete("/delete-admin/:id", (req, res, next) => {
//   let id = req.params.id;
//   Admin.findByIdAndDelete(id)
//     .then(() => {
//       res.status(200).json({ success: "data is deleted" });
//     })
//     .catch((err) => {
//       return next(new Error(err));
//     });
// });

// adminRouter.get("/get-admin/:id", (req, res, next) => {
//   let id = req.params.id;
//   Admin.findOne({ _id: id })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       return next(new Error(err));
//     });
// });

module.exports = adminRouter;
