![Civil Services Logo](https://raw.githubusercontent.com/CivilServiceUSA/api/master/docs/img/logo.png "Civil Services Logo")

__Civil Services__ is a collection of tools that make it possible for citizens to be a part of what is happening in their Local, State & Federal Governments.


Upload Instructions
===

This directory is for you to upload finished files that will be processed by running `npm run -s build`.


Update CSV File
---

This City Council Data is maintained in a Google Spreadsheet.  

* Go to [City Council Data](http://bit.ly/city-council-tx-dallas)
* Select `File > Download as > Comma-separated values (.csv, current sheet)`
* Save file as `./uploads/city-council-data.csv`


Update City Photo
---

This image is for web services that will display City Council Member listings on their website.  The background image is used for the website to display a custom image for that city.

#### Image Guidelines:

* Image should reflect a famous landmark of the city
* Image be licensed for NonCommercial use
* Edit the `uploads/city.jpg` image with the photo you selected

#### Image Automation:

The `uploads/city.jpg` image will be automatically converted to the following sizes:

* 640x360 ( stored in `city-council/images/backgrounds/640x360` )
* 960x540 ( stored in `city-council/images/backgrounds/960x540` )
* 1280x720 ( stored in `city-council/images/backgrounds/1280x720` )
* 1920x1080 ( stored in `city-council/images/backgrounds/1280x720` )


City Councilor Headshots
---

#### Image Guidelines:

1. Find and download a High Resolution Images for each City Councilor
2. Use a Photo Editor ( [https://pixlr.com/editor/](https://pixlr.com/editor/) if you do not already have one ) and export an image with a name like `firstname-lastname.jpg` ( using their actual first and last name, all lower case letters, using only letters a-z and replace all spaces with dashes ). Make sure the image is exactly 1024 pixels wide by 1024 pixels tall ( Download [./templates/headshot.jpg](./templates/headshot.jpg) if you need an image template )
3. Upload the file named something like `firstname-lastname.jpg` into this `./uploads/headshots/` directory

#### Image Automation:

The `./uploads/headshots/` images will be automatically converted to the following sizes:

* 64x64 ( stored in `city-council/images/headshots/64x64` )
* 128x128 ( stored in `city-council/images/headshots/128x128` )
* 256x256 ( stored in `city-council/images/headshots/256x256` )
* 512x512 ( stored in `city-council/images/headshots/512x512` )
* 1024x1024 ( stored in `city-council/images/headshots/1024x1024` )