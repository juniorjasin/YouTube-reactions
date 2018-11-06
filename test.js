var brain = require('brain.js');
var fs = require('fs');
var mimir = require('mimir');

var net = new brain.NeuralNetwork();

// var obj = [
//   { input: "parecete a superma v", output: "md" },
//   { input: "esa mamada de loki jajaj nunca lo pense jajaj", output: "md" },
//   { input: "jajajajajaja literal", output: "md" },
//   { input: "ni eA ambas peliculas superman ni sorrie solo con cara de culo", output: "me" },
//   { input: "estas equivocado no lo contrataron", output: "me" }
// ]


// var allComments = [];
// obj.forEach(comentario => {
//   var text = comentario['input']
//   text = text.replace(/(\r\n\t|\n|\r\t|\")/gm, "");
//   text = text.normalize('NFC');
//   allComments.push(text);

// });


// var ANN_Classes = {
//   ME_GUSTA: 0,
//   ME_ENCANTA: 1,
//   ME_ENTRISTECE: 2,
//   ME_DIVIERTE: 3,
//   ME_ASOMBRA: 4,
//   ME_PIDEN: 5,
//   ME_ENOJA: 6,
// };

// classes_array = Object.keys(ANN_Classes);



// var dict = mimir.dict(allComments);

// var v1 = mimir.bow('jajajajajaja literal', dict);
// var v2 = mimir.bow('esa mamada de loki jajaj nunca lo pense jajaj', dict);
// var v3 = mimir.bow('ni eA ambas peliculas superman ni sorrie solo con cara de culo', dict);
// var v4 = mimir.bow('estas equivocado no lo contrataron', dict);

// console.log(v1);
// console.log('dict', dict);

// net.train([
//   { input: v1, output: { me_divierte: 1 } },
//   { input: v2, output: { me_divierte: 1 } },
//   { input: v3, output: { me_enoja: 1 } },
//   { input: v4, output: { me_enoja: 1 } }
//   // v1,v2,v3,v4
// ],
//   {
//     // Defaults values --> expected validation
//     iterations: 200,    // the maximum times to iterate the training data --> number greater than 0
//     errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
//     log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
//     logPeriod: 10,        // iterations between logging out --> number greater than 0
//     learningRate: 0.1,    // scales with delta to effect training rate --> number between 0 and 1
//     momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
//     callback: null,       // a periodic call back that can be triggered while training --> null or function
//     callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
//     timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
//   });


loadNetFromJson();

var inputData;

fs.readFile('input.json', (err, content) => {
  if (err) {
    console.log('Error while reading' + err);
    return;
  }
  inputData = content;
  console.log('se cargo inputData...');
});


function loadNetFromJson(){
  console.log('loadNetFromJson');

  fs.readFile('trained.json', function(err, data) {
    if(data != undefined && data.length > 0){
      net.fromJSON(JSON.parse(data));
      console.log('termine de cargar el jsonFile...');      

      // module.exports.testNet('quiero pedir ');
    }   
  });
}

module.exports = {

  testNet: function (comentario) {
    console.log('test con comentario:' + comentario);

    var output = net.run(comentario);
    console.log('resultado:' + JSON.stringify(output));
    // console.logoutput;
    return output;
  },

  getDict: function () {
      var input = JSON.parse(inputData);
      // console.log('input:', input);

      allTexts = '';
      input.forEach(element => {
        // console.log('element', element);
        allTexts += element['input'];
      });

      var dict = mimir.dict(allTexts);
      return dict;
  }

};

// var t = mimir.bow('\"Todo.. como Loki jjajajjaa claro, es q este tiene charme y el otro no se puede mover con el disfraz 😅😅😅\"', dict);
// var test = { input: t }

// module.exports.testNet(t);
// module.exports.testNet('jajaja');
// module.exports.testNet('estas equivocado');