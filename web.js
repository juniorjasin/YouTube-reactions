var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var yt = require('./yt');
var predict = require('./test');
var fs = require('fs');
var mimir = require('mimir');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

var comentarios = [];

var ANN_Classes = {
    ME_ENOJA: 0,
    ME_PIDEN: 1,
    ME_ASOMBRA: 2,
    ME_ENCANTA: 3,
    ME_DIVIERTE: 4,
    ME_GUSTA: 5,
    ME_ENTRISTECE: 6,
};
classes_array = Object.keys(ANN_Classes);

function maxarg(array) {
    return array.indexOf(Math.max.apply(Math, array));
}

yt.readFile();

app.get('/', function (req, res) {

    res.render('index', { comentario: '' });
    // res.render('index');
});

var idx = 0;
var cantComentarios = 0;

app.get('/predecir', function (req, res) {
    comentarios = yt.getComentarios();
    cantComentarios = comentarios.length;
    // console.log('recibo estos comentarios...');
    // console.log(comentarios);
    if (idx >= cantComentarios) {
        res.render('predecir', { comentario: '------No hay mas comentarios------', resultado: '' });
    } else {
        var dict = predict.getDict();
        var test = mimir.bow(comentarios[idx], dict);
        var output = predict.testNet(test);
        
        var outputValues = [
            { key: 0, name: 'me_enoja', value: output['me_enoja']},   
            { key: 1, name: 'me_piden', value: output['me_piden']},   
            { key: 2, name: 'me_asombra', value: output['me_asombra']},   
            { key: 3, name: 'me_encanta', value: output['me_encanta']},   
            { key: 4, name: 'me_divierte', value: output['me_divierte']},   
            { key: 5, name: 'me_gusta', value: output['me_gusta']},   
            { key: 6, name: 'me_entristece', value: output['me_entristece']},   
        ]
        
        outputValues.sort(function(a, b) {
            return parseFloat(a.value) - parseFloat(b.value);
        });
        
        console.log('comentario:', comentarios[idx], 'output:', outputValues[6]);
        
        if(outputValues[6]['value'] < 0.4){
            outputValues[6]['name'] = 'no se';
        }

        res.render('predecir', { comentario: JSON.stringify(comentarios[idx]), resultado: outputValues[6] });
        idx++;
    }
});


var idxClassificar = 0;
var cantComentariosClasificar = 0;
app.get('/clasificar', function (req, res) {

    comentarios = yt.getComentarios();
    cantComentariosClasificar = comentarios.length;

    if (idxClassificar >= cantComentariosClasificar) {
        res.render('clasificar', { comentario: '------No hay mas comentarios------' });
        idxClassificar = 0;
    } else {
        res.render('clasificar', { comentario: JSON.stringify(comentarios[idxClassificar]) });
        idxClassificar++;
    }
});


app.post('/clasificar', function (req, res) {

    console.log('LLEGO A POST DE CLASIFICAR');
    console.log(req.body);
    var body = req.body;
    var fileName = 'input.json';

    fs.readFile(fileName, function (err, data) {
        if (data != undefined && data.length > 0) {
            var json = JSON.parse(data);
            // console.log('input',json);
            json.push({
                input: body['comentario'],
                output: body['reaccion']
            });
            console.log('cantidad de inputs:', json.length);

            fs.writeFile(fileName, JSON.stringify(json), function (err) {
                if (err) throw err;
            });
        }
    });
});



app.listen(3001);