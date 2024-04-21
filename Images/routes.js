import multer from 'multer';

export default function Images(app) {
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/uploadProfilePic', upload.single('profilePicture'), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${file.path}`);
  });
}