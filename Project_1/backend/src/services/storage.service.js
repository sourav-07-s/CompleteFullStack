const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATEKEY
})


async function uploadfile(buffer){
    const result = await imagekit.files.upload({
        file : buffer.toString("base64"),
        fileName : "Image.PNG"
    })

    return result ;

}

module.exports = uploadfile