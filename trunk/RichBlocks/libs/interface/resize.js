function resizing(event){

	if(!event){
		event = window.event;
	}
	
	if(event.clientX - parseInt(document.getElementById(objToResize_ID).style.left) <= 200){
		document.getElementById(objToResize_ID).style.width= '200px';
		document.getElementById(objContentToResize_ID).style.width = 200 - 16 + 'px';
		return;
	}
	if(event.clientY - parseInt(document.getElementById(objToResize_ID).style.top) <= 100){
		document.getElementById(objToResize_ID).style.height= '100px';
		document.getElementById(objContentToResize_ID).style.height = 100 - 60 + 'px';
		return;
	}
	document.getElementById(objToResize_ID).style.width= event.clientX - parseInt(document.getElementById(objToResize_ID).style.left);
	document.getElementById(objToResize_ID).style.height= event.clientY - parseInt(document.getElementById(objToResize_ID).style.top);
	
	document.getElementById(objContentToResize_ID).style.width = parseInt(document.getElementById(objToResize_ID).style.width) - 16 + 'px';
	document.getElementById(objContentToResize_ID).style.height = parseInt(document.getElementById(objToResize_ID).style.height) - 60 + 'px';
	
	document.getElementById(objToResize_ID).original_width = parseInt(document.getElementById(objToResize_ID).style.width) - 16 + 'px';
	document.getElementById(objToResize_ID).original_height = parseInt(document.getElementById(objToResize_ID).style.height) - 60 + 'px';
	
}

function stopResizing(event){
	if(!event){
		event = window.event;
	}
	if(window.removeEventListener){
		window.removeEventListener('mousemove', resizing, true);
		window.removeEventListener('mouseup', stopResizing, true);
	}else if(document.detachEvent){
		document.detachEvent('onmousemove', resizing);
		document.detachEvent('onmouseup', stopResizing);
	}
}
