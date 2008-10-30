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

function loadFunctions(){
	xmlDoc =loadXmlDocument('conf/functions.xml');    	
	functions = xmlDoc.getElementsByTagName("function"); 	 
	
	for(i=0;i<functions.length;i++){
		xml_functions.push(functions[i]);
	}
}	
function exec(functionName){
	for(i=0;i<xml_functions.length;i++){		
		if(xml_functions[i].getAttribute('name') == functionName){
			if(document.all){
				eval(xml_functions[i].text);
			}else{
					eval(xml_functions[i].firstChild.nextSibling.nodeValue);
			}
				return true;
		}else{
			  error = 'Erro ao tentar encontrar a fun��o com o nome "'+functionName+'". \nVerifique no arquivo funcions.xml se existe alguma fun��o com este nome.';
		}
	}	
	if(error){
		alert(error);
	}
}



