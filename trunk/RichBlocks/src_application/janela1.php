<html>
	<head>
		<title>Pagina Teste</title>
		<script>
			function verifyForm(){
				
				if(document.getElementById('nome').value == '')
				{
					alert('Preencha o seu nome');
					return false;
				}
				document.getElementById('form').submit();
			}
		</script>
	</head>
<body>
<center>
	<form name="form" method="post" target="" id="form" action="teste.php">
		RichBlocks Formulario
		<div style="width:150px;height:150px;padding:10px;">
			Nome<br>
			<input name="nome" type="text" id="nome">
			<br>
			Email<br>
			<input name="email" type="text" id="email">
			<br>
			Telefone<br>
			<input name="telefone" type="text" id="telefone">
			<br>
			<input type="button" value="Submeter" onclick="return verifyForm()">
		</div>
	</form>
</center>
</body>
</html>