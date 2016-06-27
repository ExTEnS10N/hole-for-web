exports.aes_encrypt = function (text, key) {
  // var key = '109dbaaf84eddd86173b270033d7b592';
  // var text = 'some_plain_text_here';
  var crypto = require('crypto');
  var cipher = crypto.createCipheriv('aes-128-ecb',
    new Buffer(key, 'hex'), new Buffer(0));
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted = encrypted + cipher.final('hex');
  return encrypted.toString();
}