<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<title>Junior (John Jumper)</title>

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
			
			

			$conexao = mysqli_connect($host, $usuario, $senha, $bancoDados);
			mysqli_query($conexao, "SET NAMES 'utf8'");
			if(mysqli_connect_errno()){
				echo "Erro!";
			}

			//$consulta = "SELECT nome, recorde FROM recordes ORDER BY recorde DESC";
			$consulta = "SELECT nome, recorde FROM jumper ORDER BY recorde DESC";
			$dados = mysqli_query($conexao, $consulta);
			$voltas = 0;
			$recordista = "";
			$recorde = "";

		?>

	</head>

	<body style="margin: 0px; background-color: rgb(0, 0, 0); color: rgb(150, 150, 150); font-size: 150%; font-family: Century Gothic; margin: 20px;">
		<center>

		<div id="ranking" style="font-family: Arial; border: 0px solid black; border-radius: 70px; color: rgb(70, 70, 70); width: 90%; background-color: rgb(220, 220, 220); padding-bottom: 20px; padding-top: 0px;">

		<p style="font-size: 40px; color: rgb(0, 0, 0); padding-top: 10px;">RANKING</p>
		<?php
			while($saida = mysqli_fetch_array($dados)){
				$voltas++;
				$recordista = $saida['nome'];
				$recorde = $saida['recorde'];
				echo "<br>";

				echo "($voltas) $recordista - $recorde";
			}

			mysqli_close($conexao);
			?>
		</div>

		</center>

	</body>

</html>