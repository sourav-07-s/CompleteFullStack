const { ImageKit } = require("@imagekit/nodejs");

const ImagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_P_KEY
});

async function uploadFile(fileBuffer) {

    console.log("ImageKit: upload started");

    const results = await ImagekitClient.files.upload({
        file: fileBuffer,
        fileName: "FILE_" + Date.now(),
        folder: "RoleBasedAuth_project/Admin-File"
    });

    console.log("ImageKit: upload finished");

    return results;
}

module.exports = { uploadFile };