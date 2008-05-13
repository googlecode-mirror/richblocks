/*
		-------------------------------------------
		Jaydson Gomes 28/03/2008
		jayalemao@gmail.com
		-------------------------------------------
		Interface_Engine
			
*/

//	GLOBALS

// Controla o Z-Index das Janelas
zIndexMax = 99;
z_resizeObj= Array();
z_resizeObj['obj']= null;
z_resizeObj['dir']= null;

// Interface Gráfica
function overMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#0A246A';
	obj.style.color = '#ffffff';
	//arraySubMenu[idSubMenu].style.visibility = 'visible';
}
function outMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#D4D0C8';
	obj.style.color = '#000000';
}

function showMenu(idContainer){
	document.getElementById(idContainer).style.visibility = 'visible';
	document.getElementById('container_menus').style.zIndex = zIndexMax+100;
}

function closeWindow(window){
	document.getElementById('plataform').removeChild(window);
}

function getBody()
{
    return document.getElementsByTagName('BODY')[0];
}
function setEvent(obj, evento, func, param)
{
    try
    {
        if(obj == window)
            obj= document;
        obj.attachEvent("on"+evento, func);
    }catch(error)
    {
        if(!param)
            param= false;
        obj.addEventListener(evento, func, param);
    }
}
function unsetEvent(obj, evento, func)
{
    try
    {
        obj.detachEvent('on'+evento, func);
    }catch(error)
    {
        obj.removeEventListener(evento, func, false);
    }
}

function z_startResizing(event)
{
    switch(z_resizeObj['dir'])
    {
        case 's': // south
        {
            try
            {
                z_resizeObj['obj'].style.height= event.clientY - z_resizeObj['obj'].offsetTop;
            }catch(error){}
            break;
        }
        case 'sw': // south
        {
            try
            {
                z_resizeObj['obj'].style.height= event.clientY - z_resizeObj['obj'].offsetTop;
            }catch(error){}
            try
            {
                z_resizeObj['obj'].style.width= (z_resizeObj['obj'].offsetLeft + z_resizeObj['obj'].offsetWidth) - event.clientX;
                z_resizeObj['obj'].style.left= event.clientX;
            }catch(error){}
            break;
        }
        case 'se': // south
        {
            try
            {
                z_resizeObj['obj'].style.height= event.clientY - z_resizeObj['obj'].offsetTop;
                z_resizeObj['obj'].style.width= event.clientX - z_resizeObj['obj'].offsetLeft;
            }catch(error){}
            break;
        }
    }
}

function z_finishResizing(event)
{
    z_resizeObj['obj'].style.left= z_resizeObj['obj'].offsetLeft;
    z_resizeObj['obj'].style.top= z_resizeObj['obj'].offsetTop;
    unsetEvent(getBody(), 'mousemove', z_startResizing);
    unsetEvent(getBody(), 'mouseup', z_finishResizing);
}

function resize(objToResize, direction, event)
{
    z_resizeObj['obj']= objToResize;
    z_resizeObj['dir']= direction;
    //z_resizeObj['obj'].style.right= document.body.clientWidth -(z_resizeObj['obj'].offsetLeft + z_resizeObj['obj'].offsetWidth);
    setEvent(getBody(), 'mousemove', z_startResizing);
    setEvent(getBody(), 'mouseup', z_finishResizing);
    cancelEvent(event);
    return false;
}

function buildMenu(){
	xmlDoc =loadXmlDocument('../conf_RIA/menu.xml');   // Carrega o arquivo XML com a definição de Menus
	menu = xmlDoc.getElementsByTagName("menu"); 	   // Variavel menu pega todas as tags <menu> do arquivo XML
	
	arrayMenuOptions = new Array();						
	arraySubMenu = new Array();
	arrayOptionsSubMenu = new Array();
	
	/*  Objeto Menu Container : contém os menus */
	menuContainer = document.createElement('DIV');
	menuContainer.id = 'menu_container';
	menuContainer.setAttribute('class','menu_container');      // FF
	menuContainer.setAttribute('className','menu_container');  // IE
		
		/* GAMBIARRA pra corrigir 2 pixels*/
		if(!document.all)
			menuContainer.style.height = '27px';        
	
		/* Objeto Tabela que recebe o Menu  */
		tableMenu = document.createElement('TABLE');
		tableMenu.id = 'container_menus';
		tableMenu.setAttribute('class','table_menu');      // FF
		tableMenu.setAttribute('className','table_menu');  // IE
			tBodyMenu = document.createElement('TBODY');
				/* Linha que armazenará os menus*/
				trTableMenu = document.createElement('TR');
				/* Linha que armazenará os submenus*/
				trTablesubMenu = document.createElement('TR');
			tBodyMenu.appendChild(trTableMenu); 
			tBodyMenu.appendChild(trTablesubMenu);
		tableMenu.appendChild(tBodyMenu);
	menuContainer.appendChild(tableMenu);
	
		for(i=0;i<menu.length;i++)
		{
			// Coluna de Menus
			tdMenuOption = document.createElement('TD');
			tdMenuOption.id = menu[i].attributes.getNamedItem("name").nodeValue;
			tdMenuOption.setAttribute('class','table_coluna_menu');      // FF
			tdMenuOption.setAttribute('className','table_coluna_menu');  // IE
			tdMenuOption.setAttribute('id_submenu','container_sub_menu_'+i);

			tdMenuOption.onmouseover = function(){
					overMenu(this.id,tdSubmenu.id);
			};
			tdMenuOption.onmouseout = function(){
					outMenu(this.id);
					//showMenu(this.getAttribute('id_submenu'));
			};
			tdMenuOption.onclick = function(){	
				this.style.fontWeight = 'bold';
				showMenu(this.getAttribute('id_submenu'));
			}
			tdMenuOption.innerHTML = menu[i].attributes.getNamedItem("value").nodeValue;
			arrayMenuOptions.push(tdMenuOption);
			
			//Prepara as colunas que receberão os SubMenus
			tdSubmenu = document.createElement('TD');
			tdSubmenu.setAttribute('class','table_sub_menu');      // FF
			tdSubmenu.setAttribute('className','table_sub_menu');  // IE
			tdSubmenu.id = 'container_sub_menu_'+i;
			arraySubMenu.push(tdSubmenu);
	
			trTableMenu.appendChild(arrayMenuOptions[i]);
			trTablesubMenu.appendChild(arraySubMenu[i]);
			
			// Percorre pegando os Submenus
			for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
			{	
				tableContentSubMenu = document.createElement('TABLE');	
				tableContentSubMenu.setAttribute('class','table_content_sub_menu');      // FF
				tableContentSubMenu.setAttribute('className','table_content_sub_menu');  // IE
					tBodyTableContentSubMenu = document.createElement('TBODY');
						if(menu[i].getElementsByTagName('option')[iOpt].getElementsByTagName('separator').length)
						{
							trSeparator = document.createElement('TR');
							tdSeparator = document.createElement('TD');
							tdSeparator.setAttribute('class','menu_separator');      //FF
							tdSeparator.setAttribute('className','menu_separator');  // IE
							trSeparator.appendChild(tdSeparator);
							tBodyTableContentSubMenu.appendChild(trSeparator);
						}
						trTableContentsubMenu = document.createElement('TR');
							tdTableContentSubMenu = document.createElement('TD');
							tdTableContentSubMenu.setAttribute('src_xml',menu[i].getElementsByTagName('option')[iOpt].attributes.getNamedItem("src").nodeValue);
							tdTableContentSubMenu.id = 'sub_menu_'+menu[i].getElementsByTagName('option')[iOpt].attributes.getNamedItem("src").nodeValue;
							tdTableContentSubMenu.style.padding = '3px';
							tdTableContentSubMenu.style.paddding = '0px';
							
							// Este teste é para botar borda apenas na ultima TD
							if ((iOpt + 1) == menu[i].getElementsByTagName('option').length)    
							{
								tdTableContentSubMenu.style.borderBottom = '3px outset #eeeeee';
							}
							tdTableContentSubMenu.innerHTML = menu[i].getElementsByTagName('option')[iOpt].attributes.getNamedItem("src").nodeValue;
						trTableContentsubMenu.appendChild(tdTableContentSubMenu);
					tBodyTableContentSubMenu.appendChild(trTableContentsubMenu);
				tableContentSubMenu.appendChild(tBodyTableContentSubMenu);
				arraySubMenu[i].appendChild(tableContentSubMenu);
				tdTableContentSubMenu.onmouseover = function(){
					overMenu(this.id);
				}	
				tdTableContentSubMenu.onmouseout = function(){
					outMenu(this.id);
				}
				tdTableContentSubMenu.onmousedown = function (){	
					xmlToWindow(this.getAttribute('src_xml'));
				}
			}
		}
		
	document.getElementById('plataform').appendChild(menuContainer);
	
	// Esconde os menus
	document.onmousedown = function(event){
		for(i=0;i<arraySubMenu.length;i++)
		{
			numeromenu = parseInt(i)+1;
			document.getElementById('menu'+numeromenu).style.fontWeight = '';
			arraySubMenu[i].style.visibility = 'hidden';
		}
		document.getElementById('container_menus').style.zIndex = 99;
	}
}

function ajax() {
   try 
   {
      xmlhttp = new XMLHttpRequest();
   }
   catch(ee) {
      try 
	  {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	  }
      catch(e) {
         try 
		 {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         catch(E) {
            xmlhttp = false;
         }
      }
   }
}

function loadPage(page){
   ajax();
   var url = '../src_application_RIA/'+ page;
   xmlhttp.open("POST",url,true);
   xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8?");
   
   xmlhttp.onreadystatechange = function() 
								{
									if (xmlhttp.readyState == 1)
									{
									}
									if (xmlhttp.readyState == 4)
									{
								         var texto = xmlhttp.responseText;
								         texto = texto.replace(/\+/g," ");
								         texto = unescape(texto);
										 windowContent.innerHTML = texto;
									}
								}
   xmlhttp.send(url);  
}


function buildWindow(arrayWindow){

	zIndexMax = ++zIndexMax;
	
	// Verifica se a Janela ja esta aberta
	if(document.getElementById(arrayWindow['window'].attributes.getNamedItem("name").nodeValue))
	{
		document.getElementById(arrayWindow['window'].attributes.getNamedItem("name").nodeValue).style.zIndex = zIndexMax;
		return false;
	}
	
	// Window
	windowHtml = document.createElement('DIV');
	windowHtml.id = arrayWindow['window'].attributes.getNamedItem("name").nodeValue;
	windowHtml.name = arrayWindow['window'].attributes.getNamedItem("name").nodeValue;
	windowHtml.setAttribute('class','window');      // FF
	windowHtml.setAttribute('className','window');  // IE
	windowHtml.onmousedown = function (){
		zIndexMax = ++zIndexMax;
		this.style.zIndex = zIndexMax;
	}
		
		// Title
		windowTitle = document.createElement('SPAN');
		windowTitle.setAttribute('class','title');      // FF
		windowTitle.setAttribute('className','title');  // IE
		windowTitle.innerHTML = arrayWindow['title'].childNodes[0].nodeValue;		
			
			// Bar
			windowBar = document.createElement('DIV');
			windowBar.id = arrayWindow['bar'].attributes.getNamedItem("name").nodeValue;
			windowBar.name = arrayWindow['bar'].attributes.getNamedItem("name").nodeValue;
			windowBar.setAttribute('class','bar');      // FF
			windowBar.setAttribute('className','bar');  // IE
				tableWindowBar = document.createElement('TABLE');
					tBodyWindowBar = document.createElement('TBODY');
						trWindowBar = document.createElement('TR');	
							tdWindowBarTitle = document.createElement('TD');
							tdWindowBarTitle.style.width = '80%';
							tdWindowBarTitle.style.height = '10px';
							tdWindowBarTitle.style.verticalAlign = 'top'; 
							tdWindowBarSpace = document.createElement('TD');
								//tdWindowBarSpace.style.width = '100%';
							tdWindowBarOptions = document.createElement('TD');
								tdWindowBarOptions.setAttribute('class','bar_options');      // FF
								tdWindowBarOptions.setAttribute('className','bar_options');  // IE
								tdWindowBarOptions.setAttribute('window',windowHtml.id)
								tdWindowBarOptions.onclick = function (){
									
									closeWindow(document.getElementById(this.getAttribute('window')));
								}
						trWindowBar.appendChild(tdWindowBarTitle);	
						trWindowBar.appendChild(tdWindowBarSpace);	
						trWindowBar.appendChild(tdWindowBarOptions);	
					tBodyWindowBar.appendChild(trWindowBar);
				tableWindowBar.appendChild(tBodyWindowBar);
				imgClose = document.createElement('IMG');
				imgClose.src = '../img_RIA/close_window.gif';
				tdWindowBarOptions.appendChild(imgClose);
				tdWindowBarTitle.appendChild(windowTitle);
			windowBar.appendChild(tableWindowBar);
			
			
				//Content
				windowContent = document.createElement('DIV');
				windowContent.id = arrayWindow['content'].attributes.getNamedItem("name").nodeValue;
				windowContent.name = arrayWindow['content'].attributes.getNamedItem("name").nodeValue;
				windowContent.setAttribute('class','content');      // FF
				windowContent.setAttribute('className','content');  // IE
				//loadPage(arrayWindow['content'].attributes.getNamedItem("src").nodeValue);		
				//windowContent.innerHTML = contentPage;
					// Iframe c
					windowIframeContent = document.createElement('IFRAME');
					if(arrayWindow['content'].attributes.getNamedItem("src").nodeValue)
						windowIframeContent.src = '../src_application_RIA/'+arrayWindow['content'].attributes.getNamedItem("src").nodeValue;
						//windowIframeContent.src = 'http://www.senacrs.com.br';
					
					windowIframeContent.style.width = '600';
					windowIframeContent.style.height = '400'; 
					windowIframeContent.style.border ='none';
					windowContent.appendChild(windowIframeContent);
				
					// Footer
					windowFooter = document.createElement('DIV');
					windowFooter.id = arrayWindow['footer'].attributes.getNamedItem("name").nodeValue;
					windowFooter.name = arrayWindow['footer'].attributes.getNamedItem("name").nodeValue;
					windowFooter.setAttribute('class','footer');      // FF
					windowFooter.setAttribute('className','footer');  // IE
						
						windowFooterTable = document.createElement('TABLE');
							windowFooterTbody = document.createElement('TBODY');
								trWindowFooter = document.createElement('TR');
									tdWindowFooterContent = document.createElement('TD');
									tdWindowFooterContent.style.width = '85%';
									tdWindowFooterContent.setAttribute('class','footer');      // FF
									tdWindowFooterContent.setAttribute('className','footer');  // IE
									tdWindowFooterContent.innerHTML = arrayWindow['footer'].childNodes[0].nodeValue;
									tdWindowSpace = document.createElement('TD');
									tdWindowFooterResize = document.createElement('TD');
									tdWindowFooterResize.backgroundImage = "url('../img_RIA/winresize.gif')";
									tdWindowFooterResize.style.width = '100px';
									tdWindowFooterResize.style.border = 'solid 2px';
									tdWindowFooterResize.style.textAlign = 'right';
									tdWindowFooterResize.onclick = function(){
										alert('a');
									}
								trWindowFooter.appendChild(tdWindowFooterContent);
								trWindowFooter.appendChild(tdWindowSpace);
								trWindowFooter.appendChild(tdWindowFooterResize);
							windowFooterTbody.appendChild(trWindowFooter);
						windowFooterTable.appendChild(windowFooterTbody);
						
						//imgResize = document.createElement('IMG');
						//imgResize.src = '../img_RIA/winresize.gif';
						//tdWindowFooterResize.appendChild(imgResize);
					windowFooter.appendChild(windowFooterTable);
					
	windowHtml.appendChild(windowBar);
	windowHtml.appendChild(windowContent);
	windowHtml.appendChild(windowFooter);
	document.getElementById('plataform').appendChild(windowHtml);
	
	windowHtml.style.zIndex = zIndexMax;
	
	// DRAG N DROP
	dragdrop(windowBar.id,windowHtml.id);
}