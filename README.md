#ReflectOS
##Introduction
ReflectOS est une interface graphique dédié a l'utilisation sur un mirroir. Installé sur la raspberry pi et fonctionnant grace a Node.js affiche diverses informations comme la météo, les dernieres informations ou les prochains évènements.
##Fonctionalités
ReflectOs auras les fonctionalités suivantes :

 * La météo : fournis par OpenWeatherMap API
 * Les news : fournis par feedzilla
 * Deezer : fournis par l'API prévue a cet effet
 * Reconaissance vocale : fournis par l'API de google
 * Les prochains évènements : en lien avec le calendrier Google
 ##Dépendances
 Les dépendances de cette application Node.js sont les suivantes

 * Express
 * Socket.io
Les dépendances ne sont pas incluses et doivent etres installées ensuite avec la commande suivante

    npm install {nom de la dépendance}