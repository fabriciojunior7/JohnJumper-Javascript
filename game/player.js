function Player(x, y, largura, altura){
	//Atributos
	Entidade.call(this, x, y, largura, altura);
	this.gravidade = 0.5;
	this.velocidadeY = 0;
	this.velocidadeMaxX = 10;
	this.velocidadeMaxY = 20;
	this.ed = [false, false];

	//Metodos
	this.desenhar = function(largura, altura){
		this.mover(largura);
		image(johnImage, this.x, this.y);

		if(this.y > altura){
			perdeu();
		}
	}

	this.mover = function(largura){
		if(this.ed[0] == true && this.ed[1] == false && this.x > 3){
			this.x -= this.velocidadeMaxX;
		}
		else if(this.ed[0] == false && this.ed[1] == true && this.x < largura-40){
			this.x += this.velocidadeMaxX;
		}
	}

	this.cair = function(){
		if(this.velocidadeY < this.velocidadeMaxY){
			this.velocidadeY += this.gravidade;
		}

		this.y += this.velocidadeY;
	}

	this.pular = function(){
		this.velocidadeY = -10;
	}

	this.reset = function(largura){
		this.x = (largura/2)-8;
		this.y = 0;
		this.velocidadeY = 0;
	}
}