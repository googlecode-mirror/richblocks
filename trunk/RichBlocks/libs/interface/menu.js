/* GLOBALS */
var activeMenu;
var rightButtonMenus = new Array();

//Aplica o efeito de onmouseout em todos menus 
function resetStyleMenus(){
	for(i=0;i<document.getElementById('frame_menu').getElementsByTagName('div').length;i++){
		outMenu(document.getElementById('frame_menu').getElementsByTagName('div')[i].id);
	}
}

//Esconde os menus
function hiddenMenus(){
	for(i=0;i<document.getElementById('plataform').getElementsByTagName('TABLE').length;i++){
		table_id = document.getElementById('plataform').getElementsByTagName('TABLE')[i].id.split('_');
		if(table_id[0] == 'submenu')
			document.body.getElementsByTagName('TABLE')[i].style.display = 'none';
	}
}

//Efeito do onmouseover no menu
function overMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#0A246A';
	obj.style.color = '#ffffff';
}

//Efeito do onmouseout no menu
function outMenu(objMenuId){
	obj = document.getElementById(objMenuId);
	obj.style.background = '#D4D0C8';
	obj.style.color = '#000000';
}

function verifyChildMenu(subMenuCollection,pos){	
	for(si=0;si<subMenuCollection.length;si++){
		teste = document.createElement('DIV');
		teste.style.border = 'solid 10px';
		teste.style.position = 'absolute';
		teste.style.top = pos[0];
		teste.style.left = pos[1];
		teste.innerHTML = 'teste';
		//document.body.appendChild(teste);
		//alert(subMenuCollection[si].getAttribute('name'));
		if(subMenuCollection[si].hasChildNodes()){
			//alert(subMenuCollection[si].getAttribute('name'));
			verifyChildMenu(subMenuCollection[si].getElementsByTagName('sub')[0].getElementsByTagName('sub_option'));
		}
	}
}

function verifyPosSubMenu(obj){
	y = obj.offsetTop;
	x = obj.offsetLeft;
	he  = obj;
	while(he.tagName != 'BODY'){
		he = he.parentNode;
		y = y + he.offsetTop;
		x = x + he.offsetLeft;
	}	
//	alert('X: ' + x + ' Y: '+ y);
	return [y,x];
}

//Constroi os menus da parte superior
function buildMenu(){	
	
	xmlDoc =loadXmlDocument('conf/menu.xml');    	   // Carrega o arquivo XML com a definição de Menus
	menu = xmlDoc.getElementsByTagName("menu"); 	   // Variavel menu pega todas as tags <menu> do arquivo XML
	
		var posTopMenu = 45; // Coltrola a posição TOP do menu
		
		// Laço que percorre o Objeto XML e encontra os nodos para formar o Menu
		for(i=0;i<menu.length;i++)
		{
			divMenu = document.createElement('DIV');
			divMenu.style.padding = '4px';
			divMenu.style.cursor = 'default';
			divMenu.style.cssFloat = 'left';
			divMenu.style.styleFloat = 'left';
			divMenu.style.fontFamily = 'tahoma';
			divMenu.style.fontSize = '11px';
			divMenu.id = menu[i].getAttribute('name');
			divMenu.innerHTML = menu[i].getAttribute('value');
			divMenu.onclick = function(){
				//Esconde o menu que estievr aberto
				resetRightButtonMenus();
				
				//Mostra o menu
				opacity(this.getAttribute('childSubMenu'), 0, 100, 350);
				document.getElementById(this.getAttribute('childSubMenu')).style.display = 'block';
				
				//Essa variavel controla o menu que estão aparecendo
				activeMenu = true;
			}	
			divMenu.onmouseover = function(){
				//Reseta o estilo dos menus
				resetStyleMenus();	
				if(activeMenu){
					hiddenMenus();
					document.getElementById(this.getAttribute('childSubMenu')).style.display = 'block';
					opacity(this.getAttribute('childSubMenu'), 0, 100, 350);
				}
				overMenu(this.id);
			}
			divMenu.onmouseout = function(){
				if(activeMenu)
					return false;
				//outMenu(this.id);
				opacity(this.getAttribute('childSubMenu'), 100, 0, 350);
				document.getElementById(this.getAttribute('childSubMenu').style.MozOpacity = '0.0');
				document.getElementById(this.getAttribute('childSubMenu').style.filter = 'alpha(opacity=0');
			}
			document.getElementById('frame_menu').appendChild(divMenu);
			
			// submenuPosition é um espaço reservado para alocar os submenus, para cada menu, há um espaço para o respectivo submenu
			submenuPosition = document.createElement('DIV');
			frameSubMenu.appendChild(submenuPosition);
				tableSub = document.createElement('TABLE');
				//tableSub.setAttribute('border','1');
				tableSub.id = 'submenu_'+i;
				tableSub.setAttribute('class','table_sub');
				tableSub.setAttribute('className','table_sub');	
				tableSub.setAttribute('cellspacing','0');
				tableSub.style.left = divMenu.offsetLeft;
				tableSub.style.top = posTopMenu;
				tableSub.setAttribute('menuParent',divMenu.id);
				tBodySub = document.createElement('TBODY');
				
			//Laço que percorre as Opções de cada menu
			var widthMenu = 0;
			for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
			{		
				divMenu.setAttribute('childSubMenu',tableSub.id);
					trSub = document.createElement('TR');
					trSub.id = 'tr_menu'+i + iOpt;
					trSub.setAttribute('menu_reference',trSub.id)
					trSub.setAttribute('xml_window_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('windowTarget'));
						tdImg = document.createElement('TD');
						tdImg.setAttribute('class','img_submenu');
						tdImg.setAttribute('className','img_submenu');
							img = document.createElement('IMG');
							img.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
						tdImg.appendChild(img);
						tdText = document.createElement('TD');
						tdText.setAttribute('class','text_sub_menu');
						tdText.setAttribute('className','text_sub_menu');
						tdText.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
						tdShortcut = document.createElement('TD');
						tdShortcut.setAttribute('class','text_sub_menu');
						tdShortcut.setAttribute('className','text_sub_menu');
						
					trSub.onmouseover = function(){
						overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
						if(this.getAttribute('has_sub_menu')=='true'){
							// TO DO
						}else{
							return false;
						}
					}
					trSub.onmouseout = function(){
						outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
					}
					trSub.onmousedown = function(){
						//Do Something
						if(this.getAttribute('has_sub_menu')=='true'){
							alert('TRUE');
						}else{
							buildWindow(this.getAttribute('xml_window_name'));
						}
					}
					trSub.appendChild(tdImg);
					trSub.appendChild(tdText);
					trSub.appendChild(tdShortcut);
					tBodySub.appendChild(trSub);
				tableSub.appendChild(tBodySub);
				document.body.appendChild(tableSub);
				
				
				// Teste para verificar se existe um submenu nao opção
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('hasChild') == 'true'){
						tdShortcut.style.backgroundImage = 'url(img/sub_menu_indicator.png)';
						tdShortcut.style.backgroundRepeat = 'no-repeat';
						tdShortcut.style.backgroundPosition = 'center';
						trSub.setAttribute('has_sub_menu','true');
						space_sub_menu = document.createElement('TD');
						//space_sub_menu.style.border = 'solid 1px';
						//space_sub_menu.style.fontSize = '1px';
						space_sub_menu.innerHTML = '';
						trSub.setAttribute('rowSpan','10');
						trSub.appendChild(space_sub_menu);
						
						divTempSubMenu = document.createElement('DIV');
						space_sub_menu.appendChild(divTempSubMenu);
				}
				
				//Calculo para colocar borda apenas no ultimo elemento 
				if(iOpt == menu[i].getElementsByTagName('option').length - 1){
					tableSub.style.borderBottom = '2px outset #eeeeee';
				}
				
				// Teste para separar o menu por categoria inserindo um separador
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('separator')){
					trSeparator = document.createElement('TR');
						tdSeparator = document.createElement('TD');
						tdSeparator.setAttribute('colSpan','3');
						tdSeparator.style.fontSize = '2px';
						tdSeparator.style.borderBottom = '1px inset gray';
					trSeparator.appendChild(tdSeparator);
					tBodySub.appendChild(trSeparator);
				}
				//verifyChildMenu(menu[i].getElementsByTagName('option')[iOpt]);
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('hasChild')){
					pos = verifyPosSubMenu(tdShortcut);
					verifyChildMenu(menu[i].getElementsByTagName('option')[iOpt].getElementsByTagName('sub')[0].getElementsByTagName('sub_option'),pos);
				}
			}
		}
}

// Remove o elemento botão direito da plataforma
function resetRightButtonMenus(){
	for(i=0;i<document.body.getElementsByTagName('DIV').length;i++)
	{
		divID = document.body.getElementsByTagName('DIV')[i].id.split('_');
		if(divID[0] == 'rightbutton')
		{
			document.body.removeChild(document.body.getElementsByTagName('DIV')[i]);
		}
	}
}

//Aloca o botão direito conforme a posição clicado na janela
function windowRightButtonMenu(){
	//hiddenMenus();
	if ( !event ){event = window.event;}	
	var target = event.target ? event.target : event.srcElement;
	
	if(event.which == 3 || event.button == '0')
	{			
		for(i=0;i<rightButtonMenus.length;i++)
		{
			//alert(rightButtonMenus[i]);
			if(rightButtonMenus[i].getAttribute('frame_reference') == target.id)
			{	
				document.body.appendChild(rightButtonMenus[i]);				
				document.getElementById(rightButtonMenus[i].id).style.left= event.clientX;
				document.getElementById(rightButtonMenus[i].id).style.top= event.clientY;
			}
		}
	}
}

//Aloca o botão direito conforme a posição clicada na plataforma
function rightButtonMenu(event){
	hiddenMenus();
	if ( !event ){event = window.event;}	
	var target = event.target ? event.target : event.srcElement;
	
	if(event.which == 3 || event.button == '0')
	{			
		for(i=0;i<rightButtonMenus.length;i++)
		{
			if(rightButtonMenus[i].getAttribute('frame_reference') == target.id)
			{	
				document.body.appendChild(rightButtonMenus[i]);				
				
				var sizeWindow = getSizeWindow();
				topMenu = rightButtonMenus[i].offsetTop + 30;
				leftMenu = rightButtonMenus[i].offsetLeft;
				
				widthMenu =  rightButtonMenus[i].offsetWidth;
				heightMenu = rightButtonMenus[i].offsetHeight;
				
				if(event.clientX + widthMenu > sizeWindow[0]){
					document.getElementById(rightButtonMenus[i].id).style.left = event.clientX -widthMenu;
				}else{
					document.getElementById(rightButtonMenus[i].id).style.left= event.clientX;
				}
				
				if(event.clientY + heightMenu + 24 > sizeWindow[1]){
					document.getElementById(rightButtonMenus[i].id).style.top= event.clientY - heightMenu;
				}else{
					document.getElementById(rightButtonMenus[i].id).style.top= event.clientY;
				}
			}
		}
	}
}

//Constroi os menus de botão direito
function buildRightButtonMenus(){

	xmlDoc =loadXmlDocument('conf/right_button_menu.xml');    	    // Carrega o arquivo XML com a definição de Menus do botao direito
	menu = xmlDoc.getElementsByTagName("menu"); 	   				// Variavel menu pega todas as tags <menu> do arquivo XML
	
	for(i=0;i<menu.length;i++)
	{
		frameMenuRightButton = document.createElement('DIV');
		frameMenuRightButton.setAttribute('class','rb_frame_menu');		
		frameMenuRightButton.setAttribute('className','rb_frame_menu');
		frameMenuRightButton.id = 'rightbutton_'+menu[i].getAttribute('name');
		frameMenuRightButton.setAttribute('frame_reference',menu[i].getAttribute('frameReference'));
		tableSubframeMenu = document.createElement('TABLE');
		tableSubframeMenu.setAttribute('cellspacing','0');
		tBodySubFrameMenu = document.createElement('TBODY');
		for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
		{
			trSubframeMenu = document.createElement('TR');
			trSubframeMenu.id = 'tr_frame_menu_'+i+iOpt;
			trSubframeMenu.setAttribute('menu_reference',trSubframeMenu.id);
			trSubframeMenu.setAttribute('xml_window_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('windowTarget'));
			trSubframeMenu.setAttribute('xml_function_name',menu[i].getElementsByTagName('option')[iOpt].getAttribute('functionTarget'));
			trSubframeMenu.onmouseover = function(){
				overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmouseout = function(){
				outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmousedown = function(){
				outMenu(this.id);
				if(this.getAttribute('xml_function_name')){
					alert('Function');
				}	
				if(this.getAttribute('xml_window_name')){
					buildWindow(this.getAttribute('xml_window_name'))	
				} 
			}
			tdImgframeMenu = document.createElement('TD');
			tdImgframeMenu.setAttribute('class','rb_text_frame_menu');
			tdImgframeMenu.setAttribute('className','rb_text_frame_menu');
				imgFrameMenu = document.createElement('IMG');
				imgFrameMenu.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
			tdImgframeMenu.appendChild(imgFrameMenu);
			tdTextFrameMenu = document.createElement('TD');			
			tdTextFrameMenu.setAttribute('class','rb_text_frame_menu');
			tdTextFrameMenu.setAttribute('className','rb_text_frame_menu');
			tdTextFrameMenu.style.paddingLeft = '6\px';
			tdTextFrameMenu.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
			trSubframeMenu.appendChild(tdImgframeMenu);
			trSubframeMenu.appendChild(tdTextFrameMenu);
			tBodySubFrameMenu.appendChild(trSubframeMenu);
			tableSubframeMenu.appendChild(tBodySubFrameMenu);

			// Teste para separar o menu por categoria inserindo um separador
				if(menu[i].getElementsByTagName('option')[iOpt].getAttribute('separator')){					
					trSeparator = document.createElement('TR');
						tdSeparator = document.createElement('TD');
						tdSeparator.setAttribute('colSpan','3');
						tdSeparator.style.fontSize = '2px';
						tdSeparator.style.paddingTop = '3px';
						tdSeparator.style.marginTop = '3px';
						tdSeparator.style.borderBottom = '1px inset gray';
					trSeparator.appendChild(tdSeparator);
					tBodySubFrameMenu.appendChild(trSeparator);
				}	
		}
		frameMenuRightButton.appendChild(tableSubframeMenu);
		rightButtonMenus.push(frameMenuRightButton);
	}
}

// Constroi os menus de botão direito de cada janela
function buildWindowRightButtonMenu(){
	xmlDoc =loadXmlDocument('conf/window_right_button_menu.xml');   // Carrega o arquivo XML com a definição de Menus do botao direito
	menu = xmlDoc.getElementsByTagName("menu"); 	   				// Variavel menu pega todas as tags <menu> do arquivo XML
	
	for(i=0;i<menu.length;i++)
	{
		frameMenuRightButton = document.createElement('DIV');
		frameMenuRightButton.setAttribute('class','rb_frame_menu');		
		frameMenuRightButton.setAttribute('className','rb_frame_menu');
		frameMenuRightButton.id = 'window_rightbutton_'+menu[i].getAttribute('name');
		frameMenuRightButton.setAttribute('windowReference',menu[i].getAttribute('windowReference'));
		tableSubframeMenu = document.createElement('TABLE');
		tableSubframeMenu.setAttribute('cellspacing','0');
		tBodySubFrameMenu = document.createElement('TBODY');
		for(iOpt=0;iOpt<menu[i].getElementsByTagName('option').length;iOpt++)
		{
			trSubframeMenu = document.createElement('TR');
			trSubframeMenu.id = 'window_tr_frame_menu_'+i+iOpt;
			trSubframeMenu.setAttribute('menu_reference',trSubframeMenu.id);
			trSubframeMenu.onmouseover = function(){
				overMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmouseout = function(){
				outMenu(document.getElementById(this.getAttribute('menu_reference')).id);
			}
			trSubframeMenu.onmousedown = function(){
				outMenu(this.id);
			}
			tdImgframeMenu = document.createElement('TD');
			tdImgframeMenu.setAttribute('class','rb_text_frame_menu');
			tdImgframeMenu.setAttribute('className','rb_text_frame_menu');
				imgFrameMenu = document.createElement('IMG');
				imgFrameMenu.src = 'img/'+menu[i].getElementsByTagName('option')[iOpt].getAttribute('img');
			tdImgframeMenu.appendChild(imgFrameMenu);
			tdTextFrameMenu = document.createElement('TD');			
			tdTextFrameMenu.setAttribute('class','rb_text_frame_menu');
			tdTextFrameMenu.setAttribute('className','rb_text_frame_menu');
			tdTextFrameMenu.style.paddingLeft = '6\px';
			tdTextFrameMenu.innerHTML = menu[i].getElementsByTagName('option')[iOpt].getAttribute('value');
			trSubframeMenu.appendChild(tdImgframeMenu);
			trSubframeMenu.appendChild(tdTextFrameMenu);
			tBodySubFrameMenu.appendChild(trSubframeMenu);
			tableSubframeMenu.appendChild(tBodySubFrameMenu);
		}
		frameMenuRightButton.appendChild(tableSubframeMenu);
		rightButtonMenus.push(frameMenuRightButton);
	}
}










