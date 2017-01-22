var fs = require('fs');
var csv = require('fast-csv');
var slug = require('slug');

var core = 'uploads/city-council-data.csv';

if (fs.existsSync(core)) {
  var stream = fs.createReadStream(core);
  csv.fromStream(stream, {headers : true}).on('data', function(data){
    console.log('!['+ data.first_name + ' ' + data.last_name +'](city-council/images/headshots/128x128/' + slug(data.first_name + ' ' + data.last_name, { lower: true, replacement: '-' }) + '.jpg "'+ data.first_name + ' ' + data.last_name +'")');
  });
} else {
  console.log(core + ' not found');
}