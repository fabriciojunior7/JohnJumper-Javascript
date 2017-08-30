function Icone(largura, altura){
	//Atributos
	Entidade.call(this, random(0, largura-35), -35, 35, 32);
	this.ativado = false;

	//Metodos
	this.desenhar = function(){
		image(iconeSaveBar, this.x, this.y);
	}

	this.descer = function(y){
		this.y += y
		if(this.y > altura){
			this.desativar();
		}
	}

	this.ativar = function(){
		this.ativado = true;
	}

	this.desativar = function(){
		this.ativado = false;
		this.x = random(0, largura-35);
		this.y = -35;
	}
}

function Coin(tipo){
	//Atributos
	Icone.call(this, largura, altura);
	this.tipo = tipo;

	//Metodos
	this.desenhar = function(){
		if(this.tipo == 1){
			image(coin1Image, this.x, this.y);
		}

		else if(this.tipo == 2){
			image(coin2Image, this.x, this.y);
		}

		else if(this.tipo == 3){
			image(coin3Image, this.x, this.y);
		}

		else if(this.tipo == 4){
			image(coin4Image, this.x, this.y);
		}
	}


}