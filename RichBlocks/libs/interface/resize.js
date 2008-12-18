/* 
   Copyright 2008 Jaydson Gomes,Felipe Nascimento - RichBlocks  
   
   This file is part of the program RichBlocks
   
   RichBlocks is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
   
   **********************************************************************
   
   Este arquivo � parte do programa RichBlocks
   
   RichBlocks � um software livre: voc� pode redistribui-lo e/ou
   modifica-lo dentro dos termos da Licen�a P�blica Geral GNU como 
   publicada pela Funda��o do Software Livre (FSF); na vers�o 2 da 
   Licen�a, ou (na sua opni�o) qualquer vers�o.

   Este programa � distribuido na esperan�a que possa ser  util, 
   mas SEM NENHUMA GARANTIA; sem uma garantia implicita de ADEQUA��O a qualquer
   MERCADO ou APLICA��O EM PARTICULAR. Veja a
   Licen�a P�blica Geral GNU para maiores detalhes.

   Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral GNU
   junto com este programa, se n�o veja em <http://www.gnu.org/licenses/>.
*/


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
		document.getElementById(objContentToResize_ID).style.height = 100 - 46 + 'px';
		return;
	}
	document.getElementById(objToResize_ID).style.width= event.clientX - parseInt(document.getElementById(objToResize_ID).style.left);
	document.getElementById(objToResize_ID).style.height= event.clientY - parseInt(document.getElementById(objToResize_ID).style.top);
	
	if(document.all){
		document.getElementById(objContentToResize_ID).style.width = parseInt(document.getElementById(objToResize_ID).style.width) - 5 + 'px';
		document.getElementById(objContentToResize_ID).style.height = parseInt(document.getElementById(objToResize_ID).style.height) - 46 + 'px';
	}else{
		document.getElementById(objContentToResize_ID).style.width = parseInt(document.getElementById(objToResize_ID).style.width) - 8 + 'px';
		document.getElementById(objContentToResize_ID).style.height = parseInt(document.getElementById(objToResize_ID).style.height) - 46 + 'px';
	}
	
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
