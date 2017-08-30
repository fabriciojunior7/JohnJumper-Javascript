function SaveBar(largura, altura){
	//Atributos
	Entidade.call(this, -5, altura-20, largura+10, 10);
	this.ativado = false;
	this.r = 255;
	this.g = 0;
	this.b = 0;

	//Metodos
	this.desenhar  = function(){
		noStroke();
		fill(this.r, this.g, this.b);
		rect(this.x, this.y, this.largura, this.altura);
		if(frameCount % 15 == 0){
			this.piscar();
		}
	}

	this.piscar = function(){
		this.r = random(100, 255);
		this.g = random(100, 255);
		this.b = random(100, 255);
	}

	this.ativar = function(){
		this.ativado = true;
	}

	this.desativar = function(){
		this.ativado = false;
	}
}

