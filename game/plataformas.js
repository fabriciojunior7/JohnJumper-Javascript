function Plataforma(largura, altura){
	//Atributos
	Entidade.call(this, random(0, largura-75), -10, 75, 10);
	this.tipo = round(random(1,3));

	//Metodos
	this.desenhar = function(){
		if(this.tipo == 1){
			image(pente1Image, this.x, this.y);
		}
		else if(this.tipo == 2){
			image(pente2Image, this.x, this.y);
		}
		else if(this.tipo == 3){
			image(pente3Image, this.x, this.y);
		}
	}

	this.descer = function(velocidade, largura, altura){
		if(this.y > altura+50){
			this.reset();
		}
		else{
			this.y += velocidade;
		}
	}

	this.reset = function(){
		this.x = random(0, largura-75);
		this.y = -10;
		this.tipo = round(random(1,3));
	}
}