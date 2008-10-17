//by tmferreira - http://www.webly.com.br/tutorial/javascript-e-ajax/7045/drag-and-drop.htm

var objSelecionado = null;
var mouseOffset = null;
function addEvent(obj, evType, fn) { //Função adaptada da original de Christian Heilmann, em http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
if (typeof obj == "string") {
  if (null == (obj = document.getElementById(obj))) {
   throw new Error("Elemento HTML não encontrado. Não foi possível adicionar o evento.");
  }
}
if (obj.attachEvent) {
  return obj.attachEvent(("on" + evType), fn);
} else if (obj.addEventListener) {
  return obj.addEventListener(evType, fn, true);
} else {
  throw new Error("Seu browser não suporta adição de eventos.");
}
}
document.onmousemove = function(ev) {
var ev = ev || window.event;
var mousePos = mouseCoords(ev);
if (objSelecionado) {
	
  // Posiciona a janela de acordo com o mouse
  document.getElementById(objSelecionado).style.left = mousePos.x - mouseOffset.x + 'px';
  document.getElementById(objSelecionado).style.top = mousePos.y - mouseOffset.y + 'px';
     
   
  max_top = 72;
  max_left = - parseInt(document.getElementById(objSelecionado).style.width);
  max_right =  parseInt(document.body.clientWidth);
  max_down = parseInt(document.body.clientHeight);
  obj_top = parseInt(document.getElementById(objSelecionado).style.top);
  obj_left = parseInt(document.getElementById(objSelecionado).style.left);

  // Controla a posição TOP da janela
  if (obj_top <= max_top){
	document.getElementById(objSelecionado).style.top = '72px';
  }
  // Controla a posição LEFT da janela
  if (obj_left <= max_left + 60){
	document.getElementById(objSelecionado).style.left = max_left + 60 + 'px';
  }
  
  // Controla a posição RIGHT da janela
  if (obj_left + parseInt(document.getElementById(objSelecionado).offsetWidth) >= max_right){
	document.getElementById(objSelecionado).style.left = max_right - parseInt(document.getElementById(objSelecionado).offsetWidth);
  }
  
  //alert(obj_top);
  //alert(max_down);
  // Controla a posição DOWN da janela
  if (obj_top + 50 >= max_down){
	//alert('a');
	document.getElementById(objSelecionado).style.top = max_down - 30 + 'px';
	//alert(document.getElementById(objSelecionado).style.height);
  }

  document.getElementById(objSelecionado).style.margin = '0px';
  return false;
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
document.onmouseup = function() {
objSelecionado = null;
}
function dragdrop(local_click, caixa_movida) {
document.getElementById(local_click).style.cursor = 'default';
addEvent(local_click, 'mousedown', function(ev) {
  objSelecionado = caixa_movida;
  mouseOffset = getPosition(objSelecionado, ev);
});
}