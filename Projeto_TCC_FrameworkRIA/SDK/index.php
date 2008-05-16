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
// grava no arquivo paises2.xml
//file_put_contents('paises2.xml', $xml->asXML());

?>

<?php 

if($_POST)
{
	$xml = loadXmlFile('../conf_RIA/menu.xml');
	$i=1;
	foreach($xml as $el)
	{
		echo $el['value'] = $_POST['menu'.$i];
		file_put_contents('../conf_RIA/menu.xml', $xml->asXML()); 
		$i++;
	}	
}else{
?>

<html>
<head>
	<title>
		* SDK RichBlocks *
	</title>
</head>
<body>
<form action="index.php" method="post" name="form">
<?php writeMenu(); ?>
<input type='submit' 
	   value='Alterar'>
</form>

</body>
</html>
<?php
}
?>
