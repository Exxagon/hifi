////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// XB V1 - 28/04/2020 // Création
// 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli
let b_ampliOn; // indique si l'ampli est allumé ou non
let b_ampliMuted; // indique si l'ampli est en mode mode ou non
let b_ampliInputSelector;
var a_ampliSelector = new Array(); // Pour stocker le nom des canaux de l'ampli en fonction du selecteur retourné
var a_ampliRadio = new Array(); // Liste des radios de Lyon
var a_ampliListeningMode = new Array(); // Liste des modes d'écoute
var b_ampliVolume;
var b_ampliTunerChannel; // indique le Tuner actuel, sous forme TUNxxxxx
var b_ampliListeningMode; // indique le traitement audio appliqué ( Surround, stéréo .. )

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Décodeur
let b_decoderOn;    														// indique si le décodeur est allumé ou non 
var b_decoderPlayedMediaId;												// indique un numéro en rapport avec la channel selectionnee
var b_decodeurOsdContext;
var b_decoderChannel = new Array();									// Pour stocker le nom des channels en fonction du b_decoderPlayedMediaId
var a_decoderStatus = new Array();									// Pour stocker l'état du décodeur en fonction d'b_decodeurOsdContext
var elem;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TV
var b_TVOn;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Debug
var b_debugGlobal=false;
var b_debugerror=true;
let tst = 'tst1';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Affichage du mode de traitement audio
function fctAmpliDisplayListeningMode( listeningMode ){
	var b_debugLocal=false;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplayListeningMode\nlisteningMode : ', listeningMode );
	if ( typeof a_ampliListeningMode[listeningMode]  !== "undefined" ) {
		document.getElementById("iddiv_AmpliInputTexte" ).innerHTML = a_ampliListeningMode[listeningMode].Texte;	
	} else {
		document.getElementById("iddiv_AmpliInputTexte" ).innerHTML = '!'+ listeningMode;	
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Sources button management
function fctAmpliSelectSelectorButton( idBtn )
{
	var b_debugLocal=false;
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliSelectSelectorButton : Start' );
	
	var a_idbtnSelectors = new Array();											// Selector button ids list
	var idbtnSelector;
	
	a_idbtnSelectors['idbtnAmpliInputSelectorOrange']     = idbtnAmpliInputSelectorOrange;
	a_idbtnSelectors['idbtnAmpliInputSelectorDVD']        = idbtnAmpliInputSelectorDVD;
	a_idbtnSelectors['idbtnAmpliInputSelectorKodi']       = idbtnAmpliInputSelectorKodi;
	a_idbtnSelectors['idbtnAmpliInputSelectorPC']         = idbtnAmpliInputSelectorPC;
	a_idbtnSelectors['idbtnAmpliInputSelectorRadio']      = idbtnAmpliInputSelectorRadio;
	a_idbtnSelectors['idbtnAmpliInputSelectorTelevision'] = idbtnAmpliInputSelectorTelevision;
	a_idbtnSelectors['idbtnAmpliInputSelectorNetWork']    = idbtnAmpliInputSelectorNetWork;
	a_idbtnSelectors['idbtnAmpliInputSelectorBlueTooth']  = idbtnAmpliInputSelectorBlueTooth;

	for( idbtnSelector in a_idbtnSelectors )
	{
		if( idbtnSelector == idBtn ) $(a_idbtnSelectors[idbtnSelector]).addClass("active");
		else $(a_idbtnSelectors[idbtnSelector]).removeClass("active");
	}
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliSelectSelectorButton : End' );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Affichage des selectors
function fctAmpliDisplaySelector( Selector ) {
	var b_debugLocal=false;

	switch( a_ampliSelector[Selector].Texte )
	{
		
		case 'Bluetooth' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Bluetooth' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorBlueTooth');
			break;

		
		case 'Orange' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Orange' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorOrange');
			break;

		case 'DVD' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - DVD' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorDVD');
			break;
			
		case 'PC' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - PC' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorPC');
			break;
			
		case 'Télévision' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Télévision' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorTelevision');
			break;
			
		case 'Réseau' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Réseau' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorNetWork');
			break;

		case 'Radio' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Radio' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorRadio');
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':'TUNQSTN' },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					b_ampliTunerChannel = jsonRep.rep[0].substring( 10 );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector\njsonRep.rep[0].substring( 10 ) : ', jsonRep.rep[0].substring( 10 ) );
					fctAmpliDisplayTunerChannel( b_ampliTunerChannel );
					if( typeof a_ampliRadio[b_ampliTunerChannel] === "undefined" )
					{
						freq =  jsonRep.rep[0].substring( 13 );
						if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Radio not listed\nFréquence : ', freq, '\nMHz : ', freq/100 );
						$( "#iddiv_AmpliRadioTexte" ).text( freq/100 + ' MHz' );
					}
					else
					{
						$( "#iddiv_AmpliRadioTexte" ).text( a_ampliRadio[jsonRep.rep[0].substring( 10 )].Texte );
					}
					document.getElementById('idbtnAmpliRadioUp').innerHTML = '<i class="material-icons">fast_forward</i>';
					document.getElementById('idbtnAmpliRadioDown').innerHTML = '<i class="material-icons">fast_rewind</i>';
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctAmpliDisplaySelector : Get radio tune error' );
					$( "#iddiv_AmpliRadioTexte" ).text( '...Radio...' );
				}
			});
			break;
			
		case 'Kodi' :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Kodi' );
			fctAmpliSelectSelectorButton('idbtnAmpliInputSelectorKodi');
			break;
			
		default :
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Default' );
			break;
	}
	p=a_ampliSelector[Selector].element;
	$(p).parent().addClass('active');
	document.getElementById('iddiv_AmpliInputSelector').innerHTML = a_ampliSelector[Selector].Texte ;
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector\na_ampliSelector[Selector].element : ', a_ampliSelector[Selector].element, '\nSelector ', Selector, '\nParent : ', $(a_ampliSelector[Selector].element).parent());
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Gestion des boutons Mute/Unmute en fonction de l'état mute de l'ampli
function fctAmpliDisplayMuteUnmute( b_ampliMuted ){
	var b_debugLocal=false;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplayMuteUnmute\nb_ampliMuted : ', b_ampliMuted );
	if( b_ampliMuted )
	{
		document.getElementById('idbtnAmpliAudioMute').innerHTML = '<i class=\"material-icons\" style=\"color:red;\">volume_off</i>';
		document.getElementById('iddiv_AmpliVolumeTexte').style.color = "rgb(68, 78, 88)";
	}
	else
	{
		document.getElementById('idbtnAmpliAudioMute').innerHTML = '<i class=\"material-icons\" style=\"color:green;\">volume_off</i>';
		document.getElementById('iddiv_AmpliVolumeTexte').style.color = "inherit";
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Affichage du volume
function fctAmpliDisplayVolume( ampliVolume ){
	var b_debugLocal=false;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplayVolume\fctAmpliDisplayVolume : ', ampliVolume );
	document.getElementById( "iddiv_AmpliVolumeTexte" ).innerHTML = 'Volume : ' + ampliVolume + '%';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Switch ampli on or off depending on b_ampliOn status
function fctAmpliSwitchOnOff( ) 
{
	var b_debugLocal=true;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliSwitchOnOff : Start\nCalled from : ', this.id, '\nb_AmpliOn : ', b_ampliOn );
	var phpcmd = ( b_ampliOn ) ? 'system-power=off' : 'system-power=on' ;
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliSwitchOnOff\nSend : ', phpcmd ); 
	$.ajax({
		type: "POST",
		url: '/php/Ampli_cmd.php',
		data: {'type':'cmd','cmd':phpcmd },
		success: function( rep )	
		{
			var jsonRep = JSON.parse( rep );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliSwitchOnOff : Send cmd success : \njsonRep.rep : ', jsonRep.rep );
			b_ampliOn = jsonRep.rep[0] === 'TX-NR686: system-power = on' ? true : false;
			fctAmpliDisplayOnOff( );
			if( b_ampliOn )
			{
				if( window.location.pathname.split("/").pop() != 'index.html' ) // if not on page index.html
				{
					fctAmpliDisplaySelector( b_ampliInputSelector );   //  ne pas faire si page = index.html
					fctAmpliDisplayListeningMode( b_ampliListeningMode, b_ampliTunerChannel ); //  ne pas faire si page = index.html
				}
				fctAmpliDisplayVolume( b_ampliVolume );
				fctAmpliDisplayMuteUnmute( b_ampliMuted );
			}
		}, 
		error: function(rep) 
		{
			var jsonRep = JSON.parse( rep );
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctAmpliSwitchOnOff : Send cmd error : \njsonRep : ', jsonRep );
		}
	});

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliSwitchOnOff : End' );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Gestion des boutons ON & OFF en fonction de l'état de l'ampli
function fctAmpliDisplayOnOff(  ) 
{
	var b_debugLocal=true;

	var page = window.location.pathname.split("/").pop();
	var icon = ( page == 'index.html' )?'<i class=\"material-icons\">speaker</i>':'';
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplayOnOff\nb_ampliOn : ', b_ampliOn );
	if( b_ampliOn )
	{

		document.getElementById('idbtnAmpliSwitchOnOff').innerHTML = icon + '<i class=\"material-icons\" style=\"color:green;\">power_settings_new</i>';
	}
	else
	{
		document.getElementById('idbtnAmpliSwitchOnOff').innerHTML = icon + '<i class=\"material-icons\" style=\"color:red;\">power_settings_new</i>';
		document.getElementById('iddiv_AmpliVolumeTexte').innerHTML = '<i></i>';
		if( page != 'index.html' )
		{
			document.getElementById('iddiv_AmpliInputTexte').innerHTML = '<i></i>';
			document.getElementById('idbtnAmpliRadioUp').innerHTML = '<i></i>';
			document.getElementById('idbtnAmpliRadioDown').innerHTML = '<i></i>';
			document.getElementById('iddiv_AmpliRadioTexte').innerHTML = '<i></i>';
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Send cmd through a php call
//  suivant https://code.tutsplus.com/tutorials/how-to-use-ajax-in-php-and-jquery--cms-32494
// /php/Ampli_cmd.php?command=system-power=query
function fctAmpliCmd( event ) 
{
	var b_debugLocal=true;


	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Start\nCalled from : ', this.id, '\nSend Cmd with :\nParam1 : ', event.data.param1, '\nParam2 : ', event.data.param2 );

	switch( event.data.param1 )
	{
		case 'tuner-channel' :
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':event.data.param2 },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					b_ampliTunerChannel = jsonRep.rep[0].substring( 10 );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Set tuner-channel success\njsonRep : ', jsonRep, '\nb_ampliTunerChannel', b_ampliTunerChannel );
					fctAmpliDisplayTunerChannel( b_ampliTunerChannel );
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Set tuner-channel error\njsonRep : ', jsonRep, '\nyyy', yyy );
				}
			});
			break;
			
		case 'listening-mode' :
			var cmd = event.data.param1 + '=' + event.data.param2;
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':cmd },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					b_ampliListeningMode = jsonRep.rep[0].substring( 27 );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Listening mode command success\nAnswer : ', jsonRep.rep[0], '\nb_ampliListeningMode', b_ampliListeningMode );
					fctAmpliDisplayListeningMode( b_ampliListeningMode );
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Listening mode commanderror\nAnswer : ', jsonRep.rep[0] );
				}
			});
			break;
			
		case 'setup' :
			var cmd = event.data.param1 + '=' + event.data.param2;
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':cmd },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					b_ampliInputSelector = jsonRep.rep[0].substring( 27 );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Input Selector command success\nAnswer : ', jsonRep.rep[0], '\nb_ampliInputSelector', b_ampliInputSelector );
					fctAmpliDisplaySelector( b_ampliInputSelector );
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Listening mode command error\nAnswer : ', jsonRep.rep[0] );
				}
			});
			break;
					
		case 'input-selector' :
			var cmd = event.data.param1 + '=' + event.data.param2;
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':cmd },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					b_ampliInputSelector = jsonRep.rep[0].substring( 27 );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Input Selector command success\nAnswer : ', jsonRep.rep[0], '\nb_ampliInputSelector', b_ampliInputSelector );
					fctAmpliDisplaySelector( b_ampliInputSelector );
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Listening mode command error\nAnswer : ', jsonRep.rep[0] );
				}
			});
			if( event.data.param2 != 'fm' )
			{
				document.getElementById('idbtnAmpliRadioUp').innerHTML = '<i></i>';
				document.getElementById('idbtnAmpliRadioDown').innerHTML = '<i></i>';
				document.getElementById('iddiv_AmpliRadioTexte').innerHTML = '<i></i>';
			}
			break;
					
		case 'audio-muting' :
			var cmd = (b_ampliMuted)?(event.data.param1+'=off'):(event.data.param1+'=on');
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':cmd },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					b_ampliMuted = jsonRep.rep[0].substring( 10 ) == 'audio-muting = on' ? true : false ;
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Audio mute command success\nAnswer : ', jsonRep.rep[0], '\nb_ampliMuted', b_ampliMuted );
					fctAmpliDisplayMuteUnmute( b_ampliMuted );
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Listening mode command error\nAnswer : ', jsonRep.rep[0] );
				}
			});
			break;
					
		case 'master-volume' :
			var cmd = event.data.param1 + '=' + event.data.param2;
			$.ajax({
				type: "POST",
				url: '/php/Ampli_cmd.php',
				data: {'type':'cmd','cmd':cmd },
				success: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Volume command success\nAnswer : ', jsonRep.rep[0], '\nb_ampliVolume', b_ampliVolume );
					b_ampliVolume = jsonRep.rep[0].substring( 25 );
					fctAmpliDisplayVolume( b_ampliVolume );
					b_ampliMuted = false;
					fctAmpliDisplayMuteUnmute( b_ampliMuted );
				},
				error: function( rep )	{
					var jsonRep = JSON.parse( rep );
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Listening mode command error\nAnswer : ', jsonRep.rep[0] );
				}
			});
			break;

		default : 
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : Other unhandled command\nevent.param1 : ', event.data.param1, '\nevent.param2 : ', event.data.param2 );
			break;
	}

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliCmd : End' );
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ampli : Display current radio channel
function fctAmpliDisplayTunerChannel( b_ampliTunerChannel )
{
	var b_debugLocal=false;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplayTunerChannel\b_ampliTunerChannel : ', b_ampliTunerChannel );
	if( typeof a_ampliRadio[b_ampliTunerChannel] === "undefined" )
	{
		freq =  b_ampliTunerChannel.substring( 3 );
		if( b_debugLocal || b_debugGlobal ) console.log( 'fctAmpliDisplaySelector - Radio not listed\nFréquence : ', freq, '\nMHz : ', freq/100 );
		$( "#iddiv_AmpliRadioTexte" ).text( freq/100 + ' MHz' );
	}
	else
	{
		$( "#iddiv_AmpliRadioTexte" ).text( a_ampliRadio[b_ampliTunerChannel].Texte );
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tst disable/enable button
function fctSwitchTst() 
{
	console.log( 'tst au départ est ', tst );
	if( tst = 'tst1' )	
	{
		console.log( 'switch to tst2' );
		tst = 'tst2';
		$('iddivTst2').prop('disabled', true); 
		$('iddivTst1').prop('disabled', false); 
	}	else 	{
		tst='tst1';
		console.log( 'switch to tst1' );
		$('iddivTst1').prop('disabled', true); 
		$('iddivTst2').prop('disabled', false); 
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Decoder : Drive button text and show other decoder buttons if decoder is on, otherwise hide other decoder buttons
function fctDecoderDisplayOnOff( ) {
	var b_debugLocal=true;

	var page = window.location.pathname.split("/").pop();
	var icon = ( page == 'index.html' )?'<i class=\"material-icons\">widgets</i>':'';
	
	if( b_debugLocal || b_debugGlobal ) console.log( "fctDecoderDisplayOnOff : ", b_decoderOn == true ? 'ON' : 'OFF' );
	if( b_decoderOn )
	{
		document.getElementById('idbtnDecoderSwitchOnOff').innerHTML = icon + '<i class=\"material-icons\" style=\"color:green;\">power_settings_new</i>';
	}
	else
	{
		document.getElementById('idbtnDecoderSwitchOnOff').innerHTML = icon + '<i class=\"material-icons\" style=\"color:red;\">power_settings_new</i>';
		document.getElementById('iddiv_DecoderChannelTexte').innerHTML = '<i></i>';
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Décodeur : Commande
// Cette commande ne peut être appelée que si le décodeur est allumé, car s'il est éteins, les boutons sont cachés
function fctDecoderCmd(event) {
	var b_debugLocal=false;
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderCmd : Start\nCalled from : ', this.id, event.data.param1, event.data.param2 );
	
	//----------------------------------------------------------------------------------------------------------------------------------
	// Ajax Commande initiale
	// Envoi de la commande param1/param2
	$.ajax(
	{
		type: "POST",
		url: '/php/Decoder_cmd.php',
		data: {'param1':event.data.param1,'param2':event.data.param2 },
		
		//----------------------------------------------------------------------------------------------------------------------------------
		// Ajax Commande : success
		success: function( rep )	
		{
			var jsonRep = JSON.parse( rep );
			var jsonRepContent = JSON.parse( jsonRep.content );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderCmd - Cmd success\njsonRepContent : ', jsonRepContent );

			//----------------------------------------------------------------------------------------------------------------------------------
			// Ajax Status
			// Envoi d'une commande de statut pour vérifier l'état
			$.ajax({
				type: "POST",
				url: '/php/Decoder_cmd.php',
				data: {'param1':'10','param2':'' },

				//----------------------------------------------------------------------------------------------------------------------------------
				// Ajax Status : success
				success: function( rep )	
				{
					var jsonRep = JSON.parse( rep );
					var jsonRepContent = JSON.parse( jsonRep.content );
					b_decoderOn = jsonRepContent.result.data.activeStandbyState === "0" ? true : false;
					b_decoderPlayedMediaId = jsonRepContent.result.data.playedMediaId;
					b_decodeurOsdContext = jsonRepContent.result.data.osdContext;
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderCmd - Status success\njsonRepContent : ', jsonRepContent, '\nb_decoderOn : ', b_decoderOn, '\nb_decoderPlayedMediaId : ', b_decoderPlayedMediaId, '\nb_decodeurOsdContext : ', b_decodeurOsdContext );
					fctDecoderDisplayOnOff( );
					fctDecoderDisplayChannel( b_decodeurOsdContext, b_decoderPlayedMediaId );
				},
				
				//----------------------------------------------------------------------------------------------------------------------------------
				// Ajax Status : error
				error: function( rep ) 
				{
					var jsonRep = JSON.parse( rep );
					var jsonRepContent = JSON.parse( jsonRep.content );
					if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctDecoderCmd - Status error\nrep : ', rep );
				}				
			});
			// Ajax Status fin
			//----------------------------------------------------------------------------------------------------------------------------------
		},
		
		//----------------------------------------------------------------------------------------------------------------------------------
		// Ajax Cmd : error
		error: function( rep ) 
		{
			var jsonRep = JSON.parse( rep );
			var jsonRepContent = JSON.parse( jsonRep.content );
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctDecoderCmd - Cmd error\nrep : ', rep );
		}
	});
	// Ajax Commande initiale fin
	//----------------------------------------------------------------------------------------------------------------------------------

	if( b_debugLocal || b_debugGlobal ) console.log( "fctDecoderCmd : fin" );
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Décodeur : Affichage de la channel 
function fctDecoderDisplayChannel( b_decodeurOsdContext, b_decoderPlayedMediaId ) {
var b_debugLocal=true;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderDisplayChannel : Start\nb_decodeurOsdContext : ', b_decodeurOsdContext, '\nb_decoderPlayedMediaId : ', b_decoderPlayedMediaId );
	switch( b_decodeurOsdContext )
	{
		case '':
		case 'NA':
		case 'HOMEPAGE':
		case 'MAIN_PROCESS' :
			document.getElementById("iddiv_DecoderChannelTexte" ).innerHTML = a_decoderStatus[b_decodeurOsdContext];	
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderDisplayChannel : channel ( OsdContext ', b_decodeurOsdContext,') : ', a_decoderStatus[b_decodeurOsdContext] );
			break;
		default :
			document.getElementById("iddiv_DecoderChannelTexte" ).innerHTML = b_decoderChannel[b_decoderPlayedMediaId];	
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderDisplayChannel : channel ( PlayedMediaId ', b_decoderPlayedMediaId,') : ', b_decoderChannel[b_decoderPlayedMediaId] );
			break;
	}
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderDisplayChannel : fin' );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Switch On or Off Decoder and/or Ampli in order to watch TV
function fctDecoderSwitchOnOff()
{
	var b_debugLocal=true;
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Start\nCalled from : ', this.id );

	if( b_decoderOn )  // If decoder is on, just power it off
	{
		if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Decoder is off, send On/Off to power On' );
		$.ajax({
		type: "POST",
		url: '/php/Decoder_cmd.php',
		data: {'param1':'01','param2':'116' },
			success: function( rep )	{
				var jsonRep = JSON.parse( rep );
				var jsonRepContent = JSON.parse( jsonRep.content );
				b_decoderOn = jsonRepContent.result.data.activeStandbyState === "0" ? true : false;
				b_decoderPlayedMediaId = jsonRepContent.result.data.playedMediaId;
				b_decodeurOsdContext = jsonRepContent.result.data.osdContext;
				if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Decoder OnOff success\njsonRep : ', jsonRep, '\nb_decoderOn', b_decoderOn, '\nb_decoderPlayedMediaId : ', b_decoderPlayedMediaId, '\nb_decodeurOsdContext : ', b_decodeurOsdContext );
				fctDecoderDisplayOnOff( );
				// suite
			},
			error: function( rep )	{
				var jsonRep = JSON.parse( rep );
				if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Decoder Off error\njsonRep : ', jsonRep );
			}
		});
	}
	else  // If decoder is off, power it on and select any channel
	{
		if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : assume TV is Off, send WOL' );
		if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Decoder is Off, send decoder On/Off to power On' );
		$.ajax({
			type: "POST",
			url: '/php/Decoder_cmd.php',
			data: {'param1':'01','param2':'116' },
			success: function( rep )	{
				var jsonRep = JSON.parse( rep );
				var jsonRepContent = JSON.parse( jsonRep.content );
				if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Send decoder On/Off success, will Get status\njsonRepContent : ', jsonRepContent );
				$.ajax({
					type: "POST",
					url: '/php/Decoder_cmd.php',
					data: {'param1':'10','param2':'' },
					success: function( rep )	{	
						var jsonRep = JSON.parse( rep );
						var jsonRepContent = JSON.parse( jsonRep.content );
						b_decoderOn = jsonRepContent.result.data.activeStandbyState === "0" ? true : false;
						b_decoderPlayedMediaId = jsonRepContent.result.data.playedMediaId;
						b_decodeurOsdContext = jsonRepContent.result.data.osdContext;
						if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : GetStatus success, will send OK\njsonRepContent : ', jsonRepContent, '\nb_decoderOn', b_decoderOn, '\nb_decoderPlayedMediaId : ', b_decoderPlayedMediaId, '\nb_decodeurOsdContext : ', b_decodeurOsdContext );
						fctDecoderDisplayOnOff( );
						fctDecoderDisplayChannel(  b_decodeurOsdContext, b_decoderPlayedMediaId );
						$.ajax({
							type: "POST",
							url: '/php/Decoder_cmd.php',
							data: {'param1':'01','param2':'352' },
							success: function( rep )	{
								var jsonRep = JSON.parse( rep );
								var jsonRepContent = JSON.parse( jsonRep.content );
								if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Send OK success\njsonRepContent : ', jsonRepContent );
							},
							error: function( rep )	{
								var jsonRep = JSON.parse( rep );
								if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Send OK error\njsonRep : ', jsonRep );
							}
						});
					},
					error: function( rep )	{	
						var jsonRep = JSON.parse( rep );
						if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctDecoderSwitchOnOff : GetStatus error\njsonRep : ', jsonRep );
					}
				});
			},
			error: function( rep )	{
				var jsonRep = JSON.parse( rep );
				if( b_debugLocal || b_debugGlobal ) console.log( 'fctDecoderSwitchOnOff : Send decoder On/Off error\njsonRep : ', jsonRep );
			}
		}); 
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Heure : Affichage de l'heure ( mise en forme )
function fctCheckTime(i) {
	var b_debugLocal=false;

  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Heure : Affichage de l'heure
function fctStartTime() {
	var b_debugLocal=false;

  var today = new Date();
  var day = today.getDate();
	var options = { month: 'long'};
  var h = today.getHours();
  var m = today.getMinutes();
  m = fctCheckTime(m);
  document.getElementById('iddiv_Time').innerHTML =  day + " " + Intl.DateTimeFormat('fr-FR', options).format(today) + " - " + h + ":" + m;
  var t = setTimeout(fctStartTime, 10000);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tele : Switch Tele on 
function fctTeleSwitchOn( ) 
{
	var b_debugLocal=true;

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleSwitchOn : Start\nCalled from : ', this.id );
	$.ajax({
		type: "POST",
		url: '/php/Tele_cmd.php',
		data: {'param1':'POWER','param2':'ON' },
		success: function( rep )	
		{
			var jsonRep = JSON.parse( rep );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleSwitchOn : Send cmd success : \njsonRep.rep : ', jsonRep.rep );
			setTimeout( fctTeleDisplayOnOff, 3000 ); 
		}, 
		error: function(rep) 
		{
			var jsonRep = JSON.parse( rep );
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctTeleSwitchOn : Send cmd error : \njsonRep : ', jsonRep );
		}
	});

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleSwitchOn : End' );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tele : Drive button text & color
function fctTeleDisplayOnOff( ) {
	var b_debugLocal=true;
	var page = window.location.pathname.split("/").pop();
	var icon = ( page == 'index.html' )?'<i class=\"material-icons\">desktop_windows</i>':'';

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : Start' );

	$.ajax({
		type: "POST",
		url: '/php/Tele_cmd.php',
		data: {'param1':'GET','param2':'STATUS' },

		success: function( rep )	{	
			var jsonRep = JSON.parse( rep );
			b_TVOn = jsonRep.param2;
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : TVPhp GetStatus success\njsonRep : ', jsonRep );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : TVPhp launch TV status poll' );
			
			switch( b_TVOn )
			{
				case "2" :
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : b_TVOn == PowerOn' );
					document.getElementById('idbtnTeleSwitchOn').innerHTML = icon + '<i class=\"material-icons\" style=\"color:green;\">power_settings_new</i>';
					break;
				case "1" :
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : b_TVOn == StandBy' );
					document.getElementById('idbtnTeleSwitchOn').innerHTML = icon + '<i class=\"material-icons\" style=\"color:orange;\">power_settings_new</i>';
					break;
				case "0" :
					if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : b_TVOn == PowerOff' );
					document.getElementById('idbtnTeleSwitchOn').innerHTML = icon + '<i class=\"material-icons\" style=\"color:red;\">power_settings_new</i>';
					break;
			}
			},

		error: function( rep )	{	
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctTeleDisplayOnOff : TVPhp GetStatus error\nrep : ', rep );
		}
	});
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctTeleDisplayOnOff : End' );
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Misc : Force Full Screen
function openFullscreen() 
{
	if ( elem.requestFullscreen ) { elem.requestFullscreen(); } 
	else if ( elem.mozRequestFullScreen ) { elem.mozRequestFullScreen(); } /* Firefox */ 
	else if ( elem.webkitRequestFullscreen ) {  elem.webkitRequestFullscreen(); } /* Chrome, Safari and Opera */
	else if ( elem.msRequestFullscreen ) { elem.msRequestFullscreen(); } /* IE, Edge */
  }



