var fs = require('fs');
var obj = require('../city-council/data/city-council-data.json');
var js2xmlparser = require('js2xmlparser');

var xml = js2xmlparser.parse('city-council', { 'councilor': obj });

fs.writeFile('city-council/data/city-council-data.xml', xml);