////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// XB V1 - 28/04/2020 // Création
//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Document ready function call
$( document ).ready( fctInitialisation );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation
function fctInitialisation() 
{
	var b_debugLocal=true;
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : Start' );

	elem = document.documentElement;
	$("#openFS").click( openFullscreen );																																	

	//----------------------------------------------------------------------------------------------------------------------------------
	// Ampli : Tableau des selecteurs   																																				
	a_ampliSelector['video2,cbl,sat'] = { Texte: 'Orange', element    : document.getElementById( "idbtnAmpliInputSelectorOrange" ) };
	a_ampliSelector['dvd,bd,dvd']	  = { Texte: 'DVD', element       : document.getElementById( "idbtnAmpliInputSelectorDVD" ) };
	a_ampliSelector['strm-box']       = { Texte: 'Kodi', element      : document.getElementById( "idbtnAmpliInputSelectorKodi" ) };
	a_ampliSelector['game']       	  = { Texte: 'Game', element      : document.getElementById( "idbtnAmpliInputSelectorGame" ) };
	a_ampliSelector['video6,pc']      = { Texte: 'PC', element        : document.getElementById( "idbtnAmpliInputSelectorPC" ) };
	a_ampliSelector['video4,aux1'] 	  = { Texte: 'Aux', element       : document.getElementById( "idbtnAmpliInputSelectorAux" ) };
	a_ampliSelector['phono']          = { Texte: 'Phono', element     : document.getElementById( "idbtnAmpliInputSelectorPhono" ) };
	a_ampliSelector['bluetooth']      = { Texte: 'Bluetooth', element : document.getElementById( "idbtnAmpliInputSelectorBlueTooth" ) };
	a_ampliSelector['cd,tv/cd']       = { Texte: 'CD', element        : document.getElementById( "idbtnAmpliInputSelectorCD" ) };
	a_ampliSelector['fm'] 	          = { Texte: 'Radio', element     : document.getElementById( "idbtnAmpliInputSelectorRadio" ) };
	a_ampliSelector['tv'] 	          = { Texte: 'Télévision', element: document.getElementById( "idbtnAmpliInputSelectorTelevision" ) };
	a_ampliSelector['network,net'] 	  = { Texte: 'Réseau', element    : document.getElementById( "idbtnAmpliInputSelectorNetWork" ) };
//	a_ampliSelector['']             = '';

	a_ampliRadio['TUN09530'] = { Texte: 'BFM Business' };
	a_ampliRadio['TUN09930'] = { Texte: 'Cap Sao' };
	a_ampliRadio['TUN09890'] = { Texte: 'Chérie FM' };
	a_ampliRadio['TUN08800'] = { Texte: 'Chérie FM' };
	a_ampliRadio['TUN10460'] = { Texte: 'EUROPE 1' };
	a_ampliRadio['TUN09580'] = { Texte: 'F. Culture' };
	a_ampliRadio['TUN09460'] = { Texte: 'F. Culture' };
	a_ampliRadio['TUN09410'] = { Texte: 'F. Culture' };
	a_ampliRadio['TUN10200'] = { Texte: 'F. Culture' };
	a_ampliRadio['TUN09420'] = { Texte: 'F. Culture' };
	a_ampliRadio['TUN09860'] = { Texte: 'F. Culture' };
	a_ampliRadio['TUN10540'] = { Texte: 'France Info' };
	a_ampliRadio['TUN09130'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN09050'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN10380'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN09710'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN09950'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN09950'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN10110'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN09520'] = { Texte: 'F. Inter' };
	a_ampliRadio['TUN09130'] = { Texte: 'F. MUSIQUE' };
	a_ampliRadio['TUN09020'] = { Texte: 'F. MUSIQUE' };
	a_ampliRadio['TUN10600'] = { Texte: 'F. Musique' };
	a_ampliRadio['TUN10230'] = { Texte: 'F. Musique' };
	a_ampliRadio['TUN09270'] = { Texte: 'F. Musique' };
	a_ampliRadio['TUN09800'] = { Texte: 'F. Musique' };
	a_ampliRadio['TUN09090'] = { Texte: 'Fun Radio' };
	a_ampliRadio['TUN09330'] = { Texte: 'Fun Radio' };
	a_ampliRadio['TUN09780'] = { Texte: 'Fun Radio' };
	a_ampliRadio['TUN10630'] = { Texte: 'Impact FM' };
	a_ampliRadio['TUN09730'] = { Texte: 'Jazz Radio 2' };
	a_ampliRadio['TUN08780'] = { Texte: 'LE MOUV\'' };
	a_ampliRadio['TUN09020'] = { Texte: 'Lyon 1re' };
	a_ampliRadio['TUN09370'] = { Texte: 'MFM Radio' };
	a_ampliRadio['TUN09290'] = { Texte: 'Nostalgie' };
	a_ampliRadio['TUN10300'] = { Texte: 'NRJ Lyon' };
	a_ampliRadio['TUN09780'] = { Texte: 'Ouï FM' };
	a_ampliRadio['TUN10260'] = { Texte: 'R. Arménie' };
	a_ampliRadio['TUN09070'] = { Texte: 'R. Brume' };
	a_ampliRadio['TUN10090'] = { Texte: 'R. Calade' };
	a_ampliRadio['TUN10220'] = { Texte: 'R. Canut' };
	a_ampliRadio['TUN09650'] = { Texte: 'R. Classique' };
	a_ampliRadio['TUN09690'] = { Texte: 'R. Espace' };
	a_ampliRadio['TUN09750'] = { Texte: 'R. Espace' };
	a_ampliRadio['TUN10570'] = { Texte: 'R. Espace' };
	a_ampliRadio['TUN10580'] = { Texte: 'R. Italienne' };
	a_ampliRadio['TUN09450'] = { Texte: 'R. Judaïca Lyon' };
	a_ampliRadio['TUN10670'] = { Texte: 'R. Orient' };
	a_ampliRadio['TUN09150'] = { Texte: 'R. Pluriel' };
	a_ampliRadio['TUN09110'] = { Texte: 'R. Salam' };
	a_ampliRadio['TUN10000'] = { Texte: 'R. Scoop' };
	a_ampliRadio['TUN09200'] = { Texte: 'R. Scoop' };
	a_ampliRadio['TUN08980'] = { Texte: 'R. Trait d\'Union' };
	a_ampliRadio['TUN10140'] = { Texte: 'R. Val de Reins' };
	a_ampliRadio['TUN10100'] = { Texte: 'R. Val de Reins' };
	a_ampliRadio['TUN09360'] = { Texte: 'R. Val de Reins' };
	a_ampliRadio['TUN10700'] = { Texte: 'R. Val de Reins' };
	a_ampliRadio['TUN10140'] = { Texte: 'R. Val de Reins' };
	a_ampliRadio['TUN09510'] = { Texte: 'Fourvière' };
	a_ampliRadio['TUN10170'] = { Texte: 'Fourvière' };
	a_ampliRadio['TUN08840'] = { Texte: 'Fourvière' };
	a_ampliRadio['TUN09170'] = { Texte: 'Fourvière' };
	a_ampliRadio['TUN10650'] = { Texte: 'RFM' };
	a_ampliRadio['TUN10730'] = { Texte: 'RFM Lyon' };
	a_ampliRadio['TUN09490'] = { Texte: 'Rire et Chansons' };
	a_ampliRadio['TUN10420'] = { Texte: 'RMC' };
	a_ampliRadio['TUN08860'] = { Texte: 'RMC' };
	a_ampliRadio['TUN10500'] = { Texte: 'RTL' };
	a_ampliRadio['TUN10240'] = { Texte: 'RTL' };
	a_ampliRadio['TUN09570'] = { Texte: 'RTL 2' };
	a_ampliRadio['TUN09610'] = { Texte: 'Skyrock' };
	a_ampliRadio['TUN10070'] = { Texte: 'Sol FM' };
	a_ampliRadio['TUN10150'] = { Texte: 'SUN 101.5' };
	a_ampliRadio['TUN09470'] = { Texte: 'Tonic Radio' };
	a_ampliRadio['TUN09840'] = { Texte: 'Tonic Radio' };
	a_ampliRadio['TUN08930'] = { Texte: 'Virage' };
	a_ampliRadio['TUN10030'] = { Texte: 'Virgin' };
	
	//http://home-cinema.e-monsite.com/pages/tutoriaux/comprendre-les-formats-sonores.html
	a_ampliListeningMode['N/A']                                             = { Texte: 'Inconnu'};
	a_ampliListeningMode['pure-audio']                                      = { Texte: 'Pure Audio'};
	a_ampliListeningMode['stereo']                                          = { Texte: 'Stéréo'};
	a_ampliListeningMode['all-ch-stereo']                                   = { Texte: 'Stéréo/Tous canaux'};
	a_ampliListeningMode['full-mono']                                       = { Texte: 'Mono'};
	a_ampliListeningMode['direct']                                          = { Texte: 'Direct'};
	a_ampliListeningMode['plii,pliix-movie,dolby-atmos,dolby-surround']     = { Texte: 'Dolby Surround'};
	a_ampliListeningMode['plii,pliix-thx-music,dolby-surround-thx-music']   = { Texte: 'Dolby Surround THX'};
	a_ampliListeningMode['plii,pliix-thx-cinema,dolby-surround-thx-cinema'] = { Texte: 'Dolby Surround THX'};
	a_ampliListeningMode['orchestra']                                       = { Texte: 'Orchestra'};
	a_ampliListeningMode['studio-mix']                                      = { Texte: 'Studio-Mix'};
	a_ampliListeningMode['theater-dimensional']                             = { Texte: 'Théatre 5.1 virtuel'};
	a_ampliListeningMode['neo-6,neo-x-thx-cinema,dts-neural-x-thx-cinema']  = { Texte: 'DTS Neural THX'};
	a_ampliListeningMode['neo-6-cinema,neo-x-cinema,dts-x,neural-x']        = { Texte: 'DTS Neural'};
//	a_ampliListeningMode['']                                              = { Texte: ''};
	
	//----------------------------------------------------------------------------------------------------------------------------------
	// Ampli : lien bouton/fonction																																			
	$("#idbtnAmpliSwitchOnOff").click( fctAmpliSwitchOnOff );
	$("#idbtnAmpliMasterVolumeLevelUp").click( {param1    : 'master-volume', param2 : 'level-up'}, fctAmpliCmd );
	$("#idbtnAmpliMasterVolumeLevelDown").click( {param1  : 'master-volume', param2 : 'level-down'}, fctAmpliCmd );
	$("#idbtnAmpliAudioMute").click( {param1              : 'audio-muting', param2  : ''}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorOrange").click( {param1    : 'input-selector', param2: 'cbl'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorDVD").click( {param1       : 'input-selector', param2: 'dvd'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorKodi").click( {param1      : 'input-selector', param2: 'strm-box'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorPC").click( {param1        : 'input-selector', param2: 'pc'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorGame").click( {param1      : 'input-selector', param2: 'game'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorAux").click( {param1       : 'input-selector', param2: 'aux1'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorPhono").click( {param1     : 'input-selector', param2: 'phono'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorBlueTooth").click( {param1 : 'input-selector', param2: 'bluetooth'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorCD").click( {param1        : 'input-selector', param2: 'cd'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorRadio").click( {param1     : 'input-selector', param2: 'fm'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorTelevision").click( {param1: 'input-selector', param2: 'tv'}, fctAmpliCmd );
	$("#idbtnAmpliInputSelectorNetWork").click( {param1   : 'input-selector', param2: 'net'}, fctAmpliCmd );
	$("#idbtnAmpliInputMovie").click( {param1             : 'listening-mode', param2: 'movie'}, fctAmpliCmd );
	$("#idbtnAmpliInputMusic").click( {param1             : 'listening-mode', param2: 'music'}, fctAmpliCmd );
	$("#idbtnAmpliInputGame").click( {param1              : 'listening-mode', param2: 'game'}, fctAmpliCmd );
	$("#idbtnAmpliRadioUp").click( {param1                : 'tuner-channel', param2 : 'TUNUP'}, fctAmpliCmd );
	$("#idbtnAmpliRadioDown").click( {param1              : 'tuner-channel', param2 : 'TUNDOWN'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenu").click( {param1              : 'setup', param2 : 'menu'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenuUp").click( {param1            : 'setup', param2 : 'up'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenuDown").click( {param1          : 'setup', param2 : 'down'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenuLeft").click( {param1          : 'setup', param2 : 'left'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenuRight").click( {param1         : 'setup', param2 : 'right'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenuEnter").click( {param1         : 'setup', param2 : 'enter'}, fctAmpliCmd );
	$("#idbtnAmpliSetupMenuExit").click( {param1         : 'setup', param2 : 'exit'}, fctAmpliCmd );
	 
	//----------------------------------------------------------------------------------------------------------------------------------
	// Ampli : Get all status
	$.ajax({
		type: "POST",
		url: '/php/Ampli_cmd.php',
		data: {'type':'status','cmd':'system-power=query input-selector=query volume=query TUNQSTN audio-muting=query listening-mode=query' },
		success: function( rep )	{
			var jsonRep = JSON.parse( rep );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation\njsonRep ligne 210 : ', jsonRep );
			b_ampliOn = jsonRep.rep[0] === 'TX-NR686: system-power = on' ? true : false;
			b_ampliInputSelector = jsonRep.rep[1].substring( 27 );
			b_ampliVolume = jsonRep.rep[2].substring( 25 );
			b_ampliTunerChannel = jsonRep.rep[3].substring( 10 );
			b_ampliMuted = jsonRep.rep[4] === 'TX-NR686: audio-muting = on' ? true : false;
			b_ampliListeningMode = jsonRep.rep[5].substring( 27 );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : Get Ampli Status success\njsonRep : ', jsonRep, '\nb_ampliOn : ', b_ampliOn,'\nb_ampliInputSelector : ', b_ampliInputSelector, '\nb_ampliVolume : ', b_ampliVolume,'\nb_ampliTuner : ', b_ampliTunerChannel, '\nb_ampliMuted : ', b_ampliMuted, '\nb_ampliListeningMode : ', b_ampliListeningMode );
			fctAmpliDisplayOnOff( '' ); 
			if( b_ampliOn )
			{
				fctAmpliDisplaySelector( b_ampliInputSelector );
				fctAmpliDisplayVolume( b_ampliVolume );
				fctAmpliDisplayMuteUnmute( b_ampliMuted );
				fctAmpliDisplayListeningMode( b_ampliListeningMode  );
				if( b_ampliInputSelector != 'fm' )
				{
					document.getElementById('idbtnAmpliRadioUp').innerHTML = '<i></i>';
					document.getElementById('idbtnAmpliRadioDown').innerHTML = '<i></i>';
					document.getElementById('iddiv_AmpliRadioTexte').innerHTML = '<i></i>';
				}
			}
			// suite
		},
		error: function( rep )	{
			var jsonRep = JSON.parse( rep );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : Get Ampli Status error\njsonRep : ', jsonRep );
			// suite
		}
	});

	fctStartTime();
	
//	setTimeout( "location.reload(true);", 60000 );
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : End' )
}