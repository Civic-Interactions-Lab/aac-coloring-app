const crypto = require("crypto");

function computeMD5Hash(input) {
    const md5Hash = crypto.createHash("md5");
    md5Hash.update(input);
    return md5Hash.digest("hex"); // 'hex' encoding outputs the hash as a hexadecimal string
}

module.exports = {
    computeMD5Hash,
};
