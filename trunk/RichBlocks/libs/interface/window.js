/* GLOBALS */
zIndexMax = 99;
var URL_PAGE='';

//Função que Carrega o XML de Janelas
function loadWindows(){
	xmlDoc =loadXmlDocument('conf/windows.xml');    	
	windows = xmlDoc.getElementsByTagName("window"); 	 
	
	for(i=0;i<windows.length;i++){
		xml_windows.push(windows[i]);
	}
}	

// Função que constroi a Janela, setando os atributos
function constructWindow(XMLwindow){	
	objWindow = new Window(XMLwindow.getAttribute('ajax'),XMLwindow.getAttribute('newInstance'),XMLwindow.getAttribute('forceZindex'));
	if(URL_PAGE){
		var src = URL_PAGE; 
	}else{
		var src = XMLwindow.getAttribute('pageSrc');
	}
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
							src,
							XMLwindow.getAttribute('footer'));
	objWindow.setActions(eval(XMLwindow.getAttribute('minimize')),eval(XMLwindow.getAttribute('maximize')),eval(XMLwindow.getAttribute('close')),eval(XMLwindow.getAttribute('drag')),eval(XMLwindow.getAttribute('resize')));
	theWindow = objWindow.build();
	plataform_windows[theWindow.id] = theWindow;
	plataform_windows_name[objWindow.getXMLname()] = objWindow.getXMLname();
	changeBackgroundWindowBar(theWindow.id);
}

//Função que recebe o nome e procurra no array de janelas a janela a ser criada
function buildWindow(nameWindow,url){
	error = null;
	URL_PAGE = url;
	
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

	