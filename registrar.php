<html>
	<head>
		<meta charset="UTF-8">
		<title>Junior (Registrado)</title>

		<?php
			
			/*
			$host = "localhost";
			$usuario = "root";
			$senha = "";
			$bancoDados = "jumper";
			*/
			$host = "";
			$usuario = "";
			$senha = "";
			$bancoDados = "";

			date_default_timezone_set("America/Bahia");
			$data = date("d/m/Y - H:i:s");

			$conexao = mysqli_connect($host, $usuario, $senha, $bancoDados);
			mysqli_query($conexao, "SET NAMES 'utf8'");
			if(mysqli_connect_errno()){
				echo "Erro!";
			}

			$nome = $_POST["nome"];
			$recorde = $_POST["recorde"];

			if($nome == ""){
				$nome = "Anônimo";
			}
			if($recorde == ""){
				header("location: jumper.php");
			}

			//$consulta = "INSERT INTO recordes (nome, recorde, data) VALUES ('$nome', '$recorde', '$data')";
			$consulta = "INSERT INTO jumper (nome, recorde, data) VALUES ('$nome', '$recorde', '$data')";
			$dados = mysqli_query($conexao, $consulta);

			mysqli_close($conexao);

			header("location: jumper.php");

		?>

	</head>

	<body style="margin: 0px; background-color: rgb(0, 100, 0); color: white; font-size: 18px; font-family: Century Gothic;">
	</body>

</html>