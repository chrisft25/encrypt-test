const aws = require("aws-sdk")
const kms = new aws.KMS({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, //credentials for your IAM user
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, //credentials for your IAM user
    region: process.env.AWS_REGION
});
function encrypt(text) {
    return new Promise((resolve, reject) => {
        const params = {
            KeyId: process.env.AWS_KMS_ID, // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
            Plaintext: text// The data to encrypt.
        };
        kms.encrypt(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.CiphertextBlob.toString("base64"));
            }
        });
    });
}

function decrypt(text) {
    return new Promise((resolve, reject) => {
        const params = {
            CiphertextBlob: Buffer.from(text, 'base64')// The data to dencrypt.
        };
        kms.decrypt(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Plaintext.toString("ascii"));
            }
        });
    });
}

const test = async()=>{

    const text = "Hola muy buenas a todos"
    const encryptedText = await encrypt(text)
    console.log("Encrypted text:",encryptedText)
    const decryptedText = await decrypt(encryptedText)
    console.log(decryptedText)
}
test()