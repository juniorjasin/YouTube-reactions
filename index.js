var brain = require('brain.js');
var fs = require('fs');
var mimir = require('mimir');

var net = new brain.NeuralNetwork();


// loadNetFromJson();
getTrainedData();

function loadNetFromJson(){
  console.log('loadNetFromJson');
  
  fs.readFile('trained.json', function(err, data) {
    if(data != undefined && data.length > 0){
      // net.fromJSON(JSON.parse(data));
      console.log('termine de cargar el jsonFile...');
    }
    // getTrainedData();
    // train(data);
  });

}

function getTrainedData(){
  fs.readFile('input.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error while reading' + err);
      return;
    }

    train(content);
  });
}

function train(content){
  // console.log('train' + JSON.stringify(JSON.parse(content)));

  var input = JSON.parse(content);
  var dict = getDict(input);
  var data = parseData(input, dict);
  // console.log(data);

  console.log('---------Comienza entrenamiento---------');
  var result = net.train(data,
  {
    // Defaults values --> expected validation
  iterations: 100,    // the maximum times to iterate the training data --> number greater than 0
  errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
  log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 10,        // iterations between logging out --> number greater than 0
  learningRate: 0.1,    // scales with delta to effect training rate --> number between 0 and 1
  momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
  callback: null,       // a periodic call back that can be triggered while training --> null or function
  callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
  timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
  });
  
  console.log(result);
  saveNetToJson();
  var t = mimir.bow('Todo.. como Loki jjajajjaa', dict);
  testNet(t);
}

function saveNetToJson(){
  console.log('saveNetToJson');

  const json = net.toJSON();
  
  fs.writeFile('trained.json', JSON.stringify(json), function (err) {
    if (err) throw err;
  });
  
}

function testNet(comentario){
  console.log('test con comentario:' + comentario);

  var output = net.run(comentario);
  console.log('resultado:' + output);
  console.log(output);
}


function getDict(content){
  allTexts = '';
  content.forEach(element => {
    // console.log('element', element);
    allTexts += element['input'];
  });

  var dict = mimir.dict(allTexts);
  return dict;
}

function parseData(input, dict){

  array = new Array();

  // [ {input: [1,2,0,2], output: {me_divierte:1 }} ]

  input.forEach(element => {
    var obj = new Object();
    var text = element['input'];
    var vector = mimir.bow(text, dict);
    obj.input = vector;
    var out;

    switch(element['output']){
      case 'me_gusta':
      out = {me_gusta: 1 };
      break;

      case 'me_encanta':
      out = {me_encanta: 1 };
      break;

      case 'me_divierte':
      out = {me_divierte: 1 };
      break;

      case 'me_entristece':
      out = {me_entristece: 1 };
      break;

      case 'me_enoja':
      out = {me_enoja: 1 };
      break;

      case 'me_asombra':
      out = {me_asombra: 1 };
      break;

      case 'me_piden':
      out = {me_piden: 1 };
      break;

      default:
      console.log('ERROR');
      break;
    }

    obj.output = out;

    // console.log('objeto generado', obj);
    array.push(obj);

  });

  return array;
}