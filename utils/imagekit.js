const ImageKit = require('imagekit');
const {
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT,
} = require('./consts');
//
const imagekit = new ImageKit({
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
});

module.exports = {
  imagekit,
};
