const multer = require('multer');
const util = require("util");
require('dotenv').config();
const directoryPathCate = process.env.UPLOAD_CATEGORY;
const directoryPathPro =  process.env.UPLOAD_PRODUCT;
const pagePath = process.env.UPLOAD_PAGE;
const faqsPath = process.env.UPLOAD_FAQ;
const blogPath = process.env.UPLOAD_BLOG;
//******************************************************************************
// CATEGORY SECTION                                                            *
//******************************************************************************
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: directoryPathCate, 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now()+".jpg")
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: process.env.FILE_UPLOAD_SIZE // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}).single('image');  
let categoryImg = util.promisify(imageUpload);
module.exports = categoryImg

//******************************************************************************
// PRODUCT SECTION                                                             *
//******************************************************************************
const productimageStorage = multer.diskStorage({
  // Destination to store image     
  destination: directoryPathPro, 
       filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+".jpg")
          
  }
});
const proimageUpload = multer({
  storage: productimageStorage,
  limits: {
    fileSize: process.env.FILE_UPLOAD_SIZE // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}).single('image');  
let productImg = util.promisify(proimageUpload);
module.exports = productImg

//******************************************************************************
// Pages SECTION                                                             *
//******************************************************************************
const pagesStorage = multer.diskStorage({
  // Destination to store image     
  destination: pagePath, 
       filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+".jpg")
          
  }
});
const pageUpload = multer({
  storage: pagesStorage,
  limits: {
    fileSize: process.env.FILE_UPLOAD_SIZE // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}).single('image');  
let pageImg = util.promisify(pageUpload);
module.exports = pageImg


//******************************************************************************
// FAQ SECTION                                                             *
//******************************************************************************
const faqsStorage = multer.diskStorage({
  // Destination to store image     
  destination: faqsPath, 
       filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+".jpg")
          
  }
});
const faqUpload = multer({
  storage: faqsStorage,
  limits: {
    fileSize: process.env.FILE_UPLOAD_SIZE // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}).single('image');  
let faqImg = util.promisify(faqUpload);
module.exports = faqImg


//******************************************************************************
// BLOG SECTION                                                             *
//******************************************************************************
const blogStorage = multer.diskStorage({
  // Destination to store image     
  destination: blogPath, 
       filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+".jpg")
          
  }
});
const blogUpload = multer({
  storage: blogStorage,
  limits: {
    fileSize: process.env.FILE_UPLOAD_SIZE // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}).single('image');  
let blogImg = util.promisify(blogUpload);
module.exports = blogImg