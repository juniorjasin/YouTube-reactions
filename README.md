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



# Como usarlo

Primero para comenzar, se debera tener credenciales para poder utilizar la API de YouTube, que se guardaran en `client_secret.json`.

Para ello ejecutamos el archivo `yt.js`

Luego se debera entrenar la red neuronal, ejecutamos el archivo `index.js`, que lee un archivo `input.json` que ya contiene datos clasificados.

Por ultimo ejecutamos el archivo `web.js` que levanta una pagina web en [http://localhost:3001/](http://localhost:3001/)


