var gm = require('gm');
var glob = require('glob');

var image640x360 = 'city-council/images/backgrounds/640x360/';
var image960x540 = 'city-council/images/backgrounds/960x540/';
var image1280x720 = 'city-council/images/backgrounds/1280x720/';
var image1920x1080 = 'city-council/images/backgrounds/1920x1080/';

glob('uploads/city.jpg', {}, function (er, files) {
  if (files.length === 0) {
    console.log('× No background images to convert');
  } else {
    for (var i = 0; i < files.length; i++) {
      var fullSizeImage = files[i];
      var fileName = 'city.jpg';

      resizeImage(fullSizeImage, fileName);
    }
  }
});

/**
 * Resize Background Images
 * @param fullSizeImage
 * @param fileName
 */
function resizeImage (fullSizeImage, fileName) {
  // Check that Base Image Exists and is Correct Size
  gm(fullSizeImage).size(function (err, size) {
    if (err) {
      console.error(err);
    } else if (size.width !== 1920 || size.height !== 1080) {
      console.error(fullSizeImage + ' is not 1920 x 1080 pixels in size.');
    } else {
      // Make 640x360 Image
      gm(fullSizeImage).resize(640, 360).noProfile().write(image640x360 + fileName, function (err) {
        if (!err) console.log('✓ Created ' + image640x360 + fileName);
      });

      // Make 960x540 Image
      gm(fullSizeImage).resize(960, 540).noProfile().write(image960x540 + fileName, function (err) {
        if (!err) console.log('✓ Created ' + image960x540 + fileName);
      });

      // Make 1280x720 Image
      gm(fullSizeImage).resize(1280, 720).noProfile().write(image1280x720 + fileName, function (err) {
        if (!err) console.log('✓ Created ' + image1280x720 + fileName);
      });

      // Make 1920x1080 Image
      gm(fullSizeImage).resize(1920, 1080).noProfile().write(image1920x1080 + fileName, function (err) {
        if (!err) console.log('✓ Created ' + image1920x1080 + fileName);
      });
    }
  });
}