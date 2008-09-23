/*****************************************************************************
  buildWindow - Função responsável pelas janelas
  ***************************************************************************** */

/* GLOBALS */
zIndexMax = 99;

function constructWindow(XMLwindow){	
	objWindow = new Window(XMLwindow.getAttribute('ajax'),XMLwindow.getAttribute('newInstance'),XMLwindow.getAttribute('forceZindex'));	
	//alert(XMLwindow.getAttribute('name'));
	if(XMLwindow.getAttribute('newInstance') == 'false'){
		for(i in plataform_windows_name){
			if(XMLwindow.getAttribute('name') == i){
				alert('Não são permitidas 2 istâncias desta janela no Sistema.');
				return false;
			}
		}
	}
	
	objWindow.setProperties(XMLwindow.getAttribute('name'),
							XMLwindow.getAttribute('title'),
							XMLwindow.getAttribute('description'),
							XMLwindow.getAttribute('defaultTop'),
							XMLwindow.getAttribute('defaultLeft'),
							XMLwindow.getAttribute('defaultWidth'),
							XMLwindow.getAttribute('defaultHeight'),
							XMLwindow.getAttribute('pageSrc'),
							XMLwindow.getAttribute('footer'));
	objWindow.setActions(eval(XMLwindow.getAttribute('minimize')),eval(XMLwindow.getAttribute('maximize')),eval(XMLwindow.getAttribute('close')),eval(XMLwindow.getAttribute('drag')),eval(XMLwindow.getAttribute('resize')));
	theWindow = objWindow.build();
	plataform_windows[theWindow.id] = theWindow;
	plataform_windows_name[objWindow.getXMLname()] = objWindow.getXMLname();
	changeBackgroundWindowBar(theWindow.id);
}

function buildWindow(nameWindow){
	error = null;
	
	for(i=0;i<xml_windows.length;i++){		
		if(xml_windows[i].getAttribute('name') == nameWindow){
			constructWindow(xml_windows[i]);
				return true;
		}else{
			  error = 'Erro ao tentar encontrar a janela de nome "'+nameWindow+'". \nVerifique no arquivo menu.xml se existe alguma janela com este nome.';
		}
	}
	if(error){
		alert(error);
	}
}

	