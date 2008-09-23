function Window(method,new_instance,forceZindex) {	

	//Attributes
	var id;
	var contentId;
	var idBar;
	var XMLname;
	var title;
	var description;
	var top;
	var left;
	var width;
	var height;
	var firstWidth;
	var firstHeight;
	var pageSrc;
	var footer;
	var new_instance;
	var z_index;
	var forceZindex;
	var objDOM_window;
	var objDOM_Content;
	var objDOM_windowBar;
	var objDOM_windowButtons = new Array;
	var drag;
	var resizable;
	
	// Constructor
	var construct = function(){
		
		// Elemento DIV Objeto Janela
		objDOM_window = document.createElement('DIV');
		objDOM_window.style.position = 'absolute';
		objDOM_window.style.border = '2px outset #eeeeee';
		objDOM_window.style.background = '#D4D0C8';
		objDOM_window.style.zIndex = '10000';
		objDOM_window.setAttribute('new_instance',new_instance);
		
		// Incrementa o contador que controla o Zindex das Janelas
		if(forceZindex == 'true'){
			objDOM_window.style.zIndex = zIndex_blackBackground + 1;
		}
		
		objDOM_window.style.zIndex = window_z_index + 1;
			
			// Elemeto DIV Barra da Janela
			objDOM_windowBar = document.createElement('DIV');
			objDOM_windowBar.setAttribute('class','bar');      // FF
			objDOM_windowBar.setAttribute('className','bar');  // IE
				tableWindowBar = document.createElement('TABLE');
				tableWindowBar.style.width = '100%';
					tBodyWindowBar = document.createElement('TBODY');
						trWindowBar = document.createElement('TR');	
							tdWindowBarTitle = document.createElement('TD');
							tdWindowBarTitle.setAttribute('class','bar_title');      // FF
							tdWindowBarTitle.setAttribute('className','bar_title');  // IE
							tdWindowBarButtons = document.createElement('TD');
							tdWindowBarButtons.style.width = '51px';
								divButtons = document.createElement('DIV');
								divButtons.style.cssFloat = 'right';
								divButtons.style.styleFloat = 'right';
								//divButtons.style.marginRight = '-12px';
								//divButtons.style.width = '60px';
									
									// Botão Minimizar
									iptMin = document.createElement('INPUT');
									iptMin.setAttribute('class','input_min');      // FF
									iptMin.setAttribute('className','input_min');  // IE
									iptMin.type = 'button';
									
									// Botão Maximizar
									iptMax = document.createElement('INPUT');
									iptMax.setAttribute('class','input_max');      // FF
									iptMax.setAttribute('className','input_max');  // IE
									iptMax.type = 'button';
									
									// Botão Fechar
									iptClose = document.createElement('INPUT');
									iptClose.setAttribute('class','input_close');      // FF
									iptClose.setAttribute('className','input_close');  // IE
									iptClose.type = 'button';
													
								divButtons.appendChild(iptMin);
								divButtons.appendChild(iptMax);
								divButtons.appendChild(iptClose);
									
							tdWindowBarButtons.appendChild(divButtons);
						trWindowBar.appendChild(tdWindowBarTitle);
						trWindowBar.appendChild(tdWindowBarButtons);
					tBodyWindowBar.appendChild(trWindowBar);
				tableWindowBar.appendChild(tBodyWindowBar);
			objDOM_windowBar.appendChild(tableWindowBar);
			
			// Elemeto DIV Conteudo da Janela, se method for = TRUE entao o metodo de carregamento é AJAX, senão carrega em um IFRAME
			
			if(method == 'true')
				objDOM_Content = document.createElement('DIV');
			else
				objDOM_Content = document.createElement('IFRAME');
			
			objDOM_Content.setAttribute('class','content');      // FF
			objDOM_Content.setAttribute('className','content');  // IE
			//objDOM_Content.innerHTML = 'Hello World';
			
			
			// Elemeto DIV Rodape da Janela
			objDOM_Footer = document.createElement('DIV');
			objDOM_Footer.setAttribute('class','footer');      // FF
			objDOM_Footer.setAttribute('className','footer');  // IE
				tableWindowFooter = document.createElement('TABLE');
				tableWindowFooter.style.width = '100%';
					tBodyWindowFooter = document.createElement('TBODY');
						trWindowFooter = document.createElement('TR');	
							tdWindowFooterStatus = document.createElement('TD');
							tdWindowFooterStatus.setAttribute('class','footer');      // FF
							tdWindowFooterStatus.setAttribute('className','footer');  // IE
							tdWindowFooterStatus.innerHTML = 'Conclu&iacute;do ';
							tdResize = document.createElement('TD');
							tdResize.setAttribute('align','right');
							tdResize.style.backgroundImage = 'url(img/winresize.gif)';
							tdResize.style.backgroundRepeat = 'no-repeat';
							tdResize.style.width = '10px';
							tdResize.style.cursor = 'se-resize';
							tdResize.style.height = '18px';
						trWindowFooter.appendChild(tdWindowFooterStatus);1
						trWindowFooter.appendChild(tdResize);
					tBodyWindowFooter.appendChild(trWindowFooter);
				tableWindowFooter.appendChild(tBodyWindowFooter);
			objDOM_Footer.appendChild(tableWindowFooter);				
										
		objDOM_window.appendChild(objDOM_windowBar);
		objDOM_window.appendChild(objDOM_Content);
		objDOM_window.appendChild(objDOM_Footer);		
	
		// Aloca a janela no BODY
		document.body.appendChild(objDOM_window);
	}
	
	//Methods
	this.setId = function(){
		dt = new Date();
		id = dt.getTime();
		id = 'window_'+id;
	}
	this.getId = function(){
		return id;
	}
	
	this.setDrag = function(p){
		drag = p;
	}
	
	this.getDrag = function(){
		return drag;
	}
		
	this.setResizable = function(p){
		resizable = p;
	}
	
	this.getResizable = function(){
		return resizable;
	}
	
	this.setIdBar = function(){
		dt = new Date();
		idBar = dt.getTime();
		idBar = 'bar_'+idBar;
	}
	this.getIdBar = function(){
		return idBar;
	}
	
	
	
	this.setXMLname = function(name){
		XMLname = name;
	}
	this.getXMLname = function(){
		return XMLname;
	}
	
	this.setTitle = function(t){
		title = t;
	}	
	this.getTitle = function(){
		return title;
	}
	
	this.setDescription = function(desc){
		description = desc;
	}
	this.getDescription = function(){
		return description;
	}
	
	this.setTopPosition = function(t){
		top = t;
	}
	this.setLeftPosition = function(l){
		left = l;
	}
	this.getLeftPosition = function(){
		return left;
	}
	this.getTopPosition = function(){
		return top;
	}
	
	this.setWidth = function(par_width){
		width = par_width;
	}
	this.getWidth = function(){
		return width;
	}
	this.setHeight = function(par_height){
		height = par_height;
	}
	this.getHeight = function(){
		return height;
	}
	
	this.setPageSrc = function(ps){
		pageSrc = ps;
	}
	this.getPageSrc = function(){
		return pageSrc;
	}
	
	this.setFooter = function(f){
		footer = f;
	}
	this.getFooter = function(){
		return footer;
	}
	
	this.setNewInstance = function(ni){
		new_instance = ni;
	}
	this.getNewInstance = function(){
		return new_instance;
	}
	
	this.setForceZindex = function(fz){
		forceZindex = fz;
	}
	this.getForceZindex = function(){
		return fz;
	}
	
	this.setZindex = function(z){
		z_index = z;
	}
	this.getZindex = function(){
		return z_index;
	}
	
	this.resize= function (event){		
		// Teste para ver se a janela pode ser redimensionada
		if(objDOM_window.getAttribute('resizable') == 'false'){
			return false;
		}else{
			if(!event){event = window.event;}
			if (window.addEventListener){
				  window.addEventListener('mousemove', resizing, true); 
				  window.addEventListener('mouseup', stopResizing, true);
			  
			} else if (document.attachEvent){
				document.attachEvent("onmousemove", resizing);
				document.attachEvent('onmouseup', stopResizing);
			}
			objToResize_ID = objDOM_window.id;
			objContentToResize_ID = objDOM_Content.id;
		}

	}
	
	this.setWindowDOM = function(event){
		if(!event){
			event = window.event;
		}
				
		objDOM_window.style.width = this.getWidth();
		objDOM_window.setAttribute('original_width',this.getWidth());
		objDOM_window.style.height = this.getHeight();
		objDOM_window.setAttribute('original_height',this.getHeight());
		objDOM_window.style.top = this.getTopPosition();
		objDOM_window.setAttribute('xml_name',this.getXMLname());
		objDOM_window.setAttribute('original_top',this.getTopPosition());
		objDOM_window.style.left = this.getLeftPosition();
		objDOM_window.setAttribute('original_left',this.getLeftPosition());
		//objDOM_window.setAttribute('new_instance',this.getNewInstance());
		objDOM_Content.style.width = parseInt(this.getWidth()) - 16;
		objDOM_Content.style.height = parseInt(this.getHeight()) - 60;
		
		objDOM_window.setAttribute('focus',true);
		firstWidth = objDOM_window.style.width;
		firstHeight = objDOM_window.style.height;
		tdWindowBarTitle.innerHTML = this.getTitle();
		objDOM_windowBar.id = this.getIdBar();
		objDOM_window.oncontextmenu = function(){
			windowRightButtonMenu(event);
		}
		objDOM_window.id = this.getId();
		objDOM_window.title = this.getTitle();
		objDOM_Content.id = 'content_' + this.getId();
		
		if(window.addEventListener){
			tdResize.addEventListener('mousedown', this.resize, true);
		}else if(window.attachEvent){
			tdResize.attachEvent('onmousedown', this.resize);
		}
	}
	
	this.minimize = function (objWindow){
		minimized(objWindow);
	}
	this.maximize = function(objWindow,objContent,iptMax){
		if(maximized(objWindow,objContent,iptMax)){
			return true;
		}
	}
	
	this.setProperties = function(XMLname,title,description,top,left,width,height,pageSrc,footer,new_instance,forceZindex){
		this.setXMLname(XMLname);
		this.setTitle(title);
		this.setDescription(description);
		this.setTopPosition(top);
		this.setLeftPosition(left);
		this.setWidth(width);
		this.setHeight(height);
		this.setPageSrc(pageSrc);
		this.setFooter(footer);
		this.setNewInstance(new_instance);
		this.setForceZindex(forceZindex);
	}
	
	//Método responsável pelo controle de todos os eventos dos botões da Janela
	this.addEvents = function(){	
		min = this.minimize;
		max = this.maximize;
		
		//Button Minimizar
		iptMin.onclick = function(){
			min(objDOM_window);
		}
		
		iptMax.onclick = function(){		
			if(max(objDOM_window,objDOM_Content,iptMax)){
				this.style.backgroundImage = 'url(img/back_button_max.png)';
				return true;
			}
			this.style.backgroundImage = 'url(img/back_button_max_restore.png)';
		}
		
		//Button Close
		iptClose.onclick = function (){
			window_focus = null;
			
			// Remove o elemento
			document.body.removeChild(objDOM_window);
			
			//Laço que percorre todas as janelas abertas e deleta do array que a armazena
			for(i in plataform_windows){	
				if(objDOM_window.id == i){
					delete plataform_windows[i];
					changeBackgroundWindowBar();
				}
			}
			
			//Laço que percorre todas as janelas abertas e deleta do array que a armazena (Este array armazena apenas os nomes XML das janelas)
			for (i in plataform_windows_name){
				if(objDOM_window.getAttribute('xml_name') == i){
					delete plataform_windows_name[i];
					changeBackgroundWindowBar();
				 }
			}
		}
		
		objDOM_windowBar.ondblclick = function(){
			
			if(max(objDOM_window,objDOM_Content,iptMax)){
				iptMax.style.backgroundImage = 'url(img/back_button_max.png)';
				return true;
			}
			iptMax.style.backgroundImage = 'url(img/back_button_max_restore.png)';
		}
		
		objDOM_window.onmousedown = function(){
			window_z_index = window_z_index + 1;
			
			objDOM_window.style.zIndex = window_z_index;
			changeBackgroundWindowBar(objDOM_window.id);
		}	
	}
	
	this.setDragable = function (idDrag,idObjDrag){
		if(this.getDrag() == false){
			return false;
		}else{
			dragdrop(idDrag,idObjDrag);
		}
	}
	
	this.setActions = function(min,max,close,drag,resize){
		if(!min)
		{	
			divButtons.removeChild(iptMin);			
		}
		if(!max)
		{
			divButtons.removeChild(iptMax);
		}
		if(!close)
		{	
			divButtons.removeChild(iptClose);			
		}
		if(!drag)
		{
			this.setDrag(drag);
		}
		if(!resize)
		{
			this.setResizable(resize);
			objDOM_window.setAttribute('resizable',eval(resize));
			tdResize.style.backgroundImage = '';
			tdResize.style.cursor = 'default';
		}
	}
	
	this.build = function(){
		this.setId();
		this.setIdBar();
		this.setWindowDOM();
		this.addEvents();
		this.setDragable(document.getElementById(objDOM_window.childNodes[0].id).id,objDOM_window.id);
		window_focus = objDOM_window.id;
		
		//Carrega a pagina no Objeto Janela
		loadPage(this.getPageSrc(),objDOM_Content.id,method);	
		return objDOM_window;
		
	}
construct();
}


