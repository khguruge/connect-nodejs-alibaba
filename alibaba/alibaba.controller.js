const OSS = require("ali-oss");

const attachmentstore = new OSS({
    region: "********************",
    accessKeyId: "***************",
    accessKeySecret: "***********",
    bucket: "bucket-name",
    secure: true
});


// API Upload
// req body -->
// {
//     file : file.ext
// }
// http://localhost:8080/api/alibaba/file/upload


exports.uploadAlibaba = async (req, res, next) => {
    try {
        filename = req.files.file.name;
        attachmentstore.put(filename, Buffer.from(req.files.file.data)).then((result) => {
            res.json({
                success: true,
                message: "file upload successfully",
                result: result,
            });
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
        });
    }
};


// API Download
// http://localhost:8080/api/alibaba/file/download/:filename

exports.downloadAlibaba = async (req, res, next) => {
    try {
        let filename = req.params.filename
        const url = await attachmentstore.signatureUrl(filename);
        return res.json({ 
            success: true, 
            result: url 
        });
    }
    catch (err) {
        console.log(err);
        return res.json({ 
            success: false, 
            result: err 
        });
    }
};
