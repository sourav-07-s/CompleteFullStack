const  {ImageKit } = require("@imagekit/nodejs")



const ImagekitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY ,

})


async function UploadFile(files){
    const results =  await ImagekitClient.files.upload({})

}