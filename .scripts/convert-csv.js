var fs = require('fs');
var csv = require('fast-csv');
var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var values = require('object.values');
var slug = require('slug');

if (!Object.values) {
  values.shim();
}

var core = 'uploads/city-council-data.csv';
var converted = 'city-council/data/city-council-data.csv';
var currentRow = 0;

if (fs.existsSync(core)) {
  fs.truncate(converted, 0, function() {
    var stream = fs.createReadStream(core);

    csv.fromStream(stream, {headers : true}).validate(function(data){

      var validGender = ['female', 'male', 'unspecified'];
      var validEthnicity = ['african-american', 'asian-american', 'hispanic-american', 'middle-eastern-american', 'native-american', 'pacific-islander', 'white-american'];
      var validTitle = ['councilor', 'mayor', 'vice-mayor', 'district-attorney', 'council-president', 'majority-leader', 'majority-whip', 'minority-leader', 'minority-whip', 'deputy-majority-leader', 'deputy-majority-whip', 'deputy-minority-leader', 'deputy-minority-whip'];
      var validParty = ['democrat', 'republican', 'independent', 'libertarian', 'green', 'constitution', 'nonpartisan'];
      var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (data.first_name === '') {
        console.error('× Missing Required First Name');
        return false;
      } else if (data.last_name === '') {
        console.error('× Missing Required Last Name');
        return false;
      } else if (validGender.indexOf(data.gender) === -1) {
        console.error('× Invalid Gender for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (validEthnicity.indexOf(data.ethnicity) === -1) {
        console.error('× Invalid Ethnicity for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (data.date_of_birth !== '' && !/^([0-9]{4}-[0-9]{2}-[0-9]{2})$/.test(data.date_of_birth)) {
        console.error('× Invalid Date or Birth for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (validTitle.indexOf(data.title) === -1) {
        console.error('× Invalid Title for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (validParty.indexOf(data.party) === -1) {
        console.error('× Invalid Party for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (data.email !== '' && !validEmail.test(data.email)) {
        console.error('× Invalid Email Address for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (data.phone !== '' && !/^([0-9]{3}-[0-9]{3}-[0-9]{4})$/.test(data.phone)) {
        console.error('× Invalid Phone Number for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (data.address === '') {
        console.error('× Missing Required Address for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (data.twitter_url !== '' && data.twitter_url.indexOf('https://twitter.com/') === -1) {
        console.error('× Invalid Twitter URL for ');
        return false;
      } else if (data.facebook_url !== '' && data.facebook_url.indexOf('https://www.facebook.com') === -1) {
        console.error('× Invalid Facebook URL for ' + data.first_name + ' ' + data.last_name);
        return false;
      } else if (data.photo_url === '') {
        console.error('× Missing Required Photo for ' + data.first_name + ' ' + data.last_name);
        return false;
      }

      return true;
    })
    .on('data-invalid', function(){
      console.error('× Aborted Converting CSV File');
      process.exit(1);
    })
    .on('data', function(data){

      var cdnHeadshotPath = 'https://cdn.civil.services/city-council/' +
        slug(pjson.cityData.state_code, { lower: true, replacement: '-' }) + '/' +
        slug(pjson.cityData.city_name, { lower: true, replacement: '-' }) + '/headshots/512x512/' +
        slug(data.first_name + ' ' + data.last_name, { lower: true, replacement: '-' }) + '.jpg';

      var cdnBackgroundPath = 'https://cdn.civil.services/city-council/' +
        slug(pjson.cityData.state_code, { lower: true, replacement: '-' }) + '/' +
        slug(pjson.cityData.city_name, { lower: true, replacement: '-' }) + '/backgrounds/1280x720/city.jpg';

      var convertedData = {
        state_code: pjson.cityData.state_code,
        city_name: pjson.cityData.city_name,
        city_slug: slug(pjson.cityData.city_name, { lower: true, replacement: '-' }),
        city_population: pjson.cityData.city_population,
        city_background_url: cdnBackgroundPath,
        city_website: pjson.cityData.city_website,
        public_records: pjson.cityData.public_records,
        latitude: pjson.cityData.latitude,
        longitude: pjson.cityData.longitude,
        district: data.district,
        at_large: data.at_large,
        name: data.first_name + ' ' + data.last_name,
        name_slug: slug(data.first_name + ' ' + data.last_name, { lower: true, replacement: '-' }),
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        ethnicity: data.ethnicity,
        date_of_birth: data.date_of_birth,
        title: data.title,
        party: data.party,
        email: data.email,
        phone: data.phone,
        address: data.address,
        twitter_url: data.twitter_url,
        facebook_url: data.facebook_url,
        photo_url: cdnHeadshotPath
      };

      if (currentRow === 0) {
        var header = Object.keys(convertedData).join(',') + '\n';
        fs.appendFile(converted, header);
      }

      var row = '"' + Object.values(convertedData).join('","') + '"' + '\n';
      fs.appendFile(converted, row);

      console.log('✓ Processed ' + data.first_name + ' ' + data.last_name);

      currentRow++;
    })
    .on('end', function(){
      console.log('\n☆ CSV Process Completed ' + '\n');
    });
  });
} else {
  console.log(path + ' not found');
}