// import multer from "multer";
// import multerS3 from "multer-s3";
// import s3 from "../config/s3.js";

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "patient-photo-storage-lumi",
//     // acl: "public-read",
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + "-" + file.originalname);
//     },
//   }),
// });

// export default upload;
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "patient-photo-storage-lumi",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const fileName = Date.now().toString() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
});

export default upload;