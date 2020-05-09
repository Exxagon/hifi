////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// XB V1 - 03/05/2020 // Création
//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Document ready function call
$( document ).ready( fctInitialisation );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation
function fctInitialisation() 
{
	var b_debugLocal=true;
	
	elem = document.documentElement;
	$("#openFS").click( openFullscreen );																																	

	if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : Start' );

	//----------------------------------------------------------------------------------------------------------------------------------
	// Volets : lien bouton/fonction																																			
	// $("#idbtnxxx").click(  fctxxx );
	// $("#idbtnxxx").click(  fctxxx );
	// $("#idbtnxxx").click(  fctxxx );

	fctStartTime();
	
	if( b_debugLocal || b_debugGlobal ) console.log( 'fctInitialisation : End' )
}

