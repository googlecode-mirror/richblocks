//Função que retorna o tamanho atual da janela do navegador
function getSizeWindow() {
   var sizeWindow = new Array();
   sizeWindow[0] = 0;  // Width
   sizeWindow[1] = 0;  // Height
  
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    sizeWindow[0] = window.innerWidth;
    sizeWindow[1] = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
		    //IE 6+ in 'standards compliant mode'
		    sizeWindow[0] = document.documentElement.clientWidth;
		    sizeWindow[1] = document.documentElement.clientHeight;
		   } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					  //IE 4 compatible
					  sizeWindow[0] = document.body.clientWidth;
					  sizeWindow[1] = document.body.clientHeight;
				    }
return sizeWindow;
}

//Aloca a barra de janela minmimizadas no local correto
function setMinizeds(){
	var sizeWindow = getSizeWindow();
	count_size = 0;
	line = 0;
	
	topMinimizeds = parseInt(sizeWindow[1]) - 28 + 'px';
	frameMinimizeds.style.top = topMinimizeds;
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		count_size += parseInt(frameMinimizeds.childNodes[i].style.width);
	}

	if(count_size >=sizeWindow[0]){
		line = line + 1; 
		frameMinimizeds.style.height = parseInt(frameMinimizeds.style.height) + parseInt(frameMinimizeds.style.height) + 'px';	
		topMinimizeds = parseInt(sizeWindow[1]) - 52 + 'px';
		frameMinimizeds.style.top = topMinimizeds;
		if(line == 1){
			//topMinimizeds = parseInt(sizeWindow[1]) - 77 + 'px';
			//frameMinimizeds.style.top = topMinimizeds ;
		}
	}
}

//Aloca a barra SysTray no local correto
function setSysTrayPosition(){
	sizeWindow = getSizeWindow();
	document.getElementById('frame_systray').style.top = parseInt(sizeWindow[1]) - 23 + 'px';
	document.getElementById('frame_systray').style.left = parseInt(sizeWindow[0]) - 78 + 'px'; // 100 é o tamanho do elemento sysTray
}

//Função responsável por fazer o efeito de minimizar a janela
function minimized(objWindow){
	
	objWindow.childNodes[0].style.backgroundColor='#BABABA';
	
	tempDivMinimized = document.createElement('DIV');
	tempDivMinimized.id = 'temp_minimized_' + objWindow.id;
	tempDivMinimized.style.width = '120px';
	tempDivMinimized.style.height = '20px';
	tempDivMinimized.style.background = '#D4D0C8';
	tempDivMinimized.style.border = '1px outset #eeeeee';
	tempDivMinimized.style.cssFloat = 'left';
	tempDivMinimized.style.styleFloat = 'left';
	tempDivMinimized.style.paddingLeft = '5px';
	tempDivMinimized.style.paddingTop = '2px';
	tempDivMinimized.style.textAlign = 'left';
	tempDivMinimized.style.cursor = 'default';
	
	fullname = objWindow.title;
	halfname = objWindow.title.substring(0,20) + '...';
	if(objWindow.title.length > 20){
		tempDivMinimized.innerHTML = halfname;
	}else{
		tempDivMinimized.innerHTML = fullname;
	}
	
	tempDivMinimized.setAttribute('title',objWindow.title);
	frameMinimizeds.appendChild(tempDivMinimized);
	
	count_size = 100;
	var sizeWindow = getSizeWindow();
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		count_size += parseInt(frameMinimizeds.childNodes[i].style.width);
	}

	if(count_size >=sizeWindow[0]){
		frameMinimizeds.style.height = parseInt(frameMinimizeds.style.height) + parseInt(frameMinimizeds.style.height) + 'px';	
		topMinimizeds = parseInt(sizeWindow[1]) - 52 + 'px';
		frameMinimizeds.style.top = topMinimizeds;
	}
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		if(frameMinimizeds.id == frameMinimizeds.childNodes[i].id){
			alert('Iguais');
		}
	}
	
	tempDivMinimized.onmousedown = function(){
		this.style.border = '1px inset #eeeeee';
	}	
	tempDivMinimized.onmouseup = function(){
		this.style.border = '1px outset #eeeeee';
	}
	tempDivMinimized.onmouseout = function(){
		this.style.border = '1px outset #eeeeee';
	}
	tempDivMinimized.onclick = function(){
		window_z_index = window_z_index + 1;
		objWindow.style.display = '';
		objWindow.style.zIndex = window_z_index;
		objWindow.childNodes[0].style.backgroundColor='#34508E';
		frameMinimizeds.removeChild(this);
		setMinizeds();
	}
	changeBackgroundWindowBar();
	objWindow.style.display = 'none';
}

//Função responsável por fazer o efeito de maximizar a janela
function maximized(objWindow,objContent,iptMax){
	if(iptMax.style.backgroundImage == 'url(img/back_button_max_restore.png)'){
		objWindow.style.top = objWindow.getAttribute('original_top') + 'px';
		objWindow.style.left = objWindow.getAttribute('original_left') + 'px';
		objWindow.style.width = objWindow.getAttribute('original_width') + 'px';
		objWindow.style.height = objWindow.getAttribute('original_height') + 'px';
		
		w = parseInt(objWindow.getAttribute('original_width'));
		h = parseInt(objWindow.getAttribute('original_height'));
		w = w - 16;
		h = h - 60;

		objContent.style.width = w + 'px';
		objContent.style.height = h + 'px';		
		return true;
	}
	var sizeWindow = getSizeWindow();
	objWindow.style.top = '72px';
	objWindow.style.left = '0px';
	objWindow.style.width = sizeWindow[0];
	objContent.style.width = parseInt(sizeWindow[0]) - 16 + 'px';
	objWindow.style.height = parseInt(sizeWindow[1] - 102 + 'px');
	objContent.style.height = parseInt(sizeWindow[1] - 165 + 'px');	
}

//Função responsável aletar a cor da barra da janela quando esta em foco
function changeBackgroundWindowBar(id){
	for(i in plataform_windows){
		if(!id){
			window_z_index = window_z_index + 1;
			document.getElementById(i).childNodes[0].style.backgroundColor = '#34508E';
			document.getElementById(i).style.zIndex = window_z_index;
			return;
		}
		//document.getElementById(i).firstChild.syle.backgroundColor = 'red';	
		// alert('ID '+id);
		// alert('i ' +i);
		try{
			if(document.getElementById(id).id == i){
				document.getElementById(i).childNodes[0].style.backgroundColor = '#34508E';
			}else{
				document.getElementById(i).childNodes[0].style.backgroundColor = '#BABABA';
			}
		}catch(e){
		}	
	}
}

// Função que desbilita a seleção do mouse
function disableSelection(target){
	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"
	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}
}

//Função que carrega uma URL dentro da janela(Parametros: URL,Id da janela, Método:Ajax ou Iframe)
function loadPage(page,windowContentId,method){
   if(method != 'true'){
   		document.getElementById(windowContentId).src = page;
   }else{
	   ajax();
	   var url = 'src_application/'+ page;
	   xmlhttp.open("POST",url,true);
	   xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8?");
	   
	   xmlhttp.onreadystatechange = function() 
									{
										if (xmlhttp.readyState == 1)
										{
											document.getElementById(windowContentId).innerHTML = 'Carregando...';
										}
										if (xmlhttp.readyState == 4)
										{
									        var texto = xmlhttp.responseText;
									        texto = texto.replace(/\+/g," ");
									        texto = unescape(texto);
											document.getElementById(windowContentId).innerHTML = texto;
										}
									}
	   xmlhttp.send(url);  
	}
}

//Função que altera o Plano de Fundo (Parametro: nome da imagem, o diretório é img)
function changeBackground(imgName){
	document.getElementById('invisible').style.display = '';
	document.getElementById('frame_properties').src = 'img/'+imgName+'';
	document.getElementById('invisible').style.display = 'none';
}

// Função responsável por criar o Relógio
function clock(){
    momentoAtual = new Date();
    hora = momentoAtual.getHours();
    minuto = momentoAtual.getMinutes();
    if(parseInt(minuto) < 10){
    	minuto = '0' + minuto;
    }
    horaImprimivel = hora + ":" + minuto;
    document.getElementById('frame_systray').innerHTML = horaImprimivel;
    setTimeout("clock()",1000);
} 

// Função que cancela eventos
function cancelEvent(event){
	if (typeof(event.preventDefault)=='function'){
	        event.preventDefault();
	    } else {
	        event.returnValue = false;
	        event.keyCode = 0;
	    }
}


