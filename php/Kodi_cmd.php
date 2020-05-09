<?php
//	$data = $_POST['request'];
	$data = '{\'jsonrpc\': \'2.0\', \'id\': 30, \'method\': \'Player.GetActivePlayers\', \'params\': {},}';
	$hostname = '192.168.1.38';
	$port = 8080;

	$url = 'http://'.$hostname.':'.$port.'/jsonrpc?request=';

	echo $url . $data;
	
	$ch = curl_init($url);
	$postString = http_build_query(json_decode($data), '', '&');
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	echo $response;
?>