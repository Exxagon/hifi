<?php
	$FromCmdLine = false;
	/* if started from commandline, wrap parameters to $_POST and $_GET */
	if (!isset($_SERVER["HTTP_HOST"])) 
	{
		echo 'Script launched from cmd line'."\n";
		$_POST['param1'] = $argv[1];
		$_POST['param2'] = $argv[2];
		echo 'param1 = ' . $_POST['param1'] . '    param2 = ' . $_POST['param2'] . "\n";
		$FromCmdLine = true;
	}

	$param1 = $_POST['param1'];
	$param2 = $_POST['param2'];

	$tvip = '192.168.1.63'; //IP Address of TV
	$tvport = 55000;
	$tvmac = 'D4:9D:C0:3D:F0:0E';

	$myip = '192.168.1.62'; //Doesn't seem to be really used
	$mymac = '1c-69-7a-08-67-91'; //Used for the access control/validation, but not after that AFAIK
	$myipencoded = base64_encode($myip);
	$mymacencoded = base64_encode($mymac);

	$appstring = 'iphone..iapp.samsung'; //What the iPhone app reports
	$tvappstring = 'iphone.UD40D6310.iapp.samsung'; //Might need changing to match your TV type
	$remotename = 'php Samsung Remote'; //What gets reported when it asks for permission/also shows in General->Wireless Remote Control menu
	
	$command = $param1 . $param2;

	switch ( $command )
	{
		case "GETSTATUS":
			// curl -X GET -i --no-tcp-nodelay 192.168.1.63:8001/api/v2/ 
			// "PowerState":"on" --> ok
			// "PowerState":"standby"  --> off
			// "Failed" : --> off 
			
			$ch = curl_init();
			
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 300 );	
			curl_setopt($ch, CURLOPT_TIMEOUT, 1 );		
			curl_setopt($ch, CURLOPT_FRESH_CONNECT, true );
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt($ch, CURLOPT_URL, "http://192.168.1.63:8001/api/v2/");
			curl_setopt($ch, CURLOPT_HEADER, 0);

			$result = curl_exec($ch);
			$errors = curl_error($ch);
			$response = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			
			curl_close($ch);

			if( $FromCmdLine ) echo "Error : [" . $errors . "]\n";			// Failed here when TV powered off
			if( $FromCmdLine ) echo "Response : [" . $response . "]\n";		// Code 200 here when TV powered on or standby, otherwise 0
			if( $response == 200 )
			{
				$result = str_replace( PHP_EOL, '', $result );    				// Suppress trailing \n
				if( $FromCmdLine ) echo "Result : [" . $result . "]\n";								
				$result = strstr($result, 'PowerState' );
				if( $FromCmdLine ) echo "Result : [" . $result . "]\n";
				$result = substr( $result, 13 );
				if( $FromCmdLine ) echo "Result : [" . $result . "]\n";
				$result = strstr($result, '"', true);   						// result = on or standby or ""
				if( $FromCmdLine ) echo "Result : [" . $result . "]\n";
				if( $result == "on" ) { $param2 = "2"; }
				else if( $result == "standby" ) { $param2 = "1"; }
				else { $param2 = "3"; }
			}
			else
			{
				$param2 = "0";
			}

			break;
		
		case 'POWERON':
			exec( 'wakeonlan ' . $tvmac );	
			break;
			
		default:
			$sock = socket_create(AF_INET, SOCK_STREAM, getprotobyname('tcp'));
			$result = socket_connect($sock, $tvip, $tvport );
			
			// Envoi message partie 1
			$messagepart1 = chr(0x64) . chr(0x00) . chr(strlen($myipencoded)) . chr(0x00) . $myipencoded . chr(strlen($mymacencoded)) . chr(0x00) . $mymacencoded .	chr(strlen(base64_encode($remotename))) . chr(0x00) . base64_encode($remotename);
			$part1 = chr(0x00) . chr(strlen($appstring)) . chr(0x00) . $appstring . chr(strlen($messagepart1)) . chr(0x00) . $messagepart1;
			socket_write($sock, $part1, strlen($part1));

		
			// Envoi message partie 2
			$messagepart2 = chr(0xc8) . chr(0x00);
			$part2 = chr(0x00) . chr(strlen($appstring)) . chr(0x00) . $appstring . chr(strlen($messagepart2)) . chr(0x00) . $messagepart2;
			socket_write($sock, $part2, strlen($part2));


			// Envoi message partie 3
			$key = "KEY_" . $command;
			$messagepart3 = chr(0x00) . chr(0x00) . chr(0x00) . chr(strlen(base64_encode($command))) . chr(0x00) . base64_encode($command);
			$part3 = chr(0x00) . chr(strlen($tvappstring)) . chr(0x00) . $tvappstring . chr(strlen($messagepart3)) . chr(0x00) . $messagepart3;
			socket_write($sock,$part3,strlen($part3));
			socket_close($sock);
	}
	echo json_encode( array( 'socket_ret_code' => '0', 'param1' => $param1, 'param2' => $param2 ) );
?>

