const crypto = require("crypto");

const SECRET = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
console.log(SECRET.length);

const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(SECRET), iv);
  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);
  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"),
  };
};

const decrypt = (encryption) => {
  const decypher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(SECRET),
    buffer.from(encryption.iv, "hex")
  );
  const decryptedPassord = Buffer.concat([
    decypher.update(Buffer.from(encryption.password, "hex")),
    decypher.final(),
  ]);
  return decryptedPassord.toString();
};

module.exports = { encrypt, decrypt };
