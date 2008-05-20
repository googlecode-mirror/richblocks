/*  
	buildMenu
	Classe responsável pelo menu
*/

/* GLOBALS*/

var activeMenu;


/*********************************************************************************
buildPlataform - Função que cria a base onde o SDK funciona
frameMenu : Objeto da interface onde os menus se alocam
frameLayout : Objeto da interface onde são tratados os efeitos CSS
frameNavigator : Objeto da interface onde se pode navegar pelos menus criados
frameTabs : Objeto da interface onde ficam disponíveis as abas com opções de visualição
***********************************************************************************/
function buildPlataform(){
		
	frameMenu = document.createElement('DIV');
	frameMenu.setAttribute('class','frame_menu');
	frameMenu.id = 'frame_menu';
	
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
	document.getElementById('plataform').appendChild(frameLayout);
	document.getElementById('plataform').appendChild(frameNavigator);
	document.getElementById('plataform').appendChild(frameTabs);	
	document.getElementById('plataform').appendChild(frameProperties);	
	
	buildMenu();
}


/******************************
	Funções de Menus	
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

	xmlDoc =loadXmlDocument('conf/menu.xml');    	   // Carrega o arquivo XML com a definição de Menus
	menu = xmlDoc.getElementsByTagName("menu"); 	   // Variavel menu pega todas as tags <menu> do arquivo XML
	
	arrayMenus = new Array();
	arraySubMenus = new Array();
	
		// Laço que percorre o Objeto XML e encontra os nodos para formar o Menu
		for(i=0;i<menu.length;i++)
		{
			divMenu = document.createElement('DIV');
			divMenu.setAttribute('class','menu_design');
			divMenu.id = '';
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
			
				//Laço que percorre as Opções de cada menu
				for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
				{
					trContentSubMenu = document.createElement('TR');
						tdContentSubMenu = document.createElement('TD');
						tdContentSubMenu.style.fontFamily = 'tahoma';
						tdContentSubMenu.style.cursor = 'default';
						tdContentSubMenu.style.height = '11px';
						tdContentSubMenu.style.paddingRight = '25px';
						tdContentSubMenu.style.paddingLeft = '10px';
						tdContentSubMenu.style.borderCollapse ='collapse';
						tdContentSubMenu.style.borderSpacing = '0px';
						tdContentSubMenu.style.fontSize = '11px';							
						tdContentSubMenu.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
					trContentSubMenu.appendChild(tdContentSubMenu);
					tbodyContentSubMenu.appendChild(trContentSubMenu);
					tbContentSubMenu.appendChild(tbodyContentSubMenu);
				}
				
		// Array que armazena os Submenus
		arraySubMenus.push(tbContentSubMenu);
		arrayMenus[i] = tablemenu;
		}
		
document.onmousedown = function(event){
	document.getElementById(activeMenu).style.display = 'none';
}
		
// Tabela recebe o Objeto TBODY que contem todas as linhas e colunas do menu
tablemenu.appendChild(tbodymenu);

// Aloca no Obejto DIV frame_menu o Objeto tablemenu que foi criado
document.getElementById('frame_menu').appendChild(tablemenu);
}




