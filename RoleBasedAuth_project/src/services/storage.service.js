const  {ImageKit } = require("@imagekit/nodejs")



const ImagekitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_P_KEY

})

async function UploadFile(files){
    const results =  await ImagekitClient.files.upload({
        files,
        fileName : "FILE_" + Date.now() ,
        folder : "RoleBasedAuth_project/Admin-File"
    })

   return results ;

}


module.exports = {UploadFile}
