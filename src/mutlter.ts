import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const uploadDir = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // set your uploads folder
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // get original extension like .png
        const uniqueName = uuidv4(); // generate a unique filename
        cb(null, uniqueName + ext); // e.g. 1234-uuid.png
    }
});

const upload = multer({storage});

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default upload;
