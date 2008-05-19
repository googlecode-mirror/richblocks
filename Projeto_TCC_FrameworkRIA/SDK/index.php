<?php

	include "libs/php/xml.php";
	
?>

<?php 

if($s_POST)
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
		<!-- Carrega Styles  -->
		<link href="styles/default.css" type="text/css" rel="stylesheet">

	<title>
		RichBlocks SDK
	</title>
</head>
<body>
<div id="div_container"
	 class="div_container">
	 
Menu
<div id="menu_properties" class="">
	<table class="menu_properties">
		<tr>
			<td>
				Nome:
				<input type="text" class="field_properties" />
			</td>
		</tr>
		<tr>
			<td>
				Valor:
				<input type="text" class="field_properties" />
			</td>
		</tr>
		<tr>
			<td>
				Descri&ccedil;&atilde;o:
				<input type="text" class="field_properties" />
			</td>
		</tr>
	</table>
</div>
<br>
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
</div>




