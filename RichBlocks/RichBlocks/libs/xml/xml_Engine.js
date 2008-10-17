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