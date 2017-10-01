var fs = require('fs');
var path = require('path');
var slug = require('slug');

var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var date2str = function (x, y) {
  var z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
    return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
  });

  return y.replace(/(y+)/g, function(v) {
    return x.getFullYear().toString().slice(-v.length)
  });
}

var collection, data;
var seeder_file = path.join(__dirname, '../city-council/data/' + date2str(new Date(), 'yyyyMMddhhmmss') + '-city-council-' + slug(pjson.cityData.state_code, { lower: true, replacement: '-' }) + '-' + slug(pjson.cityData.city_name, { lower: true, replacement: '-' }) + '-seeder.js');
var data_file = path.join(__dirname, '../city-council/data/city-council-data.json');

function createSeeder() {
  var seeder = "module.exports = {\n" +
  "  up: function (queryInterface) {\n" +
  "    return queryInterface.bulkInsert('city_council', " +
  JSON.stringify(collection, null, 4) +
  ", {\n" +
  "      updateOnDuplicate: [ 'state_name','state_name_slug','state_code','state_code_slug','city_name','city_name_slug','district','at_large','vacant','title','party','name','name_slug','first_name','middle_name','last_name','name_suffix','goes_by','pronunciation','gender','ethnicity','date_of_birth','entered_office','term_end','email','phone','latitude','longitude','address_complete','address_number','address_prefix','address_street','address_sec_unit_type','address_sec_unit_num','address_city','address_state','address_zipcode','address_type','population','background_url','city_government_url','city_council_url','city_council_calendar_url','city_council_legislation_url','city_council_committees_url','twitter_handle','twitter_url','facebook_url','photo_url','modified_date','shape' ]\n" +
  "    }).catch(function (err) {\n" +
  "      if (err && err.errors) {\n" +
  "        for (var i = 0; i < err.errors.length; i++) {\n" +
  "          console.error('× SEED ERROR', err.errors[ i ].type, err.errors[ i ].message, err.errors[ i ].path, err.errors[ i ].value);\n" +
  "        }\n" +
  "      } else if (err && err.message) {\n" +
  "        console.error('× SEED ERROR', err.message);\n" +
  "      }\n" +
  "    });\n" +
  "  },\n" +
  "    down: function (queryInterface) {\n" +
  "    return queryInterface.bulkDelete('city_council', null, {});\n" +
  "  }" +
  "};\n";

  seeder = seeder.replace(/"queryInterface/g, 'queryInterface');
  seeder = seeder.replace(/}'\)"/g, '}\')');
  seeder = seeder.replace(/"new Date\(\)"/g, 'new Date()');
  seeder = seeder.replace(/"([a-z_]+)":/g, '$1:');
  seeder = seeder.replace(/: "true"/g, ': true');
  seeder = seeder.replace(/: "false"/g, ': false');
  seeder = seeder.replace(/\\"type\\":/g, '"type":');
  seeder = seeder.replace(/\\"MultiPolygon\\"/g, '"MultiPolygon"');
  seeder = seeder.replace(/\\"Polygon\\"/g, '"Polygon"');
  seeder = seeder.replace(/\\"coordinates\\":/g, '"coordinates":');

  fs.writeFile(seeder_file, seeder, function(){});
}

if (!fs.existsSync(data_file)) {
  console.error('× Missing JSON Data: ' + data_file.replace(path.join(__dirname, '../'), './'));
} else {

  collection = [];
  data = JSON.parse(fs.readFileSync(data_file, 'utf8'));

  for (var i = 0; i < data.length; i++) {

    if (data[i].at_large === true || data[i].at_large === 'true') {
      continue;
    }

    var geojsonFile = 'city-council/geojson/city-council-';

    if (data[i].district) {
      geojsonFile += data[i].state_code_slug + '-' + data[i].city_name_slug + '-' + data[i].district.replace(/\s/g, '-').toLowerCase() + '.geojson';
    } else {
      geojsonFile += data[i].state_code_slug + '-' + data[i].city_name_slug + '.geojson';
    }

    var contents = fs.readFileSync(path.join(__dirname, '../' + geojsonFile), 'utf8');
    var geojson = JSON.parse(contents);

    data[i].shape = 'queryInterface.sequelize.fn(\'ST_GeomFromGeoJSON\', \'' + JSON.stringify(geojson.geometry) + '\')'
    data[i].created_date = 'new Date()';
    data[i].modified_date = 'new Date()';
    collection.push(data[i]);
  }

  createSeeder();

  console.log('\n☆ Seeder Creation Completed ' + '\n');
}
