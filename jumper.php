<!--
Fabricio Junior
Inicio: 11/07/2017
Ultima Atualizacao: 22/08/2017
Fim: ?
-->

<html>

	<head>
		<meta name="viewport" content="width=device-width, user-scalable=1.0">
		<meta lang="pt-br">
		<meta charset="utf-8">
		<title>John Jumper</title>

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

		?>

	</head>

	<body style="margin: 0px; background-color: black; text-align: center;">
		
		<script type="text/javascript" src="libraries/p5.min.js"></script>
		<script type="text/javascript" src="libraries/p5.dom.min.js"></script>
		<script type="text/javascript" src="libraries/p5.sound.min.js"></script>
		<script type="text/javascript" src="libraries/p5.collide2d.min.js"></script>
		<script type="text/javascript" src="game/main.js"></script>
		<script type="text/javascript" src="game/entidades.js"></script>
		<script type="text/javascript" src="game/player.js"></script>
		<script type="text/javascript" src="game/plataformas.js"></script>
		<script type="text/javascript" src="game/ambiente.js"></script>
		<script type="text/javascript" src="game/savebar.js"></script>
		<script type="text/javascript" src="game/icones.js"></script>

		<form action="novo-recorde.php" method="post" id="formulario">
			<input type="hidden" name="novo-recorde" value="" id="novo-recorde" />
		</form>

		<div style="float: left; color: white; border: 0px solid yellow; width: 30%; height: 98%; margin: 5px;">
			<style type="text/css">
				#rank{
					color: white;
				}
			</style>
		<?php

			echo "<div id='titulo' style='font-size: 40px; font-family: Copperplate Gothic; text-decoration: underline;'><a id='rank' href='rankingCompleto.php'>Ranking</a></div>";
			echo "<br>";

			while($saida = mysqli_fetch_array($dados)){
				$voltas++;
				$nome = $saida['nome'];
				$recorde = $saida['recorde'];

				if($voltas == 1){
					echo "<div id='primeiro' style='font-size: 20px; font-family: Copperplate Gothic; color: rgb(255, 255, 0)'>$voltas - $nome --- ( $recorde )</div>";
				}

				else if($voltas == 2){
					echo "<div id='segundo' style='font-size: 16px; font-family: Copperplate Gothic; color: rgb(255, 255, 255)'>$voltas - $nome --- ( $recorde )</div>";
				}

				else if($voltas == 3){
					echo "<div id='terceiro' style='font-size: 14px; font-family: Copperplate Gothic; color: rgb(204, 153, 0)'>$voltas - $nome --- ( $recorde )</div>";
				}

				else{
					echo "<div id='outros' style='font-size: 12px; font-family: Copperplate Gothic; color: rgb(150, 150, 150)'>$voltas - $nome --- ( $recorde )</div>";
				}

				if($voltas >= 40){
					break;
				}
			}

			mysqli_close($conexao);

		?>
		</div>

		<div style="float: right; color: white; border: 0px solid yellow; width: 30%; height: 98%; margin: 5px;">

		<div id='titulo' style='font-size: 40px; font-family: Copperplate Gothic; text-decoration: underline;'>Dicas</div><br>
			<div style="font-size: 16px; font-family: Copperplate Gothic; color: rgb(255, 255, 255)">
				--- Mover John ---<br>
				Setas ou 'A' e 'D'<br><br>
				--- Ligar/Desligar Música ---<br>
				'M'<br><br>
				--- Ligar/<font color="red">Desligar</font> Multiplayer ---<br>
				'HOME'<br><br>

				<br><br><br>
				--- Itens ---<br>
				<img src="images/coin4.png"> 100 Pontos<br>
				<img src="images/coin2.png"> 250 Pontos<br>
				<img src="images/coin1.png"> 500 Pontos<br>
				<img src="images/coin3.png"> 1000 Pontos<br>
				<img src="images/iconeSaveBar.png"> 100 Pontos + Vida Extra<br>
			</div>
			
		</div>

	</body>

</html>