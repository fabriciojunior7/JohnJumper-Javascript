var largura, altura;
var fps = 60;

var john1, john2, johnImage1, johnImage2;
var plataformas = [];
var numPlataformas = 15;
var velocidadeJogo = 2, larguraPlataforma = 75;
var velocidadeAtual = 2;

var score1 = 0;
var score2 = 0;

var vitorias1 = 0;
var vitorias2 = 0;

var ceuR = 0, ceuG = 105, ceuB = 155;
var gameOver = true;

var nuvens = [];
var numNuvens = 0;

var estrelas = [];
var numEstrelas = 0;

var savebar1, savebar2;
var hitBar1 = false, hitBar2 = false;

var saveBarIcone;
var hitBarIcone1 = false, hitBarIcone2 = false;

var coin1, coin2, coin3, coin4;
var hitCoin11 = false, hitCoin12 = false, hitCoin13 = false, hitCoin14 = false;
var hitCoin21 = false, hitCoin22 = false, hitCoin23 = false, hitCoin24 = false;
var coin1Timer, coin2Timer, coin3Timer, coin4Timer;

var start = 300;

var logoR = 0, logoG = 0;

var mensagem = "";

function preload(){
	//Imagens
	johnImage1 = loadImage("images/player1.png");
	johnImage2 = loadImage("images/player2.png");
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

	savebar1 = new SaveBar(largura, altura, 1);
	savebar2 = new SaveBar(largura, altura, 2);
	saveBarIcone = new Icone(largura, altura);

	john1 = new Player((largura/2)-30, 0, 16, 27, johnImage1);
	john2 = new Player((largura/2)+30, 0, 16, 27, johnImage2);

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
			score1 += velocidadeJogo;
			score2+= velocidadeJogo;

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

		hit1 = false;
		hit2 = false;

		for(var i = 0; i < plataformas.length; i++){
			plataformas[i].descer(velocidadeJogo, largura, altura);
			plataformas[i].desenhar();
			if(hit1 == false && john1.velocidadeY > -3){
				hit1 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, plataformas[i].x, plataformas[i].y, plataformas[i].largura, plataformas[i].altura);
				if(hit1 == true){
					if(plataformas[i].y < 10){
						hit = false;
					}
				}
			}
			if(hit2 == false && john2.velocidadeY > -3){
				hit2 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, plataformas[i].x, plataformas[i].y, plataformas[i].largura, plataformas[i].altura);
				if(hit2 == true){
					if(plataformas[i].y < 10){
						hit2 = false;
					}
				}
			}
		}

		if(hit1 == true){
			john1.pular();
		}
		else if(hit1 == false){
			john1.cair();
		}

		if(hit2 == true){
			john2.pular();
		}
		else if(hit2 == false){
			john2.cair();
		}
		
		if(john1.y <= 0){
			if(velocidadeJogo < velocidadeAtual*4) {
				velocidadeJogo += 1;
				if(john1.velocidadeY < 0){
					john1.velocidadeY /= 2;
				}
			}
		}
		else{
			if(velocidadeJogo > velocidadeAtual){
				velocidadeJogo -= 0.5;
			}
		}
		
		if(john2.y <= 0){
			if(velocidadeJogo < velocidadeAtual*4) {
				velocidadeJogo += 1;
				if(john2.velocidadeY < 0){
					john2.velocidadeY /= 2;
				}
			}
		}
		else{
			if(velocidadeJogo > velocidadeAtual){
				velocidadeJogo -= 0.5;
			}
		}

		if(coin1.ativado == true){
			hitCoin11 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, coin1.x, coin1.y, coin1.largura, coin1.altura);
			hitCoin21 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, coin1.x, coin1.y, coin1.largura, coin1.altura);
			if(hitCoin11 == true){
				coin1.desativar();
				score1 += 500;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			else if(hitCoin21 == true){
				coin1.desativar();
				score2 += 500;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			coin1.descer(velocidadeJogo);
			coin1.desenhar();
		}

		if(coin2.ativado == true){
			hitCoin12 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, coin2.x, coin2.y, coin2.largura, coin2.altura);
			hitCoin22 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, coin2.x, coin2.y, coin2.largura, coin2.altura);
			if(hitCoin12 == true){
				coin2.desativar();
				score1 += 250;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			else if(hitCoin22 == true){
				coin2.desativar();
				score2 += 250;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			coin2.descer(velocidadeJogo);
			coin2.desenhar();
		}

		if(coin3.ativado == true){
			hitCoin13 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, coin3.x, coin3.y, coin3.largura, coin3.altura);
			hitCoin23 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, coin3.x, coin3.y, coin3.largura, coin3.altura);
			if(hitCoin13 == true){
				coin3.desativar();
				score1 += 1000;
				coin1000Sound.setVolume(1.0);
				coin1000Sound.play();
			}
			else if(hitCoin23 == true){
				coin3.desativar();
				score2 += 1000;
				coin1000Sound.setVolume(1.0);
				coin1000Sound.play();
			}
			coin3.descer(velocidadeJogo);
			coin3.desenhar();
		}

		if(coin4.ativado == true){
			hitCoin14 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, coin4.x, coin4.y, coin4.largura, coin4.altura);
			hitCoin24 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, coin4.x, coin4.y, coin4.largura, coin4.altura);
			if(hitCoin14 == true){
				coin4.desativar();
				score1 += 100;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			else if(hitCoin24 == true){
				coin4.desativar();
				score2 += 100;
				coinSound.setVolume(0.5);
				coinSound.play();
			}
			coin4.descer(velocidadeJogo);
			coin4.desenhar();
		}

		if(saveBarIcone.ativado == true){
			hitBarIcone1 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, saveBarIcone.x, saveBarIcone.y, saveBarIcone.largura, saveBarIcone.altura);
			hitBarIcone2 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, saveBarIcone.x, saveBarIcone.y, saveBarIcone.largura, saveBarIcone.altura);
			if(hitBarIcone1 == true){
				savebar1.ativar();
				saveBarIcone.desativar();
				score1 += 100;
				penteSound.setVolume(0.5);
				penteSound.play();
			}
			if(hitBarIcone2 == true){
				savebar2.ativar();
				saveBarIcone.desativar();
				score2 += 100;
				penteSound.setVolume(0.5);
				penteSound.play();
			}
			saveBarIcone.descer(velocidadeJogo);
			saveBarIcone.desenhar();
		}

		if(savebar1.ativado == true){
			hitBar1 = collideRectRect(john1.x, john1.y, john1.largura, john1.altura, savebar1.x, savebar1.y, savebar1.largura, savebar1.altura);
			if(hitBar1 == true){
				john1.velocidadeY = -30;
				savebar1.desativar();
				saveBarSound.setVolume(0.5);
				saveBarSound.play();
			}
			savebar1.desenhar();
		}

		if(savebar2.ativado == true){
			hitBar2 = collideRectRect(john2.x, john2.y, john2.largura, john2.altura, savebar2.x, savebar2.y, savebar2.largura, savebar2.altura);
			if(hitBar2 == true){
				john2.velocidadeY = -30;
				savebar2.desativar();
				saveBarSound.setVolume(0.5);
				saveBarSound.play();
			}
			savebar2.desenhar();
		}

		
		john1.desenhar(largura, altura);
		john2.desenhar(largura, altura);

		//Score
		fill(0, 0, 255);
		stroke(255);
		textSize(18);
		text(round(score1), 5, 18);
		//text("33570", 5, 18);
		text(vitorias1, 18, 34);

		fill(255, 0, 0);
		text(round(score2), 350, 18);
		//text("32573", 350, 18);
		text(vitorias2, 363, 34);
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
		text("Novo Jogo - 'ENTER'", 90, altura/2);

		if(mensagem == "Azul Venceu!"){
			fill(0, 0, 255);
			stroke(255);
			textSize(32);
			text(mensagem, 110, altura/2+50);
		}
		else if(mensagem == "Vermelho Venceu!"){
			fill(255, 0, 0);
			stroke(255);
			textSize(32);
			text(mensagem, 76, altura/2+50);
		}
		else{
			fill(255);
			stroke(0);
			textSize(32);
			text(mensagem, 145, altura/2+50);
		}
	}
}

function keyPressed(){
	touch = false;
	if(keyCode == 37){
		john2.ed[0] = true;
	}
	if(keyCode == 65){
		john1.ed[0] = true;
	}

	if(keyCode == 39){
		john2.ed[1] = true;
	}
	if(keyCode == 68){
		john1.ed[1] = true;
	}

	if((keyCode == 32 || keyCode == 13) && gameOver == true){
		iniciar();
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
		john2.ed[0] = false;
	}
	if(keyCode == 65){
		john1.ed[0] = false;
	}

	if(keyCode == 39){
		john2.ed[1] = false;
	}
	if(keyCode == 68){
		john1.ed[1] = false;
	}

	if(keyCode == 36){
		multiplayer();
	}
}

function iniciar(){
	gameOver = false;
	score1 = 0;
	score2 = 0;
	velocidadeAtual = 2;
	velocidadeJogo = 2;
	john1.reset(largura);
	john2.reset(largura);
	savebar1.desativar();
	savebar2.desativar();
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

	if(john1.morreu == true && john2.morreu == true){
		score2 -= 1000;
		vitorias2 -= 1;
		if(score2 < 0){
			score2 = 0;
		}
		mensagem = "Empate!";
	}
	else if(john1.morreu == true && john2.morreu == false){
		score1 -= 1000;
		if(score1 < 0){
			score1 = 0;
		}
	}
	else if(john2.morreu == true && john1.morreu == false){
		score2 -= 1000;
		if(score2 < 0){
			score2 = 0;
		}
	}
	
	if(score1 > score2){
		vitorias1 += 1;
		mensagem = "Azul Venceu!";
	}
	else if(score2 > score1){
		vitorias2 += 1;
		mensagem = "Vermelho Venceu!";
	}
	else{
		print("empate");
	}
	
}

function loaded(){
	music1.setVolume(0.5);
	music1.loop();
}

function multiplayer(){
	window.location = "jumper.php";
}



