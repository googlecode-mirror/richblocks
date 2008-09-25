function loadWindows(){
	//Carrega o XML de Janelas
	xmlDoc =loadXmlDocument('conf/windows_.xml');    	
	windows = xmlDoc.getElementsByTagName("window"); 	 
	
	for(i=0;i<windows.length;i++){
		xml_windows.push(windows[i]);
	}
}	

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

function setMinizeds(){
	var sizeWindow = getSizeWindow();
	count_size = 0;
	
	topMinimizeds = parseInt(sizeWindow[1]) - 28 + 'px';
	frameMinimizeds.style.top = topMinimizeds;
	
	for(i=0;i<frameMinimizeds.childNodes.length;i++){
		count_size += parseInt(frameMinimizeds.childNodes[i].style.width);
	}

	if(count_size >=sizeWindow[0]){
		frameMinimizeds.style.height = parseInt(frameMinimizeds.style.height) + parseInt(frameMinimizeds.style.height) + 'px';	
		topMinimizeds = parseInt(sizeWindow[1]) - 52 + 'px';
		frameMinimizeds.style.top = topMinimizeds;
	}
}

function setSysTrayPosition(){
	sizeWindow = getSizeWindow();
	document.getElementById('frame_systray').style.top = parseInt(sizeWindow[1]) - 23 + 'px';
	document.getElementById('frame_systray').style.left = parseInt(sizeWindow[0]) - 100 + 'px'; // 100 é o tamanho do elemento sysTray
}

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

function disableSelection(target){
	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"
	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}
//target.style.cursor = "default"
}

function loadPage(page,windowContentId,method){
   ajax();
   var url = 'src_application/'+ page;
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
										 if(method == 'true'){
											document.getElementById(windowContentId).innerHTML = texto;
											}
										else{
											//document.getElementById(windowContentId).src = url;
											document.getElementById(windowContentId).src = url;
											}
									}
								}
   xmlhttp.send(url);  
}

function changeBackground(imgName){
	document.getElementById('invisible').style.display = '';
	document.getElementById('frame_properties').src = 'img/'+imgName+'';
	document.getElementById('invisible').style.display = 'none';
}

function verifyChecked(){
	for(i=0;i<document.getElementsByTagName('input').length;i++){
		if(document.getElementsByTagName('input')[i].type == 'radio'){
			if(document.getElementsByTagName('input')[i].checked){
				top.changeBackground(document.getElementsByTagName('input')[i].id);
			}
		}
	}
}

function clock(){
    momentoAtual = new Date();
    hora = momentoAtual.getHours();
    minuto = momentoAtual.getMinutes();
    if(parseInt(minuto) < 10){
    	minuto = '0' + minuto;
    }
    segundo = momentoAtual.getSeconds();
    if(parseInt(segundo)<10){
    	segundo = '0' + segundo;
    }
    horaImprimivel = hora + " : " + minuto + " : " + segundo;
    document.getElementById('frame_systray').innerHTML = horaImprimivel;
    setTimeout("clock()",1000);
} 