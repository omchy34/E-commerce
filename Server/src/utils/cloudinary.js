import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload multiple images (buffers)

const uploadImages = (fileBuffers) => {
    const buffers = Array.isArray(fileBuffers) ? fileBuffers : [fileBuffers];

    const uploadPromises = buffers.map((buffer, index) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error(`Error uploading file ${index + 1}:`, error);
                        reject(new Error(`Error uploading file ${index + 1}: ${error.message}`));
                    } else {
                        console.log(`File ${index + 1} uploaded successfully:`, result.secure_url);
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


// const uploadImages = (fileBuffers) => {
//   const buffers = Array.isArray(fileBuffers) ? fileBuffers : [fileBuffers];

//   const uploadPromises = buffers.map((buffer, index) => {
//     return new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: 'auto' },
//         (error, result) => {
//           if (error) {
//             reject(new Error(`Error uploading file ${index + 1}: ${error.message}`));
//           } else {
//             resolve(result);
//           }
//         }
//       );

//       // Stream the buffer into the Cloudinary upload stream
//       stream.end(buffer);
//     });
//   });

//   return Promise.all(uploadPromises);
// };


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
