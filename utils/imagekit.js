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
//
imagekit.createCustomMetadataField(
  {
    name: 'userId',
    label: 'userId',
    schema: {
      type: 'Text',
    },
  },
  function (error, result) {
    if (error) console.log(error);
    else console.log(result);
  }
);

module.exports = {
  imagekit,
};
