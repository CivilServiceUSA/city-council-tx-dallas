var gm = require('gm');
var glob = require('glob');

var image64 = 'city-council/images/headshots/64x64/';
var image128 = 'city-council/images/headshots/128x128/';
var image256 = 'city-council/images/headshots/256x256/';
var image512 = 'city-council/images/headshots/512x512/';
var image1024 = 'city-council/images/headshots/1024x1024/';

glob('source/headshots/*.jpg', { ignore: 'source/headshots/template.jpg' }, function (er, files) {
  if (files.length === 0) {
    console.log('× No headshot images to convert');
  } else {
    for (var i = 0; i < files.length; i++) {
      var fullSizeImage = files[i];
      var fileName = fullSizeImage.replace(/^.*[\\\/]/, '');

      resizeImage(fullSizeImage, fileName);
    }
  }
});

/**
 * Resize Headshot Images
 * @param fullSizeImage
 * @param fileName
 */
function resizeImage (fullSizeImage, fileName) {
  // Check that Base Image Exists and is Correct Size
  gm(fullSizeImage).size(function (err, size) {
    if (err) {
      console.error(err);
    } else if (size.width !== 1024 || size.height !== 1024) {
      console.error(fullSizeImage + ' is not 1024 x 1024 pixels in size.');
    } else {
      // Make 64x64 Image
      gm(fullSizeImage).resize(64, 64).noProfile().write(image64 + fileName, function (err) {
        if (!err) console.log('✓ Created ./' + image64 + fileName);
      });

      // Make 128x128 Image
      gm(fullSizeImage).resize(128, 128).noProfile().write(image128 + fileName, function (err) {
        if (!err) console.log('✓ Created ./' + image128 + fileName);
      });

      // Make 256x256 Image
      gm(fullSizeImage).resize(256, 256).noProfile().write(image256 + fileName, function (err) {
        if (!err) console.log('✓ Created ./' + image256 + fileName);
      });

      // Make 512x512 Image
      gm(fullSizeImage).resize(512, 512).noProfile().write(image512 + fileName, function (err) {
        if (!err) console.log('✓ Created ./' + image512 + fileName);
      });

      // Make 1024x1024 Image
      gm(fullSizeImage).resize(1024, 1024).noProfile().write(image1024 + fileName, function (err) {
        if (!err) console.log('✓ Created ./' + image1024 + fileName);
      });
    }
  });
}