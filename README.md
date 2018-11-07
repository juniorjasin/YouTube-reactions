# YouTube-reactions

YouTube-reaction es un proyecto destinado predecir reacciones en comentarios de YouTube utilizando redes neuronales.

# Motivacion

Este proyecto esta dedicado al canal de youtube [Te lo resumo asi nomas](https://www.youtube.com/channel/UCw7Bz6EHxlnOoBUBlJZCWCw)

# Como funciona

Al abrir la aplicacion se vera la pantalla inicial, donde tendremos la opcion de __predecir__ o __clasificar__.

![alt text](https://github.com/juniorjasin/YouTube-reactions/blob/master/img/yp.png)


## Modo prediccion

si presionamos __predecir__, se comenzara a ver comentarios y la reaccion debajo, indicando su grado de confianza.

![alt text](https://github.com/juniorjasin/YouTube-reactions/blob/master/img/me_divierte1.png)

![alt text](https://github.com/juniorjasin/YouTube-reactions/blob/master/img/me_enoja2.png)


## Modo clasificacion

si presionamos __clasificar__, se comenzara a ver comentarios y luego podremos indicar la reaccion que creemos correcta, esto se guardara en el archivo `input.json` con los datos previos.

![alt text](https://github.com/juniorjasin/YouTube-reactions/blob/master/img/c_me_encnata.png)


# Como funciona por detras

Para poder predecir emociones basadas en texto tenemos que crear una red neuronal que a partir de ejemplos correctos, cree un modelo de prediccion. Pero no podemos ingresar texto como input directamente (mentira brain si nos permite hacer eso pero todavia no funciona bien), por lo que realice un porceso de __vectorizacion de texto__, este proceso consiste en crear diccionario con todas las palabras que se encuentren en nuestros textos de inputs, luego con el algoritmo conocido como (Bag-Of-words)[https://en.wikipedia.org/wiki/Bag-of-words_model] podemos crear un array por cada input del mismo largo (algo que es bueno para las redes neuronales), que contiene la frecuencia de cada palabra encontrada respecto de nuestro diccionario, asi se vectoriza una cadena de caracteres. Luego con esto ya resuelto, simplemente queda pasarle cada uno de estos inputs vectorizados con un respectivo output que corresponda con ese ejemplo a la red neuronal para que pueda ser entrenada.

# Getting Started 

## Prerequisites
`nodejs`

## Installing

### Para utilizar la api de YouTube
```
npm install googleapis@21.3.0 --save
npm install google-auth-library@0.12.0 --save
```

### Para utiizar la red neuronal

```
npm install brain.js --save
npm install mimir --save
```
### Para levantar la web
```
npm install express
npm install body-parser
npm install request
```

# Como usarlo

Como utilizar este proyecto

TL;DR

```
$ nodejs yt.js
$ nodejs index.js
$ nodejs web.js
```

Primero para comenzar, se debera tener credenciales para poder utilizar la API de YouTube, que se guardaran en `client_secret.json`.

Para ello ejecutamos el archivo `yt.js`

Luego se debera entrenar la red neuronal, ejecutamos el archivo `index.js`, que lee un archivo `input.json` que ya contiene datos clasificados.

Por ultimo ejecutamos el archivo `web.js` que levanta una pagina web en [http://localhost:3001/](http://localhost:3001/)
