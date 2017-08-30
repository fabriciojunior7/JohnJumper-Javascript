var largura, altura;
var fps = 60;

var john, johnImage;
var plataformas = [];
var numPlataformas = 15;
var velocidadeJogo = 2, larguraPlataforma = 75;
var velocidadeAtual = 2;
var score = 0;

var ceuR = 0, ceuG = 105, ceuB = 155;
var gameOver = true;
var touch = false;

var nuvens = [];
var numNuvens = 0;

var estrelas = [];
var numEstrelas = 0;

var savebar;
var hitBar = false;

var saveBarIcone;
var hitBarIcone = false;

var coin1, coin2, coin3, coin4;
var hitCoin1 = false, hitCoin2 = false, hitCoin3 = false, hitCoin4 = false;
var coin1Timer, coin2Timer, coin3Timer, coin4Timer;

var start = 300;

var logoR = 0, logoG = 0;

function preload(){
	//Imagens
	johnImage = loadImage("images/p1.png");
	pente1Image = loadImage("images/pente1.png");
	pente2Image = loadImage("images/pente2.png");
	pente3Image = loadImage("images/pente3.png");
	solImage = loadImage("images/sol.png");
	luaImage = loadImage("images/lua.png");
	nuvem1Image = loadImage("images/nuvem1.png");
	nuvem2Image = loadImage("images/nuvem2.png");
	nuvem3Image = loadImage("images/nuvem3.png");
	nuvem4Image = loadImage("images/nuvem4.png");
	nuvem5Image = loadImage("images/nuvem5.png");
	nuvem6Image = loadImage("images/nuvem6.png");
	nuvem7Image = loadImage("images/nuvem7.png");
	setaEsquerdaImage = loadImage("images/setaEsquerda.png");
	setaDireitaImage = loadImage("images/setaDireita.png");
	iconeSaveBar = loadImage("images/iconeSaveBar.png");
	coin1Image = loadImage("images/coin1.png");
	coin2Image = loadImage("images/coin2.png");
	coin3Image = loadImage("images/coin3.png");
	coin4Image = loadImage("images/coin4.png");
	logo = loadImage("images/logo1.png");

	//Sons
	gameOverSound = loadSound("sounds/fall1.mp3");
	coinSound = loadSound("sounds/coin4.mp3");
	coin1000Sound = loadSound("sounds/coin1000.mp3");
	penteSound = loadSound("sounds/pente1.mp3");
	saveBarSound = loadSound("sounds/saveBar1.mp3");
	startSound = loadSound("sounds/juniorGames1.mp3");
	
}

function setup(){
	frameRate(fps);

	music1 = loadSound("sounds/music1.mp3", loaded);
	music1.setVolume(0.2);

	largura = 400;
	altura = 600;
	tela = createCanvas(largura, altura);
	tela.position((windowWidth/2)-200, (altura/2) - ((altura-50)/2));

	savebar = new SaveBar(largura, altura);
	saveBarIcone = new Icone(largura, altura);

	john = new Player((largura/2)-8, 0, 16, 27);
	for(var i=0; i<numPlataformas; i++){
		plataformas.push(new Plataforma(largura, altura));
		plataformas[i].y = altura - (100*i);
	}

	numNuvens = round(random(3, 50));
	for(var i=0; i<numNuvens; i++){
		nuvens.push(new Nuvem(largura));
	}

	numEstrelas = round(random(50, 200));
	for(var i=0; i<numEstrelas; i++){
		estrelas.push(new Estrela(largura, altura));
	}

	coin1 = new Coin(1);
	coin2 = new Coin(2);
	coin3 = new Coin(3);
	coin4 = new Coin(4);

	coin1Timer = round(random(1400, 2000));
	coin2Timer = round(random(700, 1300));
	coin3Timer = round(random(3800, 5600));
	coin4Timer = round(random(300, 600));
}

function draw(){

	music1.setVolume(0.2);

	if(frameCount < start){
		if(startSound.isPlaying() == false && logoR == 0){
			startSound.play();
		}
		//fill(logoR, logoG, 0);
		//noStroke();
		//textSize(28);
		//text("Junior Games!", 75, altura/2+30)
		logoR += 0.5;
		logoG += 0.5;
		scale(0.6);
		image(logo, 35, altura/2);
	}

	if(gameOver == false && frameCount > start){
		background(ceuR, ceuG, ceuB);

		if(frameCount % 5 == 0){
			ciclos();
			score += velocidadeJogo;

			if(velocidadeAtual > velocidadeJogo){
				velocidadeJogo = velocidadeAtual;
			}
		}

		if(ceuB < 200){
			for(var i=0; i<estrelas.length; i++){
				estrelas[i].desenhar();
			}
		}
		sol.desenhar(largura);
		lua.desenhar(largura);
		for(var i = 0; i < nuvens.length; i++){
			nuvens[i].desenhar();
		}
		
		if(frameCount % 180 == 0){
			velocidadeAtual += 0.1;
		}

		//Pente
		if(frameCount % 1800 == 0){
			saveBarIcone.ativar();
		}

		//Moedas
		if(frameCount % coin4Timer == 0){
			coin4.ativar();
			coin4Timer = round(random(300, 600));
		}

		if(frameCount % coin2Timer == 0){
			coin2.ativar();
			coin2Timer = round(random(600, 1200));
		}

		if(frameCount % coin1Timer == 0){
			coin1.ativar();
			coin1Timer = round(random(1200, 1800));
		}

		if(frameCount % coin3Timer == 0){
			coin3.ativar();
			coin3Timer = round(random(3600, 5400));
		}

		hit = false;

		for(var i = 0; i < plataformas.length; i++){
			plataformas[i].descer(velocidadeJogo, largura, altura);
			plataformas[i].desenhar();
			if(hit == false && john.velocidadeY > -3){
				hit = collideRectRect(john.x, john.y, john.largura, john.altura, plataformas[i].x, plataformas[i].y, plataformas[i].largura, plataformas[i].altura);
				if(hit == true){
					if(plataformas[i].y < 10){
						hit = false;
					}
				}
			}
		}

		if(hit == true){
			john.pular();
		}
		else if(hit == false){
			john.cair();
		}
		
		if(john.y <= 0){
			if(velocidadeJogo < velocidadeAtual*4) {
				velocidadeJogo += 1;
				if(john.velocidadeY < 0){
					john.velocidadeY /= 2;
				}
			}
		}
		else{
			if(velocidadeJogo > velocidadeAtual){
				velocidadeJogo -= 0.5;
			}
		}

		if(coin1.ativado == true){
			hitCoin1 = collideRectRect(john.x, john.y, john.largura, john.altura, coin1.x, coin1.y, coin1.largura, coin1.altura);
			if(hitCoin1 == true){
				coin1.desativar();
				score += 500;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			coin1.descer(velocidadeJogo);
			coin1.desenhar();
		}

		if(coin2.ativado == true){
			hitCoin2 = collideRectRect(john.x, john.y, john.largura, john.altura, coin2.x, coin2.y, coin2.largura, coin2.altura);
			if(hitCoin2 == true){
				coin2.desativar();
				score += 250;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			coin2.descer(velocidadeJogo);
			coin2.desenhar();
		}

		if(coin3.ativado == true){
			hitCoin3 = collideRectRect(john.x, john.y, john.largura, john.altura, coin3.x, coin3.y, coin3.largura, coin3.altura);
			if(hitCoin3 == true){
				coin3.desativar();
				score += 1000;
				coin1000Sound.setVolume(1.0);
				coin1000Sound.play();
			}
			coin3.descer(velocidadeJogo);
			coin3.desenhar();
		}

		if(coin4.ativado == true){
			hitCoin4 = collideRectRect(john.x, john.y, john.largura, john.altura, coin4.x, coin4.y, coin4.largura, coin4.altura);
			if(hitCoin4 == true){
				coin4.desativar();
				score += 100;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			coin4.descer(velocidadeJogo);
			coin4.desenhar();
		}

		if(saveBarIcone.ativado == true){
			hitBarIcone = collideRectRect(john.x, john.y, john.largura, john.altura, saveBarIcone.x, saveBarIcone.y, saveBarIcone.largura, saveBarIcone.altura);
			if(hitBarIcone == true){
				savebar.ativar();
				saveBarIcone.desativar();
				score += 100;
				penteSound.setVolume(0.5);
				penteSound.play();
			}
			saveBarIcone.descer(velocidadeJogo);
			saveBarIcone.desenhar();
		}

		if(savebar.ativado == true){
			hitBar = collideRectRect(john.x, john.y, john.largura, john.altura, savebar.x, savebar.y, savebar.largura, savebar.altura);
			if(hitBar == true){
				john.velocidadeY = -30;
				savebar.desativar();
				saveBarSound.setVolume(0.5);
				saveBarSound.play();
			}
			savebar.desenhar();
		}

		
		john.desenhar(largura, altura);

		//Score
		fill(0, 0, 0);
		stroke(255);
		textSize(18);
		text(round(score), 5, 18);
		//Fabricio Junior
		fill(255, 255, 0);
		noStroke();
		textSize(12);
		text("Fabricio Junior", 5, altura-5);

		if(touch == true){
			image(setaEsquerdaImage, 5, 528);
			image(setaDireitaImage, 245, 528);
		}
	}

	else if(gameOver == true && frameCount > start){
		fill(255, 255, 255);
		stroke(0);
		textSize(24);
		text("Novo Jogo - 'ENTER'", 90, altura/2+30);
		if(score >= 100){
			text("Para Enviar Recorde Aperte - 'R'", 25, altura/2-30);
		}
	}
}

function keyPressed(){
	touch = false;
	if(keyCode == 65 || keyCode == 37){
		john.ed[0] = true;
	}
	if(keyCode == 68 || keyCode == 39){
		john.ed[1] = true;
	}
	if((keyCode == 87 || keyCode == 38) && hit == true){
		john.pular();
	}

	if((keyCode == 32 || keyCode == 13) && gameOver == true){
		iniciar();
	}

	if(keyCode == 82 && gameOver == true){
		enviarRecorde();
	}

	if(keyCode == 77){
		if(music1.isPlaying()){
			music1.setVolume(0.3);
			music1.pause();
		}
		else{
			music1.setVolume(0.3);
			music1.loop();
		}
	}
}

function keyReleased(){
	if(keyCode == 65 || keyCode == 37){
		john.ed[0] = false;
	}
	if(keyCode == 68 || keyCode == 39){
		john.ed[1] = false;
	}

	if(keyCode == 36){
		multiplayer();
	}
}

function iniciar(){
	gameOver = false;
	score = 0;
	velocidadeAtual = 2;
	velocidadeJogo = 2;
	john.reset(largura);
	savebar.desativar();
	coin1.desativar();
	coin2.desativar();
	coin3.desativar();
	coin4.desativar();
	coin1Timer = round(random(1200, 1800));
	coin2Timer = round(random(600, 1200));
	coin3Timer = round(random(3600, 5400));
	coin4Timer = round(random(300, 600));
	saveBarIcone.desativar();
	frameCount = 0;

	for(var i = 0; i < plataformas.length; i++){
		plataformas[i].y = altura - (100*i);
	}

	nuvens = [];
	numNuvens = round(random(3, 50));
	for(var i=0; i<numNuvens; i++){
		nuvens.push(new Nuvem(largura));
	}

	estrelas = [];
	numEstrelas = round(random(50, 200));
	for(var i=0; i<numEstrelas; i++){
		estrelas.push(new Estrela(largura, altura));
	}
}

function perdeu(){
	gameOver = true;
	gameOverSound.setVolume(0.5);
	gameOverSound.play(); 
}

function touchStarted(){
	touch = true;

	if(gameOver == false){
		if(mousePressed && mouseX < largura/2){
			john.ed[0] = true;
		}
		if(mousePressed && mouseX >= largura/2){
			john.ed[1] = true;
		}
	}
	else{
		iniciar();
	}
}

function touchEnded(){
	if(mousePressed && mouseX < largura/2){
		john.ed[0] = false;
	}
	if(mousePressed && mouseX >= largura/2){
		john.ed[1] = false;
	}
}


function enviarRecorde(){
	input = document.getElementById("novo-recorde");
	input.value = round(score);
	document.forms["formulario"].submit();
}

function loaded(){
	music1.setVolume(0.5);
	music1.loop();
}

function multiplayer(){
	window.location = "jumper2.php";
}



