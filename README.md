Ajout d'un slider
-----------------
	26/4/2020
	Pas fini car n'arrive pas à afficher la valeur du slider
	Le slider n'a pas le même aspect sur IE et sur Chrome 
	Voir  https://www.w3schools.com/howto/howto_js_rangeslider.asp


Ajout des multipages
--------------------
	26/4/2020
	multipage, création multipage dans vscode, structure des fichiers/répertoires : https://www.youtube.com/watch?v=iXSSHlOe47s
	balise aside : https://www.alsacreations.com/article/lire/1376-html5-section-article-nav-header-footer-aside.html
	Au départ, inspiré de : https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/multi-page-html-sites

Grille responsive BootStrap 4
-----------------------------
	https://www.youtube.com/watch?v=1nZpIwo6hq0

Outils pour commande php
------------------------
	ampli onkyo TX NR 868
	-----
		/usr/local/bin/onkyo
		/usr/local/bin/onkyo --help-commands main input-selector      par exemple pour avoir la liste des arguments de la commande input-selector dans la zone main

Site sur ampli onkyo
	https://pypi.org/project/onkyo-eiscp/
	http://michael.elsdoerfer.name/onkyo/ISCP-V1.26_2013.xlsx

Site domotique
	https://www.openhab.org/addons/bindings/onkyo/

Bugs
----
	Boutons Radio+ et Radio- non implémentés
	Message "SameSite attribut" sur page météo dans la console Chrome, pourquoi ?
	Chargement du favicon ne marche pas

Télévision
----------
	Tentative d'installation de HASS
		Tuto ; https://www.home-assistant.io/hassio/
		Installation de la VM HASS : https://www.ivobeerens.nl/2019/01/15/install-home-assistant-hass-io-in-vmware-workstation/
		root / pas de mdp, login, ip a ---> http://192.168.23.129:8123
		https://www.juanmtech.com/guide-to-home-assistant/
		https://github.com/roberodin/ha-samsungtv-custom
		Hass voit l'imprimante, l'ampli
		Hass a vu une fois la télé et peut l'allumer & l'éteindre et bouger le volume
		Trop compliqué

	Tentative samsungctl
		Suivant : https://www.blog-libre.org/2018/12/07/samsungctl-commander-sa-tele-en-ligne-de-commande/ --> Télé trop récente : 



Commande volets
---------------
Tuto : https://f-leb.developpez.com/tutoriels/arduino/esp8266/debuter/

Recherches perso
	ESP8266 d'après le constructeur
	Enregistrement des périphériques sur smartlife
	BBD1C7 : 192.168.1.65 --> BALCON
	DDF689 : 192.168.1.66
	B5BCE9 : 192.168.1.67
	B5BD60 : 192.168.1.68
	port 6668, ne refuse pas la connexion, mais reste bloqué en curl

Création de la plateforme sur iot tuya selon https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md
	iot tuya com : https://auth.tuya.com
	Access ID/Client ID: fuy5v7swtdkcy7cg7ujm    ( API key ) 
	Access Secret/Client Secret: 7yhpvsgukqh9kg3mt795cnt3xvknmryj     ( API secret )
	ChannelID : androidapp1   ( = schema )

Installation de nodejs & npm sur exxagon selon https://linuxize.com/post/how-to-install-node-js-on-debian-10/ 
	apt-get update
	apt-get upgrade
	apt-get install npm
	npm i
	npm test

Installation du client tuya selon https://github.com/TuyaAPI/cli#tuyapicli--
	npm i @tuyapi/cli -g
	npm i @tuyapi/cli@1.1.0 -g
	Enregistrement d'un périphérique
		Mettre le périphérique en mode link 
		tuya-cli link --api-key fuy5v7swtdkcy7cg7ujm --api-secret 7yhpvsgukqh9kg3mt795cnt3xvknmryj --schema androidapp1 --ssid Livebox-B3D2 --password 95E3D9D53CA7694D2962E59A35 --region fr

A essayer
	tuya-convert
		https://www.heise.de/ct/artikel/Tuya-Convert-Escaping-the-IoT-Cloud-no-solder-needed-4284830.html
		Attente arrivée bouton supplémentaire
	NodeRed

wscat -n --connect wss://192.168.1.63:8002/api/v2/channels/samsung.remote.control
{
	"data": {
		"clients": [{
			"attributes": {
				"name": null
			},
			"connectTime": 1588932307109,
			"deviceName": "Smart Device",
			"id": "80944981-69af-4036-b2de-c25e13bd9edd",
			"isHost": false
		}],
		"id": "80944981-69af-4036-b2de-c25e13bd9edd",
		"token": "35729227"
	},
	"event": "ms.channel.connect"
}

Télé en mode dev : apps, puis 12345, puis dev mode on et ip source
curl http://192.168.1.63:8001/api/v2/
{
	"device": {
		"FrameTVSupport": "false",
		"GamePadSupport": "true",
		"ImeSyncedSupport": "true",
		"Language": "fr_FR",
		"OS": "Tizen",
		"PowerState": "on",
		"TokenAuthSupport": "true",
		"VoiceSupport": "true",
		"WallScreenRatio": "0",
		"WallService": "false",
		"countryCode": "FR",
		"description": "Samsung DTV RCR",
		"developerIP": "0.0.0.0",
		"developerMode": "0",
		"duid": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
		"firmwareVersion": "Unknown",
		"id": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
		"ip": "192.168.1.63",
		"model": "19_MUSEM_QTV",
		"modelName": "QE75Q90RATXXC",
		"name": "[TV] TV",
		"networkType": "wired",
		"resolution": "3840x2160",
		"smartHubAgreement": "true",
		"type": "Samsung SmartTV",
		"udn": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
		"wifiMac": "d4:9d:c0:3d:f0:0e"
	},
	"id": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
	"isSupport": "{\"DMP_DRM_PLAYREADY\":\"false\",\"DMP_DRM_WIDEVINE\":\"false\",\"DMP_available\":\"true\",\"EDEN_available\":\"true\",\"FrameTVSupport\":\"false\",\"ImeSyncedSupport\":\"true\",\"TokenAuthSupport\":\"true\",\"remote_available\":\"true\",\"remote_fourDirections\":\"true\",\"remote_touchPad\":\"true\",\"remote_voiceControl\":\"true\"}\n",
	"name": "[TV] TV",
	"remote": "1.0",
	"type": "Samsung SmartTV",
	"uri": "http://192.168.1.63:8001/api/v2/",
	"version": "2.0.25"
}

rccli.zip : https://forum.samygo.tv/download/file.php?id=9555
	./rccli  192.168.1.63 KEY_POWEROFF -d
		rccli v0.2 for Samsung TV series K/M/Q by zoelechat @ SamyGO
		libwebsocket_client_connect: direct conn
		__libwebsocket_client_connect_2
		__libwebsocket_client_connect_2: address 192.168.1.63
		connected
		ext x-webkit-deflate-frame vetoed
		GET /api/v2/channels/samsung.remote.control?name=cmNjbGk= HTTP/1.1
		Pragma: no-cache
		Cache-Control: no-cache
		Host: 192.168.1.63
		Upgrade: websocket
		Connection: Upgrade
		Sec-WebSocket-Key: wby5Peafec0Z2afv9al6rA==
		Origin: 192.168.1.63
		Sec-WebSocket-Protocol: dumb-increment-protocol
		Sec-WebSocket-Extensions: deflate-frame
		Sec-WebSocket-Version: 13


		* Sending KEY_POWEROFF to 192.168.1.63 ...
		Websocket connections opened
		lws_client_interpret_server_handshake: cPprotocol='dumb-increment-protocol'
		no client extensions allowed by server
		rx 36 '{"event":"ms.channel.unauthorized"}
		'
		sending close indication...
		sent close indication, awaiting ack
		Exiting ...
		libwebsocket_close_and_free_session: just_kill_connection
		not calling back closed due to old_state=0
		libwebsocket_close_and_free_session: just_kill_connection
		calling back CLOSED


wscat pour ouvrir
	https://github.com/Ape/samsungctl/issues/75 pour envoyer des json channel.emit ( y a t il une liste ?   --> Ce serait dans https://review.tizen.org/git/?p=platform/core/convergence/app-comm-svc.git;a=blob;f=MSF-Node/org.tizen.multiscreen/server/plugins/plugin-api-v2/channels/index.js;h=8d548dcdda4e9fd12a9d280e7ee4cc3199e8e967;hb=refs/heads/tizen_3.0#l374 
	également : https://pastebin.com/WP5Hc9GD )
			App Tizen Id
			Ahw07WXIjx.Dailymotion
				tisT7SVUug.tunein
				cexr1qp97S.Deezer
				xqqJ00GGlC.okidoki
				4ovn894vo9.Facebook
				vbUQClczfR.Wuakitv
				QizQxC7CUf.PlayMovies
				QBA3qXl8rv.Kick
				DJ8grEH6Hu.arte
				JtPoChZbf4.Vimeo
				hIWwRyZjcD.GameFlyStreaming
				sHi2hDJGmf.nolim
				guMmq95nKK.CanalPlusLauncher
				RN1MCdNq8t.Netflix / org.tizen.netflix-app
				evKhCgZelL.AmazonIgnitionLauncher2 / org.tizen.ignition
				9Ur5IzDKqV.TizenYouTube
				gDhibXvFya.HBOGO
				EmCpcvhukH.ElevenSports
				ASUvdWVqRb.FilmBoxLive
				rJeHak5zRg.Spotify
				ABor2M9vjb.acc   (AccuWeather)
				EkzyZtmneG.My5
				yFo6bAK50v.Dennexpres
				gdEZI5lLXr.Europa2FHD
				bm9PqdAwjv.TvSme
				dH3Ztod7bU.IDNES
				wsFJCxteqc.OnetVodEden
				rZyaXW5csM.TubaFM
				4bjaTLNMia.curzon
				RVvpJ8SIU6.ocs
				bstjKvX6LM.molotov
				RffagId0eC.SfrSport
				phm0eEdRZ4.ExtraTweetIM2
				VAarU8iUtx.samsungTizen   (Vevo)
				g0ScrkpO1l.SmartIPTV
				kIciSQlYEM.plex

Projet Tizen
	https://review.tizen.org/git/

Demander la liste des applications
	{"method":"ms.channel.emit","params":{"event": "ed.installedApp.get", "to":"host"}}

Pop d'authentification ?
	Unless you want TV to popup everytime, better define device name once for all :) https://www.base64encode.org/

 curl -vX GET -i 192.168.1.63:8001/api/v2/
		Note: Unnecessary use of -X or --request, GET is already inferred.
		* Expire in 0 ms for 6 (transfer 0x55deec672f50)
		*   Trying 192.168.1.63...
		* TCP_NODELAY set
		* Expire in 200 ms for 4 (transfer 0x55deec672f50)
		* Connected to 192.168.1.63 (192.168.1.63) port 8001 (#0)
		> GET /api/v2/ HTTP/1.1
		> Host: 192.168.1.63:8001
		> User-Agent: curl/7.64.0
		> Accept: */*
		>
		< HTTP/1.1 200 OK
		HTTP/1.1 200 OK
		< content-type: application/json; charset=utf-8
		content-type: application/json; charset=utf-8
		< content-length: 1243
		content-length: 1243
		<
		{
			"device": {
				"FrameTVSupport": "false",
				"GamePadSupport": "true",
				"ImeSyncedSupport": "true",
				"Language": "fr_FR",
				"OS": "Tizen",
				"PowerState": "on",												passe à standby si off via la télécommande
				"TokenAuthSupport": "true",
				"VoiceSupport": "true",
				"WallScreenRatio": "0",
				"WallService": "false",
				"countryCode": "FR",
				"description": "Samsung DTV RCR",
				"developerIP": "192.168.1.12",
				"developerMode": "0",
				"duid": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
				"firmwareVersion": "Unknown",
				"id": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
				"ip": "192.168.1.63",
				"model": "19_MUSEM_QTV",
				"modelName": "QE75Q90RATXXC",
				"name": "[TV] TV",
				"networkType": "wired",
				"resolution": "3840x2160",
				"smartHubAgreement": "true",
				"type": "Samsung SmartTV",
				"udn": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
				"wifiMac": "d4:9d:c0:3d:f0:0e"
			},
			"id": "uuid:ab5e87cb-3d4c-4237-82c2-8060a8dfdf66",
			"isSupport": "{\"DMP_DRM_PLAYREADY\":\"false\",\"DMP_DRM_WIDEVINE\":\"false\",\"DMP_available\":\"true\",\"EDEN_available\":\"true\",\"FrameTVSupport\":\"false\",\"ImeSyncedSupport\":\"true\",\"TokenAuthSupport\":\"true\",\"remote_available\":\"true\",\"remote_fourDirections\":\"true\",\"remote_touchPad\":\"true\",\"remote_voiceControl\":\"true\"}\n",
			"name": "[TV] TV",
			"remote": "1.0",
			"type": "Samsung SmartTV",
			"uri": "http://192.168.1.63:8001/api/v2/",
			"version": "2.0.25"
		}
		* Connection #0 to host 192.168.1.63 left intact


https://www.gitmemory.com/issue/tavicu/homebridge-samsung-tizen/101/495909466
	{
		method : 'ms.channel.emit',
		params : {
			data  : JSON.stringify({
				value: 'on',
				request: 'set_artmode_status',
				id: '545fc0c1-bd9b-48f5-8444-02f9c519aaec'
			}),
			to    : 'host',
			event : 'art_app_request'
		}
	}

https://homey.app/en-us/app/com.samsung.smart/Samsung-SmartTV/

télé : 
	MN : QE75Q90RATXXC
	SN : 0C703SIM900161E
	FW : T-MSMDEUC-1356.2
	FC : SWU-OU_T-MSMDEUC_1356_200305
	MI : T-MSMDEUC
	LS : EU_SPAIN
	DI : KLCKJITT4NSKG
	MA : D49DC03DF00E
	SC : 10001_AC7_HB63_Z 

