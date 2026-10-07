const  {ImageKit } = require("@imagekit/nodejs")



const ImagekitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY ,

})


async function UploadFile(files){
    const results =  await ImagekitClient.files.upload({
        files,
        fileName : "FILE_" + Date.now() ,
        folder : "RoleBasedAuth_project/Admin-File"
    })

}


module.exports = {UploadFile}
