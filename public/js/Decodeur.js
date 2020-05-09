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
	$("#idbtnDecoderVolumeLevelUp").click( {param1  : '01', param2: '115'}, fctDecoderCmd );
	$("#idbtnDecoderVolumeLevelDown").click( {param1: '01', param2: '114'}, fctDecoderCmd );
	$("#idbtnDecoderMute").click( {param1           : '01', param2: '113'}, fctDecoderCmd );

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
			fctDecoderDisplayOnOff( b_decoderOn );
			if( b_decoderOn ) fctDecoderDisplayChannel(  b_decodeurOsdContext, b_decoderPlayedMediaId );
		},

		error: function( rep )	{	
			if( b_debugLocal || b_debugGlobal || b_debugerror ) console.log( 'fctInitialisation : DecoderPhp GetStatus error\nrep : ', rep );
		}
	});
	
	fctStartTime();
	
	//	setTimeout( "location.reload(true);", 60000 );
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : End' )
}



