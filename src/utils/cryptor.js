import CryptoJS from "crypto-js";

class Cryptor {
  constructor() {
    this.salt = "salting"; // Generate salt from Initial Handshake
    this.iv = "1111111111111111"; // Generate Iv from Initial Handshake
    this.iteratons = "999"; // Set Iterations from initial handshake
  }

  encrypt(payload, passphrase) {
    const key = this.getKey(passphrase, this.salt);
    const encrypted = CryptoJS.AES.encrypt(payload, key, {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decrypt(encryptedPayload, passphrase) {
    let key = this.getKey(passphrase, this.salt);
    let decrypted = CryptoJS.AES.decrypt(encryptedPayload, key, {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getKey(passphrase, salt) {
    return CryptoJS.PBKDF2(passphrase, salt, {
      hasher: CryptoJS.algo.SHA256,
      keySize: 64 / 8,
      iterations: this.iteratons,
    });
  }

  setIv(iv) {
    this.iv = iv;
  }

  setIterations(iterations) {
    this.iteratons = iterations;
  }
}

export default new Cryptor();
