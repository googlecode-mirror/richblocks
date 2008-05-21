/*  
	buildMenu
	Classe respons�vel pelo menu
*/

/* GLOBALS*/

var activeMenu;


/*********************************************************************************
buildPlataform - Fun��o que cria a base onde o SDK funciona
frameMenu : Canada da interface onde os menus se alocam
frameSubMenu : Camada da interface onde os submenus ser�o alocados
frameLayout : Camada da interface onde s�o tratados os efeitos CSS
frameNavigator : Camada da interface onde se pode navegar pelos menus criados
frameTabs : Camada da interface onde ficam dispon�veis as abas com op��es de visuali��o
***********************************************************************************/
function buildPlataform(){
		
	frameMenu = document.createElement('DIV');
	frameMenu.setAttribute('class','frame_menu');
	frameMenu.id = 'frame_menu';
	
	frameSubMenu = document.createElement('DIV');
	frameSubMenu.setAttribute('class','frame_submenu');
	frameSubMenu.id = 'frame_submenu';
	
	frameButtons = document.createElement('DIV');
	frameButtons.setAttribute('class','frame_buttons');
	frameButtons.id = 'frame_buttons';
	
	frameLayout = document.createElement('DIV');
	frameLayout.setAttribute('class','frame_layout');
	frameLayout.id = 'frame_layout';
	
	frameNavigator = document.createElement('DIV');
	frameNavigator.setAttribute('class','frame_navigator');
	frameNavigator.id = 'frame_navigator';
	
	frameTabs = document.createElement('DIV');
	frameTabs.setAttribute('class','frame_tabs');
	frameTabs.id = 'frame_tabs';
	
	frameProperties = document.createElement('DIV');
	frameProperties.setAttribute('class','frame_properties');
	frameProperties.id = 'frame_properties'; 
	
	document.getElementById('plataform').appendChild(frameMenu);
	document.getElementById('plataform').appendChild(frameSubMenu);
	document.getElementById('plataform').appendChild(frameButtons);
	document.getElementById('plataform').appendChild(frameLayout);
	document.getElementById('plataform').appendChild(frameNavigator);
	document.getElementById('plataform').appendChild(frameTabs);	
	document.getElementById('plataform').appendChild(frameProperties);	
	
	buildMenu();
}


/******************************
	Fun��es de Menus	
******************************/
function overMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#0A246A';
	obj.style.color = '#ffffff';
}
function outMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#D4D0C8';
	obj.style.color = '#000000';
}
function buildMenu(){	

	xmlDoc =loadXmlDocument('conf/menu.xml');    	   // Carrega o arquivo XML com a defini��o de Menus
	menu = xmlDoc.getElementsByTagName("menu"); 	   // Variavel menu pega todas as tags <menu> do arquivo XML
	
	arrayMenus = new Array();
	arraySubMenus = new Array();
	
		// La�o que percorre o Objeto XML e encontra os nodos para formar o Menu
		for(i=0;i<menu.length;i++)
		{
			divMenu = document.createElement('DIV');
			divMenu.setAttribute('class','menu_design');
			divMenu.id = menu[i].getAttribute('name');
			divMenu.innerHTML = menu[i].getAttribute('value');
			divMenu.onclick = function(){
				alert(this.id);
			}	
			divMenu.onmouseover = function(){
				overMenu(this.id);
			}
			divMenu.onmouseout = function(){
				outMenu(this.id);
			}
			document.getElementById('frame_menu').appendChild(divMenu);
			
			// submenuPosition � um espa�o reservado para alocar os submenus, para cada menu, h� um espa�o para o respectivo submenu
			submenuPosition = document.createElement('DIV');
			submenuPosition.setAttribute('class','submenu_position');			
			// hiddenTextSubMenu � um span invisivel que serve para setar  o tamnho correto do submenuss
			hiddenTextSubMenu = document.createElement('SPAN');
			hiddenTextSubMenu.setAttribute('class','hidden_text_submenu');
			hiddenTextSubMenu.innerHTML = menu[i].getAttribute('value') + '          ';
			submenuPosition.appendChild(hiddenTextSubMenu);
			frameSubMenu.appendChild(submenuPosition);
		
			//La�o que percorre as Op��es de cada menu
			var posTopMenu = 0; 
			var widthMenu = 0;
			for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
			{
				divSubmenu = document.createElement('DIV');
				divSubmenu.setAttribute('class','submenu_layout');
				divSubmenu.style.top =  posTopMenu;
				tableSub = document.createElement('TABLE');
					trSub = document.createElement('TR');
						tdImg = document.createElement('TD');
						tdImg.setAttribute('class','img_submenu');
							img = document.createElement('IMG');
							img.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
						tdImg.appendChild(img);
						tdText = document.createElement('TD');
						tdText.setAttribute('class','text_sub_menu');
						tdText.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
						tdShortcut = document.createElement('TD');
						tdShortcut.setAttribute('class','text_sub_menu');
						tdShortcut.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('shortcut');
					trSub.appendChild(tdImg);
					trSub.appendChild(tdText);
					trSub.appendChild(tdShortcut);
				tableSub.appendChild(trSub);
				divSubmenu.appendChild(tableSub);
				submenuPosition.appendChild(divSubmenu);
				
				//Calcula o tamanho m�ximo do Menu
				currentDivWidth = parseInt(divSubmenu.offsetWidth);
				if(currentDivWidth > widthMenu)
				{
					widthMenu = currentDivWidth + 20;
				}				
				divSubmenu.style.width = widthMenu;
				// Posi��o top de cada menu
				posTopMenu = posTopMenu + 24;
			}
		}
		
document.onmousedown = function(event){
	//document.getElementById(activeMenu).style.display = 'none';
}
		
// Tabela recebe o Objeto TBODY que contem todas as linhas e colunas do menu
//tablemenu.appendChild(tbodymenu);

// Aloca no Obejto DIV frame_menu o Objeto tablemenu que foi criado
//document.getElementById('frame_menu').appendChild(tablemenu);
}