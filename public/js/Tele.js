////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// XB V1 - 03/05/2020 // Création
//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOBALES

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
	// Tele : lien bouton/fonction																																			
	$("#idbtnTeleSwitchOn").click(  fctTeleSwitchOn );

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
	
	fctStartTime();
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : End' )
}