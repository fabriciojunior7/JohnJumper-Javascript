var tempo = 0;
var dia = true;

var sol = new Sol(400);
var lua = new Lua(400);

var passo = 0.5;

function ciclos(){
	if(dia == true){
		sol.x -= passo;
		if(sol.x > 162){
			sol.y -= 0.1;
			ceuB += 0.5;
			ceuG += 0.5;
		}
		else if(sol.x < 162){
			sol.y += 0.1;
			ceuB -= 0.5;
			ceuG -= 0.5;
		}
		if(sol.x < -sol.largura){
			sol.reset();
			dia = false;
		}
	}
	if(dia == false){
		lua.x -= passo;
		if(lua.x > 162){
			lua.y -= 0.1;
			ceuB -= 0.5;
			ceuG -= 0.5;
		}
		else if(lua.x < 162){
			lua.y += 0.1;
			ceuB += 0.5;
			ceuG += 0.5;
		}
		if(lua.x < -lua.largura){
			lua.reset();
			dia = true;
		}
	}

	for(var i = 0; i < nuvens.length; i++){
			nuvens[i].mover();
		}
}

function horario(){
	if(tempo < 100){
		dia = true;
		lua.x = largura;
	}
	else{
		dia = false;
		sol.x = largura;
	}
	if(tempo > 200){
		tempo = 0;
	}
	tempo++;
}


function Sol(largura){
	//Atributos
	Entidade.call(this, largura, 50, 75, 75);

	//Metodos
	this.desenhar = function(){
		image(solImage, this.x, this.y);
	}

	this.reset = function(){
		this.x = 400;
		this.y = 50;
	}
}

function Lua(largura){
	//Atributos
	Entidade.call(this, largura, 50, 75, 75);

	//Metodos
	this.desenhar = function(){
		image(luaImage, this.x, this.y);
	}

	this.reset = function(){
		this.x = 400;
		this.y = 50;
		this.tipo = round(random(1, 8));
	}
}

function Nuvem(largura){
	//Atributos
	Entidade.call(this, random(0, largura), random(0, 350), 74, 50);
	this.tipo = round(random(1,15));
	this.larguraTela = largura;
	this.velocidadeX = random(0.1, 1.5);

	//Metodos
	this.desenhar = function(){
		if(this.tipo == 1 || this.tipo == 2){
			image(nuvem1Image, this.x, this.y);
		}
		else if(this.tipo == 3 || this.tipo == 4){
			image(nuvem2Image, this.x, this.y);
		}
		else if(this.tipo == 5 || this.tipo == 6){
			image(nuvem3Image, this.x, this.y);
		}
		else if(this.tipo == 7 || this.tipo == 8){
			image(nuvem4Image, this.x, this.y);
		}
		else if(this.tipo == 9  || this.tipo == 10){
			image(nuvem5Image, this.x, this.y);
		}
		else if(this.tipo == 11){
			image(nuvem6Image, this.x, this.y);
		}
		else if(this.tipo == 12 || this.tipo == 13){
			image(nuvem7Image, this.x, this.y);
		}
		else{
			image(nuvem4Image, this.x, this.y);
		}

		if(this.x < -this.largura){
			this.reset(this.larguraTela);
			this.tipo = round(random(1,14));
		}
	}

	this.mover = function(){
		this.x -= this.velocidadeX;
	}

	this.reset = function(largura){
		this.x = largura;
		this.y = random(0, 350);
		this.velocidadeX = random(0.1, 1.5);
	}
}

function Estrela(largura, altura){
	//Atributos
	Entidade.call(this, random(0, largura), random(0, altura), round(random(2,4)), round(random(2,4)));
	this.r = random(200, 255);
	this.g = random(200, 255);
	this.alpha = 255;

	//Metodos
	this.desenhar = function(){
		noStroke();
		if(ceuB > 0){
			fill(this.r, this.g, random(0, 200), random(0, 255)/(ceuB/20));
		}
		else{
			fill(this.r, this.g, random(0, 200), random(0, 255));
		}
		ellipse(this.x, this.y, this.largura, this.altura);
	}

	this.reset = function(){
		this.x = random(0, largura);
		this.y = random(0, altura);
		this.r = random(200, 255);
		this.g = random(200, 255);
		this.largura = round(random(2,4));
		this.altura = round(random(2,4));
	}
}

