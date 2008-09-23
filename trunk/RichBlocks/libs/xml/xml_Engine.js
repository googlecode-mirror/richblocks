/*
		-------------------------------------------
		Jaydson Gomes 28/03/2008
		jayalemao@gmail.com
		-------------------------------------------
		XML Engine
		Scritpt criado com base no W3C
		http://www.w3schools.com/dom/
			
*/

function loadXmlDocument(arqXml) {

	//Internet Explorer
	try {
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		} catch(e) {
					   //Firefox, Mozilla, Opera, etc.
					   try {
								xmlDoc=document.implementation.createDocument("","",null);
						   }catch(e) {
										alert(e.message)
						   }
				   }
	try {
     		xmlDoc.async=false;
			xmlDoc.load(arqXml);
			return(xmlDoc);
		}catch(e) {
					alert(e.message)
		}
	return(null);
}
	
function xmlToWindow(windowName){

	// Carrega o arquivo XML
	xmlDoc =loadXmlDocument('../conf_RIA/windows.xml');
	
	//  Pega todos os Objetos do XML
	windows = xmlDoc.getElementsByTagName("window"); 
	titles = xmlDoc.getElementsByTagName("title"); 
	bars = xmlDoc.getElementsByTagName("bar"); 
	footers = xmlDoc.getElementsByTagName("footer");	
	contents = xmlDoc.getElementsByTagName("content");	
	
	// Array que guarda os Objetos necessários para criar a Janela
	arrayConfWindow = new Array();
	
	// Variavel erro, captura os erros de tentativas de abrir o arquivo XML. 
	var error = 0;
	
	// Percorre o o Objeto a procura do NODO que deve montar a janela
	for(i=0; i<windows.length; i++)
	{
		if(windows[i].attributes.getNamedItem("name").nodeValue == windowName)
		{
			//Popula o Array com os Obetos
			arrayConfWindow['window'] = windows[i];
			arrayConfWindow['title'] = titles[i];
			arrayConfWindow['bar'] = bars[i];
			arrayConfWindow['content'] = contents[i];
			arrayConfWindow['footer'] = footers[i];
			buildWindow(arrayConfWindow);
			
		}else{
				// Acumula os Erros, se n ofinal for igual ao tamanho do Objeto windows, quer dizer que nao encontrou o arquivo XML.
				error++;
		}
		if(error == windows.length)
		{
			alert('Erro 1:\n Falha ao tentar encontrar o nodo XML\n A referencia era :\n "'+windowName+'"\n Verifique o arquivo de configuração de Menus \n Provavelmente não existe nenhuma Janela definida com esse nome');
		}
	}
}
