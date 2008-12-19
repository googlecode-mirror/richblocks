/* 
   Copyright 2008 Jaydson Gomes,tmferreira - RichBlocks  
   
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

//by tmferreira - http://www.webly.com.br/tutorial/javascript-e-ajax/7045/drag-and-drop.htm

//Cria DIV temporario

var objSelecionado = null;
var mouseOffset = null;
var flagActiveWindow = null;

function addEvent(obj, evType, fn) { //Fun��o adaptada da original de Christian Heilmann, em http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
if (typeof obj == "string") {
  if (null == (obj = document.getElementById(obj))) {
   throw new Error("Elemento HTML n�o encontrado. N�o foi poss�vel adicionar o evento.");
  }
}
if (obj.attachEvent) {
  return obj.attachEvent(("on" + evType), fn);
} else if (obj.addEventListener) {
  return obj.addEventListener(evType, fn, true);
} else {
  throw new Error("Seu browser n�o suporta adi��o de eventos.");
}
}
document.onmousemove = function(ev) {
var ev = ev || window.event;
var mousePos = mouseCoords(ev);
if (objSelecionado) {
	document.getElementById(objSelecionado).setAttribute('draging','true');
	divBlock.id = 'block_' + document.getElementById(objSelecionado).id;
	divBlock.style.width = document.getElementById(objSelecionado).style.width;
	divBlock.style.height = document.getElementById(objSelecionado).style.height;
	divBlock.style.zIndex = document.getElementById(objSelecionado).style.zIndex + 1;
	divBlock.style.display = 'block';
	divBlock.style.left = mousePos.x - mouseOffset.x + 'px';
	divBlock.style.top = mousePos.y - mouseOffset.y + 'px';
	//alert(document.getElementById(objSelecionado).getAttribute('draging'));
  // Posiciona a janela de acordo com o mouse
  //document.getElementById(objSelecionado).style.left = mousePos.x - mouseOffset.x + 'px';
  //document.getElementById(objSelecionado).style.top = mousePos.y - mouseOffset.y + 'px';
  
  //document.getElementById(objSelecionado).setAttribute('x',document.getElementById(objSelecionado).offsetTop);
  //document.getElementById(objSelecionado).setAttribute('y',document.getElementById(objSelecionado).offsetLeft);  
   
  max_top = 72;
  max_left = - parseInt(divBlock.style.width);
  max_right =  parseInt(document.body.clientWidth);
  max_down = parseInt(document.body.clientHeight);
  obj_top = parseInt(divBlock.style.top);
  obj_left = parseInt(divBlock.style.left);

  // Controla a posi��o TOP da janela
  if (obj_top <= max_top){
	divBlock.style.top = '72px';
	document.getElementById(objSelecionado).style.top = '72px';
  }
  // Controla a posi��o LEFT da janela
  if (obj_left <= max_left + 60){
	//document.getElementById(objSelecionado).style.left = max_left + 60 + 'px';
	divBlock.style.left = max_left + 60 + 'px';
  }
  
  // Controla a posi��o RIGHT da janela
  if (obj_left + parseInt(divBlock.offsetWidth) >= max_right){
	//document.getElementById(objSelecionado).style.left = max_right - parseInt(document.getElementById(objSelecionado).offsetWidth);
	divBlock.style.left = max_right - parseInt(divBlock.offsetWidth);
  }
  
  //alert(obj_top);
  //alert(max_down);
  // Controla a posi��o DOWN da janela
  if (obj_top + 50 >= max_down){
	//alert('a');
	//document.getElementById(objSelecionado).style.top = max_down - 30 + 'px';
	divBlock.style.top = max_down - 30 + 'px';
	//alert(document.getElementById(objSelecionado).style.height);
  }

  document.getElementById(objSelecionado).style.margin = '0px';
  return false;
}else{
	flagActiveWindow = false;
	//document.getElementById(objSelecionado).style.left = mousePos.x - mouseOffset.x + 'px';
  	//document.getElementById(objSelecionado).style.top = mousePos.y - mouseOffset.y + 'px';
}
}
function mouseCoords(ev){
if(ev.pageX || ev.pageY){
  return {x:ev.pageX, y:ev.pageY};
}
return {
  x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
  y:ev.clientY + document.body.scrollTop  - document.body.clientTop
};
}
function getPosition(e, ev){
e = document.getElementById(e);
var left = 0;
var top  = 0;
var coords = mouseCoords(ev);
while (e.offsetParent){
  left += e.offsetLeft;
  top  += e.offsetTop;
  e     = e.offsetParent;
}
left += e.offsetLeft;
top  += e.offsetTop;
return {x: coords.x - left, y: coords.y - top};
}
document.onmouseup = function(event) {
	visibleWindow(objSelecionado,event);
	divBlock.style.display = 'none';
	objSelecionado = null;
}

function visibleWindow(obj,event){	
	var ev = event || window.event;
	var mousePos = mouseCoords(ev);
	try{
		if(document.getElementById(obj).getAttribute('draging') == 'true'){
			document.getElementById(obj).style.left = divBlock.style.left;
  			document.getElementById(obj).style.top = divBlock.style.top;
  			document.getElementById(obj).setAttribute('draging','false');
		}
	}catch(error){}
}

function dragdrop(local_click, caixa_movida) {
// Desabilta a sele��o
disableSelection(document.getElementById(local_click));

document.getElementById(local_click).style.cursor = 'default';
addEvent(local_click, 'mousedown', function(ev) {
  objSelecionado = caixa_movida;
  mouseOffset = getPosition(objSelecionado, ev);
});
}

