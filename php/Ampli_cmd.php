<?php

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTES
//
// Utilisation de onkyo-eiscp, version: 1.2.7 ( Control Onkyo receivers over ethernet )
// Home-page: https://github.com/miracle2k/onkyo-eiscp / Michael Elsdörfer / michael@elsdoerfer.com / License: MIT
// Avec Python 3.7.
// Dans /usr/local/lib/python3.7/dist-packages/eiscp/core.py, ligne 102, ajout de 3 lignes de debug 
//       # A header is always 16 bytes in length
//        assert len(bytes) == 16
//        """ Ajouté XB 12/1/2020 pour debug
//        print(bytes)
//        Fin ajout XB """
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local parameters
$hostname = 'ampli.home';
$port = 60128;

// Get parameters from caller
$type = $_POST['type'];
$cmd = $_POST['cmd'];

exec( '/usr/local/bin/onkyo --host ' . $hostname . ' --port ' . $port . ' ' . $cmd, $rep, $ret_code );

// retour du php sous forme de json
echo json_encode( array( 'type' => $type, 'rep' => $rep ) );


//			do
//			{
//				exec( '/usr/local/bin/onkyo --host ' . $hostname . ' --port ' . $port . ' ' . $param1 . '=' . $param2, $ret, $exec_ret_code );
//			}
//			while( $exec_ret_code != 0 );
?>

