/*	 
	MENU
	Jaydson Gomes
	05/05/2008
  */

function menu(){
	
	/* ATTRIBUTES */	
	var xmlDoc;
	var menuContainer;
	var tableMenu;
	var arraySubMenu = new Array();;
	
	/* METHODS */
	this.setXmlDoc = function(arq){
		try {
				arqXml = new ActiveXObject("Microsoft.XMLDOM");	//Internet Explorer
			} catch(e) {
						   //Firefox, Mozilla, Opera, etc.
						   try {
									arqXml = document.implementation.createDocument("","",null);
							   }catch(e) {
											alert(e.message)
							   }
					   }
		try {
	     		arqXml.async = false;
				arqXml.load(arq);
				this.xmlDoc = arqXml;
			}catch(e) {
						alert(e.message)
			}
		return(null);
	}
	this.getXmlDoc = function(){
		return this.xmlDoc;
	}
	
	/*  BUILD -  Método que cria a interface HTML dos Menus */
	this.build = function(){
	
		this.menuContainer = document.createElement('DIV');
		this.menuContainer.id = 'menu_container';
		this.menuContainer.setAttribute('class','menu_container');      // FF
		this.menuContainer.setAttribute('className','menu_container');  // IE
		
		/* GAMBIARRA pra corrigir 2 pixels */
		if(!document.all){
			this.menuContainer.style.height = '27px';
		}
			
		/* Objeto Tabela que receberá o Menu  */
		this.tableMenu = document.createElement('TABLE');
		this.tableMenu.id = 'container_menus';
		this.tableMenu.setAttribute('class','table_menu');      // FF
		this.tableMenu.setAttribute('className','table_menu');  // IE
			tBodyMenu = document.createElement('TBODY');
				trTableMenu = document.createElement('TR');
				trTablesubMenu = document.createElement('TR');
			tBodyMenu.appendChild(trTableMenu); 
			tBodyMenu.appendChild(trTablesubMenu);
		this.tableMenu.appendChild(tBodyMenu);
		this.menuContainer.appendChild(this.tableMenu);
		
		/* Percorrendo o arquivo XML para pegar os menus */
		for (i=0;i<this.getXmlDoc().getElementsByTagName('menu').length;i++){
			tdMenuOption = document.createElement('TD');
			tdMenuOption.id = 'menu_'+ i;
			tdMenuOption.setAttribute('reference_submenu','content_submenu_'+i);
			tdMenuOption.setAttribute('class','table_coluna_menu');     // FF
			tdMenuOption.setAttribute('className','table_coluna_menu'); // IE
			tdMenuOption.setAttribute('id_submenu','container_sub_menu_'+i);
			tdMenuOption.innerHTML = this.getXmlDoc().getElementsByTagName('menu')[i].attributes.getNamedItem("name").nodeValue;

			tdForSubMenu = document.createElement('TD');
			tdForSubMenu.id = 'submenu_'+ i;
			tdForSubMenu.style.verticalAlign = 'top';
			trTableMenu.appendChild(tdMenuOption);
			trTablesubMenu.appendChild(tdForSubMenu);
			
			//Tabela que conterá o conteudo dos Menus
			tableContentSubMenu = document.createElement('TABLE');
				tableContentSubMenu.id = 'content_submenu_'+ i;
				tableContentSubMenu.setAttribute('class','table_content_sub_menu');      // FF
				tableContentSubMenu.setAttribute('className','table_content_sub_menu');  // IE
					tBodyTableContentSubMenu = document.createElement('TBODY');
			/* Percorrendo o arquivo XML para pegar o conteudo dos menus */
			for(iOpt=0;iOpt<this.getXmlDoc().getElementsByTagName('menu')[i].getElementsByTagName('option').length;iOpt++)
			{
				if(this.getXmlDoc().getElementsByTagName('menu')[i].getElementsByTagName('option')[iOpt].getElementsByTagName('separator').length)
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
					tdTableContentSubMenu.setAttribute('src_xml',this.getXmlDoc().getElementsByTagName('menu')[i].getElementsByTagName('option')[iOpt].attributes.getNamedItem("src").nodeValue);
					tdTableContentSubMenu.style.padding = '3px';
					tdTableContentSubMenu.style.paddding = '0px';
					if (iOpt == this.getXmlDoc().getElementsByTagName('menu')[i].getElementsByTagName('option').length)    
					{
						tdTableContentSubMenu.style.borderBottom = '3px outset #eeeeee';
					}
					tdTableContentSubMenu.innerHTML = this.getXmlDoc().getElementsByTagName('menu')[i].getElementsByTagName('option')[iOpt].getAttribute('value');
					trTableContentsubMenu.appendChild(tdTableContentSubMenu);
					tBodyTableContentSubMenu.appendChild(trTableContentsubMenu);
				tableContentSubMenu.appendChild(tBodyTableContentSubMenu);
				
				tdMenuOption.onmouseover = function(tableContentSubMenu){
					this.style.background = '#0A246A';
					this.style.color = '#ffffff';
					alert(tableContentSubMenu);
				}
				tdMenuOption.onmouseout = function(){
					this.style.background = '#D4D0C8';
					this.style.color = '#000000';
				}
			}
			
			arraySubMenu.push(tableContentSubMenu);
		}
		document.getElementById('plataform').appendChild(this.menuContainer);
		//for (i=0;i<arraySubMenu.length;i++)
		//{
			//document.getElementById('submenu_'+(i + 1)).appendChild(arraySubMenu[i]);
		//}
	}

}