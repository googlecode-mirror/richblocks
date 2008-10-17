function ajax() {
	   try 
	   {
		  xmlhttp = new XMLHttpRequest();
	   }
	   catch(ee) {
		  try 
		  {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		  }
		  catch(e) {
			 try 
			 {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			 }
			 catch(E) {
				xmlhttp = false;
			 }
		  }
	   }
}

function toSubmit(url){
	ajax();
	var p = document.getElementById('hw').value;
    var conteudo = "hw="+p;
    
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
										 alert(texto);
									}
								} 
   xmlhttp.send(conteudo);  
}






