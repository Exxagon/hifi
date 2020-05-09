<?php
	// Commandes Decodeur Orange d'après : https://www.tv-orange.pourqui.com/commandes.html    / dec 2019

	$param1 = $_POST['param1'];
	$param2 = $_POST['param2'];
	$IpDecodeur = '192.168.1.11';
	$PortDecodeur = 8080;

	switch ($param1)
	{
		case '10' :  // param1 : Status
			sleep(1);  //  Delay to give time to decoder to process last command
			$url = 'http://' . $IpDecodeur . ':' . $PortDecodeur . '/remoteControl/cmd?operation=' . $param1;
			break;
		case '01' :  // param1 : Commandes
			switch ($param2)
			{
				case '402' :  // param2 : Chaine +
					break;
				case '403' :  // param2 : Chaine -
					break;
				case '352' :  // param2 : OK
					break;
				case '139' :  // param2 : Menu	
					break;
				case '158' :  // param2 : Retour
					break;
				case '103' :  // param2 : Haut
					break;
				case '108' :  // param2 : Bas
					break;
				case '105' :  // param2 : Gauche
					break;
				case '106' :  // param2 : Droit
					break;
				case '164' :  // param2 : Play ou Pause
					break;
				case '169' :  // param2 : Avance Rapide
					break;
				case '168' :  // param2 : Recule Rapide
					break;
				case '167' :  // param2 : Enregistrer
					break;
				default:
					break;
			}
			$url = 'http://' . $IpDecodeur . ':' . $PortDecodeur . '/remoteControl/cmd?operation=' . $param1 . '&key=' . $param2 . '&mode=0';
			break;
		default:    // param1 : Inconnu
			$url = '';
			break;
	}

	$content = file_get_contents($url);
	echo json_encode( array( 'url' => $url, 'content' => $content ) );
?>
