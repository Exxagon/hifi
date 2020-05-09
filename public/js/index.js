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
	// Decoder : Tableau équivalence de channel   																																				
	b_decoderChannel['4294967295'] = '! ERREUR !';
	b_decoderChannel['4']          = 'FRANCE 2';
	b_decoderChannel['7']          = 'TOUTE L\'HISTOIRE';
	b_decoderChannel['34']         = 'CANAL +';
	b_decoderChannel['47']         = 'FRANCE 5';
	b_decoderChannel['63']         = 'SCIENCE ET VIE TV';
	b_decoderChannel['78']         = 'FRANCE 4';
	b_decoderChannel['80']         = 'FRANCE 3';
	b_decoderChannel['88']         = 'HISTOIRE TV';
	b_decoderChannel['111']        = 'ARTE';
	b_decoderChannel['112']        = 'LCI';
	b_decoderChannel['118']        = 'M6';
	b_decoderChannel['119']        = 'W9';
	b_decoderChannel['160']        = 'FRANCE O';
	b_decoderChannel['192']        = 'TF1';
	b_decoderChannel['195']        = 'TMC';
	b_decoderChannel['226']        = 'CNEWS';
	b_decoderChannel['234']        = 'LCP';
	b_decoderChannel['444']        = 'NRJ12';
	b_decoderChannel['445']        = 'C8';
	b_decoderChannel['446']        = 'NT1';
	b_decoderChannel['451']        = 'USHUAIA';
	b_decoderChannel['458']        = 'CSTAR';
	b_decoderChannel['481']        = 'BFM TV';
	b_decoderChannel['482']        = 'GULLI';
	b_decoderChannel['829']        = 'MY ZEN TV';
	b_decoderChannel['1400']       = 'RMC DECOUVERTE';
	b_decoderChannel['1402']       = 'RMC STORY';
	b_decoderChannel['1403']       = '6 TER';
	b_decoderChannel['1404']       = 'HD1';
	b_decoderChannel['2094']       = 'ULTRA NATURE';
	b_decoderChannel['2111']       = 'FRANCE INFO';
//	b_decoderChannel['']         = '';

	//----------------------------------------------------------------------------------------------------------------------------------
	// Decoder : Tableau de status   																																				
	a_decoderStatus['HOMEPAGE']     = 'Page d\'accueil';
	a_decoderStatus['MAIN_PROCESS'] = 'Page d\'accueil';
	a_decoderStatus['EPG']          = 'Liste des programmes';
	a_decoderStatus['VOD']          = 'Vidéo à la demande';
	a_decoderStatus['LIVE']         = 'Live';
	a_decoderStatus['netflix']      = 'NetFlix';
//  a_decoderStatus['']          = '';

	//----------------------------------------------------------------------------------------------------------------------------------
	// Decoder : lien bouton/fonction	
	$("#idbtnDecoderSwitchOnOff").click( fctDecoderSwitchOnOff );
	$("#idbtnAllSwitchOn").click( fctAllSwitchOn );
	$("#idbtnDecoderChannelPlus").click( {param1    : '01', param2: '402'}, fctDecoderCmd );
	$("#idbtnDecoderChannelMoins").click( {param1   : '01', param2: '403'}, fctDecoderCmd );
	$("#idbtnDecoderChannelOK").click( {param1      : '01', param2: '352'}, fctDecoderCmd );
	$("#idbtnDecoderChannelRetour").click( {param1  : '01', param2: '158'}, fctDecoderCmd );
	$("#idbtnDecoderChannelHaut").click( {param1    : '01', param2: '103'}, fctDecoderCmd );
	$("#idbtnDecoderChannelBas").click( {param1     : '01', param2: '108'}, fctDecoderCmd );
	$("#idbtnDecoderChannelGauche").click( {param1  : '01', param2: '105'}, fctDecoderCmd );
	$("#idbtnDecoderChannelDroit").click( {param1   : '01', param2: '106'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPlay").click( {param1    : '01', param2: '164'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPause").click( {param1   : '01', param2: '164'}, fctDecoderCmd );
	$("#idbtnDecoderChannelRecord").click( {param1  : '01', param2: '167'}, fctDecoderCmd );
	$("#idbtnDecoderChannelAvance").click( {param1  : '01', param2: '159'}, fctDecoderCmd );
	$("#idbtnDecoderChannelRecule").click( {param1  : '01', param2: '168'}, fctDecoderCmd );
	$("#idbtnDecoderChannelMenu").click( {param1    : '01', param2: '139'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad0").click( {param1    : '01', param2: '512'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad1").click( {param1    : '01', param2: '513'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad2").click( {param1    : '01', param2: '514'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad3").click( {param1    : '01', param2: '515'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad4").click( {param1    : '01', param2: '516'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad5").click( {param1    : '01', param2: '517'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad6").click( {param1    : '01', param2: '518'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad7").click( {param1    : '01', param2: '519'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad8").click( {param1    : '01', param2: '520'}, fctDecoderCmd );
	$("#idbtnDecoderChannelPad9").click( {param1    : '01', param2: '521'}, fctDecoderCmd );

	//----------------------------------------------------------------------------------------------------------------------------------
	// Ampli : lien bouton/fonction																																			
	$("#idbtnAmpliSwitchOnOff").click( fctAmpliSwitchOnOff );
	$("#idbtnAmpliMasterVolumeLevelUp").click( {param1    : 'master-volume', param2 : 'level-up'}, fctAmpliCmd );
	$("#idbtnAmpliMasterVolumeLevelDown").click( {param1  : 'master-volume', param2 : 'level-down'}, fctAmpliCmd );
	$("#idbtnAmpliAudioMute").click( {param1              : 'audio-muting', param2  : ''}, fctAmpliCmd );

	//----------------------------------------------------------------------------------------------------------------------------------
	// Tele : lien bouton/fonction																																			
	$("#idbtnTeleSwitchOn").click(  fctTeleSwitchOn );

	//----------------------------------------------------------------------------------------------------------------------------------
	// Decoder : Get all status
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
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : DecoderPhp GetStatus success\njsonRepContent : ', jsonRepContent, '\nb_decoderPlayedMediaId : ', b_decoderPlayedMediaId, '\nb_decodeurOsdContext : ', b_decodeurOsdContext, '\nb_decoderOn : ', b_decoderOn );
			fctDecoderDisplayOnOff( );
			if( b_decoderOn ) fctDecoderDisplayChannel(  b_decodeurOsdContext, b_decoderPlayedMediaId );
		},

		error: function( rep )	{	
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctInitialisation : DecoderPhp GetStatus error\nrep : ', rep );
		}
	});
	
	//----------------------------------------------------------------------------------------------------------------------------------
	// TV : Get all status
	$.ajax({
		type: "POST",
		url: '/php/Tele_cmd.php',
		data: {'param1':'GET','param2':'STATUS' },

		success: function( rep )	{	
			var jsonRep = JSON.parse( rep );
			b_TVOn = jsonRep.param2;
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : TVPhp GetStatus success\njsonRep : ', jsonRep );
			if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : TVPhp launch TV status poll' );
			fctTeleDisplayOnOff( );
		},

		error: function( rep )	{	
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctInitialisation : TVPhp GetStatus error\nrep : ', rep );
		}
	});


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
			fctAmpliDisplayOnOff( ); 
			if( b_ampliOn )
			{
				//fctAmpliDisplaySelector( b_ampliInputSelector );
				fctAmpliDisplayVolume( b_ampliVolume );
				fctAmpliDisplayMuteUnmute( b_ampliMuted );
				//fctAmpliDisplayListeningMode( b_ampliListeningMode  );
				// if( b_ampliInputSelector != 'fm' )
				// {
				// 	document.getElementById('idbtnAmpliRadioUp').innerHTML = '<i></i>';
				// 	document.getElementById('idbtnAmpliRadioDown').innerHTML = '<i></i>';
				// 	document.getElementById('iddiv_AmpliRadioTexte').innerHTML = '<i></i>';
				// }
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var OnOff = 2;

function fctAllSwitchOn() {

	switch( OnOff )
	{
		case 2 :
			OnOff = 1;
			fctTeleSwitchOn();
			setTimeout( fctAllSwitchOn, 2000);
			break;
		case 1 :
			OnOff = 0;
			fctAmpliSwitchOnOff();
			setTimeout( fctAllSwitchOn, 2000);
			break;
		case 0 :
			fctDecoderSwitchOnOff();
			break;
	}

}

