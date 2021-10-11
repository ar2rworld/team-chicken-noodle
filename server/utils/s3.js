const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

export function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise();
}
;

export function getFile(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return new Promise((resolve, reject) => {
        s3.getObject(downloadParams, (err, data) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(data.Body)
            }
        })
    })
}


