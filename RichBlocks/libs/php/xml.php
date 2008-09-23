<?php

function loadXmlFile($xml_dir)
{
	if (file_exists($xml_dir)) 
	{
		$xml = simplexml_load_file($xml_dir);
		//$xml->menu['name'] = 'teste';
		//file_put_contents($xml_dir, $xml->asXML());
		return $xml;
	} else {
		     exit('Failed to open test.xml.');
	}
}

function writeMenu()
{
	$x = loadXmlFile('../conf_RIA/menu.xml');
	foreach($x as $el)
	{
		echo "<input name='".$el['name']."' type='text' value='".$el['value']."'>";
	}
}
//$xml->addChild('presidente', 'Chapolin');
// exibindo o novo XML
//echo $xml->asXML();

?>