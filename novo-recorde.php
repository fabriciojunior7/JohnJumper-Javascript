<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<title>John Jumper (Novo Recorde)</title>

	</head>

	<body style="margin: 0px; background-color: rgb(0, 0, 0); color: white; font-size: 18px; font-family: Century Gothic;">

		<style type="text/css">
			
		#recorde{
			position: relative;
			font-size: 50px;
		}

		#nome{
			position: relative;
			width: 80%;
			height: 60px;
			border-radius: 20px;

			text-align: center;
			font-size: 40px;
		}

		#botao{
			position: relative;
			width: 80%;
			height: 60px;
			border-radius: 20px;
			font-size: 40px;
		}


		</style>

		<center>

			<?php

				$novoRecorde = $_POST['novo-recorde'];

				if($novoRecorde == null){
					header('Location: jumper.php');
				}

				else{
					echo "<p id='recorde'>Novo Recorde:<br>$novoRecorde</p>";
					echo "<form method='post' action='registrar.php'>";
					echo "	<input type='hidden' value=$novoRecorde name='recorde'>";
					echo "	<input type='text' name='nome' id='nome' maxlength='40' placeholder='Nome e Sobrenome' autofocus><br><br>";
					echo "	<input type='submit' value='Enviar!' id='botao'>";
					echo "</form>";
				}
			
			?>

		</center>

	</body>

</html>