<?php
	if($_POST){
		echo "HELLO WORLD IS WORKING<br>";
		echo $_POST['hw'];
		exit;
	}
?>
<html>
	<head>
		<title>Pagina Teste</title>
	</head>
<body>
	<form name="form" method="post" target="hidden_frame">
		<div style="width:150px;height:150px;padding:10px;border:solid 1px">
			Hello Word<br>
			<input name="hw" type="text" id="hw" value="Hello Word">
			<br>
			<input type="button" value="Submeter" onclick="toSubmit('../src_application_RIA/result.php')">
		</div>
	</form>
<iframe style="display:none" name="hidden_frame">
</iframe>
</body>
</html>