
var LineByLineReader = require('line-by-line');
const fs = require('fs');
const util = require('util');


var jsonArray = new Array();

function readCsvFile() {

    lr = new LineByLineReader('comentarios2.csv');

    lr.on('error', function (err) {
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        var res = line.split('|');
        var json = new Object();
        json.input = res[0];

        switch (res[1]) {
            case '🙏':
                json.output = 'me_piden';
                break;

            case '❤':
                json.output = 'me_encanta';
                break;

            case '👍':
                json.output = 'me_gusta';
                break;

            case '😡':
                json.output = 'me_enoja';
                break;

            case '😱':
                json.output = 'me_asombra';
                break;

            case '😢':
                json.output = 'me_entristece';
                break;

            case '😂':
                json.output = 'me_divierte';
                break;

            default:
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                console.log('@@@@@@@@@@@@@@@  ERROR  @@@@@@@@@@@@@@@@');
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                console.log('res[1]:' + res[1]);
                break;

        }


        jsonArray.push(json);
        // console.log('\n\n\n' + JSON.stringify(jsonArray));
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
        console.log('fin de lectura');
        saveJson();
    });
}


function saveJson() {
    fs.writeFile('input.json', JSON.stringify(jsonArray), function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}

readCsvFile();


