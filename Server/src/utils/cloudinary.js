import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload multiple images (buffers)
const uploadImages = (fileBuffers) => {
  const uploadPromises = fileBuffers.map((buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      // Stream the buffer into the Cloudinary upload stream
      stream.end(buffer);
    });
  });

  return Promise.all(uploadPromises);
};

// Function to delete an image
const deleteImage = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export { uploadImages, deleteImage };
