/* GLOBALS */
var tabs = new Array();
var frameMinimizeds;
var plataform_windows = new Array();
var plataform_windows_name = new Array();
var xml_windows = new Array();
var window_z_index = 0;
var window_focus = null;
var zIndex_blackBackground = 1000000;
var frameInvisible = document.createElement('DIV');
var frameProperties = document.createElement('DIV');
var frameMinimizeds = document.createElement('DIV');
var frameSysTray = document.createElement('DIV');
var img_back = document.createElement('IMG');

function buildPlataform(){
	
	//Frame Invisivisel
	frameInvisible.style.width = '100%';
	frameInvisible.style.height = '100%';
	frameInvisible.style.position = 'absolute';
	frameInvisible.id = 'invisible';
	frameInvisible.style.top = '0px';
	frameInvisible.style.left = '0px';
	frameInvisible.style.zIndex = zIndex_blackBackground;
	frameInvisible.style.display = 'none';
	frameInvisible.style.filter="alpha(opacity='40')";
	frameInvisible.style.MozOpacity = '0.4'
	frameInvisible.innerHTML = 'a';
	frameInvisible.style.backgroundColor = '#000000';
	
	// Barra do Topo
	frameBarTop = document.createElement('DIV');
	frameBarTop.setAttribute('class','frame_bar_top');
	frameBarTop.setAttribute('className','frame_bar_top');
	frameBarTop.innerHTML = 'RichBlocks 0.1';

	// Frame onde ficam os menus
	frameMenu = document.createElement('DIV');
	frameMenu.setAttribute('class','frame_menu');
	frameMenu.setAttribute('className','frame_menu');
	frameMenu.id = 'frame_menu';
	
	// Frame onde ficam os submenus
	frameSubMenu = document.createElement('DIV');
	frameSubMenu.setAttribute('class','frame_submenu');
	frameSubMenu.setAttribute('className','frame_submenu');
	frameSubMenu.id = 'frame_submenu';
	
	// Frame onde ficam os botões de acesso rápido atalho
	frameButtons = document.createElement('DIV');
	frameButtons.setAttribute('class','frame_buttons');
	frameButtons.setAttribute('className','frame_buttons');
	frameButtons.id = 'frame_buttons';
	
	frameLayout = document.createElement('DIV');
	frameLayout.setAttribute('class','frame_layout');
	frameLayout.setAttribute('className','frame_layout');
	frameLayout.id = 'frame_layout';

	frameProperties.style.width = '100%';
	frameProperties.style.height = '100%';
		img_back.src = 'img/back.jpg';
		img_back.style.width = '100%';
		img_back.style.height = '100%';
		img_back.id = 'frame_properties';
	frameProperties.appendChild(img_back);
	
	frameMinimizeds.id = 'frame_minimizeds';
	frameMinimizeds.style.width = '100%';
	frameMinimizeds.style.height = '30px';
	frameMinimizeds.style.background = '#D4D0C8';
	frameMinimizeds.style.border = '2px inset #eeeeee';
	frameMinimizeds.style.position = 'absolute';
	frameMinimizeds.style.fontFamily = 'tahoma';
	frameMinimizeds.style.fontSize = '11px';
	frameMinimizeds.style.padding = '2px';
	
	frameSysTray.id = 'frame_systray';
	frameSysTray.style.width = '100px';
	frameSysTray.style.paddingLeft = '42px';
	frameSysTray.style.paddingTop = '5px';
	frameSysTray.style.position = 'absolute';
	frameSysTray.style.zIndex = '100';
	frameSysTray.style.fontFamily = 'Tahoma';
	frameSysTray.style.fontSize = '11px';
	
	// Aloca todos elementos na plataforma ( corpo do documento HTML )
	document.body.appendChild(frameSysTray);
	document.body.appendChild(frameBarTop);
	document.body.appendChild(frameMenu);
	document.body.appendChild(frameSubMenu);
	document.body.appendChild(frameButtons);
	document.body.appendChild(frameProperties);	
	document.body.appendChild(frameMinimizeds);	
	document.body.appendChild(frameInvisible);	
	
	//Aloca o framaMinimizeds sempre na posição correta
	setMinizeds();
	
	//Aloca o sysTray na posição correta
	setSysTrayPosition();
	
	// Constroi o menu superior, os menus de botao direito da plataforma e os menus de botão direito de cada janela
	buildMenu();
	buildRightButtonMenus();
	buildWindowRightButtonMenu();
	
	// Relógio
	clock();
	
	// Botao direito
	document.oncontextmenu = rightButtonMenu;
	img_back.oncontextmenu = rightButtonMenu;
	
	//Desabilita o evento selecionar
	disableSelection(document.body);
	
	// Le o arquivo XML e armazena no array GLOBAL xml_windows
	loadWindows();
}


//MOUSEDOWN
document.onmousedown = function(event){		
		if ( !event ){
		   event = window.event;
		 }
		 
		var target = event.target ? event.target : event.srcElement;
		var id = target.id;
		id = id.split('_');
		if(id[0] == 'menu')
			return false;
		hiddenMenus();
		activeMenu = false;
		resetStyleMenus();
		resetRightButtonMenus();
}

//KEYDOWN
document.onkeydown = function(event){
	if ( !event ){
		   event = window.event;
	}
	var key_code = event.keyCode  ? event.keyCode  :
				   event.charCode ? event.charCode :
				   event.which    ? event.which    : void 0;
			   	
	//Bloqueando F5
	if(key_code == 116){
	    cancelEvent(event);
	}
	    
}

//KEYPRESS
document.onkeypress = function(event){
	if ( !event ){
		   event = window.event;
	}
	var key_code = event.keyCode  ? event.keyCode  :
				   event.charCode ? event.charCode :
				   event.which    ? event.which    : void 0;

	if(key_code == '27'){
		hiddenMenus();
		resetRightButtonMenus();
		activeMenu = false;
		resetStyleMenus();
	}
}
