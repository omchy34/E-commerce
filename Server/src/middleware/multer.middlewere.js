import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
}).array('images' , 10) ;

export default upload;
