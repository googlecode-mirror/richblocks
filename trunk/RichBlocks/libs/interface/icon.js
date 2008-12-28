/* 
   Copyright 2008 Jaydson Gomes - RichBlocks  
   
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

function buildIcons(){	
	var xmlDoc =loadXmlDocument('conf/icon.xml');    	  
	var icons = xmlDoc.getElementsByTagName("icon");
	
	for(var i=0;i<icons.length;i++){
		var ico = new icon(icons[i].getAttribute('name'),icons[i].getAttribute('value'),'img/'+ icons[i].getAttribute('img')+'',icons[i].getAttribute('top'),icons[i].getAttribute('left'),icons[i].getAttribute('windowTarget'));
	}
}

function reloadIcons(){
	for(i in plataform_icons){
		plataform_icons[i].style.top = plataform_icons[i].getAttribute('original_top');
		plataform_icons[i].style.left = plataform_icons[i].getAttribute('original_left');
	}
}

function icon(name,value,img,top,left,window){
	
	var icone = document.createElement('DIV');
	icone.id = 'richblocks_icon_'+name;
	icone.setAttribute('original_top',top);
	icone.setAttribute('original_left',left);
	icone.style.width = '45px';
	icone.setAttribute('window',window);
	icone.style.height = '45px';
	icone.style.position = 'absolute';
	icone.style.top = top + 'px';
	icone.style.left = left + 'px';
	icone.style.backgroundImage = 'url('+img+')';
	icone.style.backgroundRepeat = 'no-repeat';
	icone.ondblclick = function(){
		buildWindow(window);
	}
	icone.oncontextmenu = function(event){
		contextMenuIcon(event,icone);
	}
	
	var iconeLabel = document.createElement('DIV');
	iconeLabel.style.fontFamily = 'tahoma';
	iconeLabel.style.fontSize = '11px';
	iconeLabel.style.paddingTop = '38px';
	iconeLabel.setAttribute('align','center');
	iconeLabel.innerHTML = value;
	icone.appendChild(iconeLabel);
	
	document.body.appendChild(icone);
	plataform_icons.push(icone);
	dragdrop(icone.id,icone.id);
}
