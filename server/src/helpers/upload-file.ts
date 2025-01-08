import multer from "multer"
import multerS3 from 'multer-s3';
import { s3Config, dotEnvConfig } from "../config/config";

dotEnvConfig()

const BUCKET_NAME = process.env.BUCKET_NAME as string;

const upload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
          key: function (req, file, cb) {
            cb(null, file.originalname)
          }
    })
});

export default upload