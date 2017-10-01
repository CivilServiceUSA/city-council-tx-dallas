var fs = require('fs');
var csv = require('fast-csv');
var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var values = require('object.values');
var slug = require('slug');
var parser = require('parse-address');

if (!Object.values) {
  values.shim();
}

var core = 'source/city-council-data.csv';
var converted = 'city-council/data/city-council-data.csv';
var currentRow = 0;
var stateCodes = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District Of Columbia',
  'FM': 'Federated States Of Micronesia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MH': 'Marshall Islands',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PW': 'Palau',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
};

if (fs.existsSync(core)) {
  fs.truncate(converted, 0, function() {
    var stream = fs.createReadStream(core);

    csv.fromStream(stream, {headers : true}).validate(function(data){

      var validGender = [
        'female',
        'male',
        'unspecified'
      ];

      var validEthnicity = [
        'african-american',
        'asian-american',
        'hispanic-american',
        'middle-eastern-american',
        'multi-racial-american',
        'native-american',
        'pacific-islander',
        'white-american',
        'unspecified'
      ];

      var validTitle = [
        'alderman',
        'chairman',
        'city-attorney',
        'city-auditor',
        'city-controller',
        'commissioner',
        'council-president',
        'councilor',
        'deputy-leader',
        'deputy-mayor-pro-tem',
        'deputy-majority-leader',
        'deputy-majority-whip',
        'deputy-minority-leader',
        'deputy-minority-whip',
        'district-attorney',
        'majority-leader',
        'majority-whip',
        'mayor',
        'mayor-pro-tem',
        'minority-leader',
        'minority-whip',
        'representative',
        'supervisor',
        'president',
        'president-pro-tem',
        'vice-chairman',
        'vice-mayor',
        'vice-president',
        'vacant'
      ];

      var validParty = [
        'constitution',
        'democrat',
        'green',
        'independent',
        'libertarian',
        'nonpartisan',
        'republican'
      ];

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

      var parsedAddress = parser.parseLocation(data.address);

      var convertedData = {
        state_name: stateCodes[pjson.cityData.state_code],
        state_name_slug: slug(stateCodes[pjson.cityData.state_code], { lower: true, replacement: '-' }),
        state_code: pjson.cityData.state_code,
        state_code_slug: slug(pjson.cityData.state_code, { lower: true, replacement: '-' }),
        city_name: pjson.cityData.city_name,
        city_name_slug: slug(pjson.cityData.city_name, { lower: true, replacement: '-' }),
        district: (data.district && data.district !== '' && data.district !== '0' && data.district !== 0) ? data.district : null,
        at_large: (data.at_large && data.at_large === 'yes'),
        vacant: false,
        title: data.title,
        party: data.party,
        name: data.first_name + ' ' + data.last_name,
        name_slug: slug(data.first_name + ' ' + data.last_name, { lower: true, replacement: '-' }),
        first_name: data.first_name,
        middle_name: data.first_name || null,
        last_name: data.last_name,
        name_suffix: data.name_suffix || null,
        goes_by: data.goes_by || null,
        pronunciation: data.pronunciation || null,
        gender: data.gender,
        ethnicity: data.ethnicity,
        date_of_birth: data.date_of_birth,
        entered_office: data.entered_office,
        term_end: data.term_end,
        email: (data.email) ? data.email.toLowerCase() : null,
        phone: data.phone,
        latitude: pjson.cityData.latitude,
        longitude: pjson.cityData.longitude,
        address_complete: data.address,
        address_number: parsedAddress.number || null,
        address_prefix: parsedAddress.prefix || null,
        address_street: parsedAddress.street || null,
        address_sec_unit_type: parsedAddress.sec_unit_type || null,
        address_sec_unit_num: parsedAddress.sec_unit_num || null,
        address_city: parsedAddress.city || null,
        address_state: parsedAddress.state || null,
        address_zipcode: parsedAddress.zip || null,
        address_type: parsedAddress.type || null,
        population: pjson.cityData.city_population,
        background_url: cdnBackgroundPath,
        city_government_url: pjson.cityData.city_government_url,
        city_council_url: pjson.cityData.city_council_url,
        city_council_calendar_url: pjson.cityData.city_council_calendar_url,
        city_council_legislation_url: pjson.cityData.city_council_legislation_url,
        city_council_committees_url: pjson.cityData.city_council_committees_url,
        twitter_handle: (data.twitter_url) ? data.twitter_url.replace('https://twitter.com/', '') : null,
        twitter_url: data.twitter_url,
        facebook_url: data.facebook_url,
        photo_url: cdnHeadshotPath
      };

      if (currentRow === 0) {
        var header = Object.keys(convertedData).join(',') + '\n';
        fs.appendFile(converted, header, function(){});
      }

      var row = '"' + Object.values(convertedData).join('","').replace(/""/g, '') + '"' + '\n';
      fs.appendFile(converted, row, function(){});

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
