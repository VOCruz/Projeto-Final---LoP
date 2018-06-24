var jogadorX, jogadorY; //posição do jogador
var tamJogX, tamJogY; //dimensões do jogador

var projetioX, projetioY; //posição do projétio
var tamProX, tamProY; //dimensões do projétio

var movimentoJ; //velocidade de movimento do jogador
var movimentoP; //velocidade de movimento do projétio

var disparar = true; //condição para o disparo

var inimigoX = []; //vetor para a posição dos inimigos
var inimigoY = []; //vetor para a posição dos inimigos
var contI = 4; //quantidade de inimigos
var movimentoI; //velocidade de movimento dos inimigos
var tamanhoI = []; //tamanho dos inimigos
var vidaI; //quantidade de vida dos inimigos
var acertou = [];

var vidaJ; //vida do jogador

var pontuação; //pontuação do jogo

var bonusVidaX, bonusVidaY; //bônus para aumuntar a vida do jogador
var tamBonVidaX, tamBonVidaY; //dimensões do bônus de vida
var movimentoBVida; //velocidade de movimento do bônus

var bonusVelPX, bonusVelPY; //bônus para aumuntar a velocidade do projétio
var tamBonVelPX, tamBonVelPY; //dimensões do bônus da velocidade do projétio
var movimentoBVelP; //velocidade de movimento do bônus da velocidade do projétio

var tempo; //contador de tempo

var fase; //contador para as fases

var tamFase1 = [], tamFase3 = [], tamFase5 = [];

//Chefe
var ChefeX, ChefeY; //posição do chefe
var tamChefeX, tamChefeY; //tamanho do chefe
var movimentoChefe;
var movChefeX;
var movChefeY;
var tiroChefeX, tiroChefeY;
var tamTiroCX, tamTiroCY;
var movTiroChefe;
var acertouChefe;

//vida do chefe
var VidaChefe;
var barraX, barraY; //posição
var compBarraX, compBarraY;
var r, g, b;
var taxaDimBarra;
var taxaDimCorB;

var desenharChefe = true;
//Chefe

var Inicio = true;
var Jogo = false;
var Chefe = false;
var Vitoria = false;
var Fim = false;

var resNormal = true;

var imgJ, imgI = [], fundo, imgBP, imgBV;

//-----------------------------------------------------------------------------
var explosãoX, explosãoY;
var explosão = [];
var nomeAnim = "Imagens/explosion"
var quantImagem = 10;
var animação = 0;
var velAnim = 8;
var tempoAnim = 0;
//-----------------------------------------------------------------------------

var tempoSair;
var tempoEntrar;

function preload() {
	fundo = loadImage("Imagens/Space.png");

	imgJ = loadImage("Imagens/jogador.png");

	for(i=0; i<contI; i++) {	
		imgI[i] = loadImage("Imagens/inimigo" + i + ".png");
	}

	imgChefe = loadImage("Imagens/chefe.png");

	for(i=0; i<quantImagem; i++) {
		explosão[i] = loadImage(nomeAnim + i + ".png");
	}

	imgBP = loadImage("Imagens/raio.png");
	imgBV = loadImage("Imagens/coracao.png")


	//som = loadSound("Som/airship.ogg");
}

function setup() {
	createCanvas(650, windowHeight); //dimensões do cenário

	//música
	//som.setVolume(0.1);
	//som.play();

	jogadorX = width/2; //posição inicial do jogador em X
	jogadorY = windowHeight; //posição inicial do jogador em Y

	tamJogX = 50; //dimensões do jogador em X
	tamJogY = 65; //dimensões do jogador em Y

	tamProX = 10; //dimensões do projétio em X
	tamProY = 10; //dimensões do projétio em Y

	movimentoJ = 5; //velocidade de movimento do jogador
	movimentoP = 6; //velocidade de movimento do projétio
	movimentoI = 2; //velocidade de movimento dos inimigos

	//contI = 4; //quantidade de inimigos
	vidaI = 1; //quantidade de vida dos inimigos

	vidaJ = 5; //quantidade de vidas do jogador

	pontuação = 0; //pontuação inicial do jogo

	for(i=0; i<contI; i++) {
		tamFase1[i] = random(40, 50);
		tamFase3[i] = random(50, 60);
		tamFase5[i] = random(60, 70);
	}
	
	//vetor para a posição inicial dos inimigos
	for(i=0; i<contI; i++) {
		inimigoX[i] = random(0, width - (tamanhoI[i]) - 70); //posição inicial aleatória
		inimigoY[i] = -random(windowHeight); //posição inicial aleatória
		tamanhoI[i] = tamFase1[i]; //tamanho aleatório
		acertou[i] = 0;
	}

	bonusVidaX = random(50, width-50); //posição inicial aleatória
	bonusVidaY = -random(4000, 5000); //posição inicial aleatória
	tamBonVidaX = 25; //dimensões do bônus de vida
	tamBonVidaY = 25; //dimensões do bônus de vida
	movimentoBVida = 2; //velocidade de movimento do bônus

	bonusVelPX = random(50, width-50); //posição inicial aleatória
	bonusVelPY = -random(2000, 3000); //posição inicial aleatória
	tamBonVelPX = 20; //dimensões do bônus da velocidade do projétio
	tamBonVelPY = 30; //dimensões do bônus da velocidade do projétio
	movimentoBVelP = 2; //velocidade de movimento do bônus

	tempo = 0; //contador inicial de tempo

	fase = 1; //fase inicial

	//Chefe-----------------------------------------------------------------------------------
	ChefeX = width/2;
	ChefeY = (windowHeight-windowHeight) - tamChefeY ;
	tamChefeX = 200;
	tamChefeY = 200;
	movimentoChefe = 2;
	tamTiroCX = 10;
	tamTiroCY = 10;
	movTiroChefe = 5;
	acertouChefe = 0;

	VidaChefe = 10;
	compBarraX = tamChefeX;
	compBarraY = 5;
	taxaDimBarra = (compBarraX/VidaChefe);
	taxaDimCorB = (VidaChefe - 1);
	r = 0;
	g = 255;
	b = 0;
	
	tempoSair = 0;
	tempoEntrar = 0;
}

function TelaInicial() {
	console.log("estou na tela inicial");
	background(fundo);

	textSize(30);
	fill(255);
	text("Precione ENTER para começar", 100 ,windowHeight/2);

	if(keyIsDown(13)) {
		Inicio = false;
		Jogo = true;
		Chefe = false;
		Vitoria = false;
		Fim = false;
	}
}

function TelaJogo() {
	console.log("estou na tela de jogo");
	//console.log("altura " + windowHeight);
	background(fundo); //plano de fundo

	tempo++;

	//movimentação do jogador com o teclado
	if(keyIsDown(37)) {
		jogadorX = jogadorX - movimentoJ; //esquerda
	}
	if(keyIsDown(39)) {
		jogadorX = jogadorX + movimentoJ; //direita
	}
	if(keyIsDown(38)) {
		jogadorY = jogadorY - movimentoJ; //cima
	}
	if(keyIsDown(40)) {
		jogadorY = jogadorY + movimentoJ; //baixo
	}

	//o jogador não ultrapassa o cenário
	if(jogadorX-tamJogX/3 <= width-width) {
		jogadorX += 5; //esquerda
	}
	if(jogadorX+tamJogX+tamJogX/3 >= width) {
		jogadorX -= 5; //direita
	}
	if(jogadorY+tamJogY+tamJogY/3 >= windowHeight) {
		jogadorY -= 5; //baixo
	}
	if(jogadorY-tamJogY/3 <= windowHeight-windowHeight) {
		jogadorY += 5; //cima
	}

	//condição para o disparo do projétio
	if(!disparar) {
		projetioY = projetioY - movimentoP; //movimento do projétio
	}
	if(projetioY < -20) {
		disparar = true;
	}
	if(keyIsDown(32) && disparar) {
		projetioX = jogadorX+tamJogX/2; //o projétio parte da posição do jogador
		projetioY = jogadorY; //o projétio parte da posição do jogador
		disparar = false;
	}

	//movimentação dos inimigos
	for(i=0; i<contI; i++) {
		inimigoY[i] = inimigoY[i] + movimentoI; //movimentação dos inimigos
	}

	for(i=0; i<contI; i++) {

		//colisão entre o projétio e os inimigos
		if(projetioY < inimigoY[i]+tamanhoI[i] && projetioY > inimigoY[i]+tamanhoI[i]-20 && projetioX > inimigoX[i] && projetioX < inimigoX[i]+tamanhoI[i]) {
			//acertou[i]++;
			//console.log("colidio " + acertou[i]);
			if(resNormal) {
				acertou[i]++;
				console.log("colidio normal " + acertou[i]);
				inimigoY[i] = windowHeight; //posição do inimigo após a colisão
				projetioY = -windowHeight; //posição do projétio após a colisão
				pontuação++; //quando acertar ganha ponto
				acertou[i] = 0;
			}
			else {
				acertou[i]++;
				console.log("colidio resistente " + acertou[i]);
				projetioY = -windowHeight;
				if(acertou[i] == 2) {
					console.log("colidio no if " + acertou[i]);
					inimigoY[i] = windowHeight; //posição do inimigo após a colisão
					//projetioY = -windowHeight; //posição do projétio após a colisão
					pontuação++; //quando acertar ganha ponto
					acertou[i] = 0;
				}
			}
		}

		//colisão entre o jogador e os inigos
		if(jogadorY < inimigoY[i]+tamanhoI[i] && jogadorY+tamJogY > inimigoY[i] && jogadorX+tamJogX > inimigoX[i] && jogadorX < inimigoX[i]+tamanhoI[i]) {
			inimigoY[i] = windowHeight; //posição do inimigo após a colisão
			vidaJ--; //após a colisão o jogador perde vida
		}

		//quando o inimigo passar do cenário retorna para o começo
		if(inimigoY[i] > windowHeight) {
			inimigoX[i] = random(0, width - (tamanhoI[i]) - 70);
			inimigoY[i] = -random(windowHeight);
		}
	}

	//movimentação do bônus de vida
	bonusVidaY = bonusVidaY + movimentoBVida;
	//colisão entre o jogador e o bônus de vida
	if(jogadorY < bonusVidaY+10 && jogadorY+tamJogY > bonusVidaY-10 && jogadorX+tamJogX > bonusVidaX-10 && jogadorX < bonusVidaX+10) {
		vidaJ = 5;
		bonusVidaY = windowHeight + tamBonVidaY;
	}

	//movimentação do bônus da velocidade do projétio
	bonusVelPY = bonusVelPY + movimentoBVelP;
	//colisão entre o jogador e o bônus da velecidade do projétio
	if(jogadorY < bonusVelPY+10 && jogadorY+tamJogY > bonusVelPY-10 && jogadorX+tamJogX > bonusVelPX-10 && jogadorX < bonusVelPX+10) {
		movimentoP = 10;
		bonusVelPY = windowHeight + tamBonVelPY;
	}

	//forma do projétio
	strokeWeight(2);
	stroke(255);
	noFill();
	ellipse(projetioX, projetioY, tamProX, tamProY);

	//forma do jogador
	//fill(255);
	//ellipse(jogadorX, jogadorY, tamJogX, tamJogY);
	image(imgJ, jogadorX, jogadorY, tamJogX, tamJogY);

	for(i=0; i<contI; i++) {
		//forma dos inimigos
		fill(255);
		//rect(inimigoX[i], inimigoY[i], tamanhoI[i], tamanhoI[i]);
		image(imgI[i], inimigoX[i], inimigoY[i], tamanhoI[i], tamanhoI[i]);
	}

	//forma do bônus de vida
	fill(0, 0, 255);
	image(imgBV, bonusVidaX, bonusVidaY, tamBonVidaX, tamBonVidaY);

	//forma do bônus da velocidade do projétio
	fill(255, 0, 0);
	image(imgBP, bonusVelPX, bonusVelPY, tamBonVelPX, tamBonVelPY);

	//informações que aparrecem na tela
	textSize(16); //tamanho
	fill(255); //cor
	noStroke(); //sem contorno
	text("Vida: " + vidaJ, 550, 30); //texto
	text("Pontuação: " + pontuação, 30, 30); //texto
	text("Tempo: " + tempo, 30, windowHeight-40);
	text("Fase: " + fase, 550, windowHeight-40);

	//fases
	if(pontuação >= 5) {
		movimentoI = 3;
		fase = 2;
	}
	if(pontuação >= 10) {
		for(i=0; i<contI; i++) {
			tamanhoI[i] = tamFase3[i];
		}
		fase = 3;
	}
	if(pontuação >= 15) {
		movimentoI = 4;
		resNormal = false;
		fase = 4;
	}
	if(pontuação >= 20) {
		for(i=0; i<contI; i++) {
			tamanhoI[i] = tamFase5[i];
		}
		fase = 5;
	}
	if(pontuação >= 25) {
		
		tempoSair++;
		console.log("tempo " + tempoSair);
		if(tempoSair <= 100) {
			jogadorY -= 10;
			console.log("tempo <= 100 " + tempoSair);
			for(i=0; i<contI; i++) {
				if(inimigoX[i] < width/2) {
					inimigoX[i] -= 10;
				}
				else {
					inimigoX[i] += 10;
				}
			}
		}
		else {
			Jogo = false;
			Chefe = true;
		}

	}


	if(vidaJ == 0) {
		Inicio = false;
		Jogo = false;
		Chefe = false;
		Vitoria = false;
		Fim = true;
	}
}

function FaseChefe() {
	console.log("estou na fase do chefe");
	background(fundo); //plano de fundo

	tempoEntrar++;

	if(tempoEntrar <= 100) {
		console.log("entrada do chefe, tempo: " + tempoEntrar);
		jogadorX = width/2;
		jogadorY = windowHeight + tamJogY;
		ChefeY = (windowHeight-windowHeight) - tamChefeY;
		ChefeY += 10;
		movChefeX = true;
		movChefeY = true;
	}
	else {
		tempo++;

		//movimentação do jogador com o teclado
		if(keyIsDown(37)) {
			jogadorX = jogadorX - movimentoJ; //esquerda
		}
		if(keyIsDown(39)) {
			jogadorX = jogadorX + movimentoJ; //direita
		}
		if(keyIsDown(38)) {
			jogadorY = jogadorY - movimentoJ; //cima
		}
		if(keyIsDown(40)) {
			jogadorY = jogadorY + movimentoJ; //baixo
		}

		//o jogador não ultrapassa o cenário
		if(jogadorX-tamJogX/2 <= width-width) {
			jogadorX += 5; //esquerda
		}
		if(jogadorX+tamJogX+tamJogX/2 >= width) {
			jogadorX -= 5; //direita
		}
		if(jogadorY+tamJogY+tamJogY/2 >= windowHeight) {
			jogadorY -= 5; //baixo
		}
		if(jogadorY-tamJogY/2 <= windowHeight-windowHeight) {
			jogadorY += 5; //cima
		}

		//condição para o disparo do projétio
		if(!disparar) {
			projetioY = projetioY - movimentoP; //movimento do projétio
		}
		if(projetioY < -20) {
			disparar = true;
		}
		if(keyIsDown(32) && disparar) {
			projetioX = jogadorX+tamJogX/2; //o projétio parte da posição do jogador
			projetioY = jogadorY; //o projétio parte da posição do jogador
			disparar = false;
		}


		//colisão entre o projétio e o chefe
		if(projetioY < ChefeY+tamChefeY && projetioY > ChefeY && projetioX > ChefeX && projetioX < ChefeX+tamChefeX) {
			projetioY = -windowHeight;
			VidaChefe--;
			acertouChefe++;

			compBarraX -= taxaDimBarra;
			console.log("comprimento: " + compBarraX + "  VidaChefe: " + VidaChefe);
			r += (255/taxaDimCorB);
			g -= (255/taxaDimCorB);

		}


		//movimentação do chefe
		//barra
		barraX = ChefeX;
		barraY = ChefeY - 10;
		explosãoX = ChefeX;
		explosãoY = ChefeY;

		//em X
		if(movChefeX) {
			ChefeX += movimentoChefe;
		}
		if(ChefeX+tamChefeX >= width-30) {
			movChefeX = false;
		}
		if(!movChefeX) {
			ChefeX -= movimentoChefe;
		}
		if(ChefeX-30 <= 0) {
			movChefeX = true;
		}
		//em Y
		if(movChefeY) {
			ChefeY += movimentoChefe;
		}
		if(ChefeY+tamChefeY >= 350) {
			movChefeY = false;
		}
		if(!movChefeY) {
			ChefeY -= movimentoChefe;
		}
		if(ChefeY <= 20) {
			movChefeY = true;
		}

		//tiro do chefe
		if(acertouChefe == 0) {
			tiroChefeX = ChefeX + tamChefeX/2;
			tiroChefeY = ChefeY + tamTiroCY*2;
		}
		if(acertouChefe >= 1) {
			tiroChefeY = tiroChefeY + movTiroChefe;
		}
		if(tiroChefeY >= windowHeight + tamTiroCY) {
			tiroChefeX = ChefeX + tamChefeX/2;
			tiroChefeY = ChefeY + tamChefeY-tamTiroCY;
		}

		//colisão do tiro do chefe
		if(tiroChefeY > jogadorY && tiroChefeY < jogadorY+tamJogY && tiroChefeX > jogadorX && tiroChefeX < jogadorX+tamJogX) {
			tiroChefeY = windowHeight + tiroChefeY;
			console.log("o inimigo acertou");
			vidaJ--;
			console.log("vida do jogador: " + vidaJ);
		}



		//forma do projétio
		strokeWeight(2);
		stroke(255);
		noFill();
		ellipse(projetioX, projetioY, tamProX, tamProY);

		//forma do jogador
		//fill(255);
		//ellipse(jogadorX, jogadorY, tamJogX, tamJogY);
		image(imgJ, jogadorX, jogadorY, tamJogX, tamJogY);

		//forma do chefe
		if(desenharChefe) {
			//barra
			noStroke();
			fill(r, g, b);
			rect(barraX, barraY, compBarraX, compBarraY);

			strokeWeight(2);
			stroke(255);
			noFill();
			ellipse(tiroChefeX, tiroChefeY, tamTiroCX, tamTiroCY);

			//forma do chefe
			image(imgChefe, ChefeX, ChefeY, tamChefeX, tamChefeY);
		}

		textSize(14);
		noStroke();
		fill(255);
		text("vida do Chefe: " + VidaChefe, 50, 50);
		text("Vida: " + vidaJ, 50, windowHeight-50);
		text("Tempo: " + tempo, 30, windowHeight-40);

		if(VidaChefe <= 5) {
			movimentoChefe = 3;
			movTiroChefe = 8;
		}

		if(VidaChefe == 0) {
			movimentoChefe = 0;
			movimentoP = 0;

			tempoAnim++;
			console.log("tempo incrementando " + tempoAnim);
			if(tempoAnim % velAnim == 0) {
				console.log("contador da animação: " + animação);

				image(explosão[animação], explosãoX, explosãoY, 200, 200);
				animação++;
				//console.log(animação);

				if(animação == 3) {
					desenharChefe = false;
				}

				if(animação == quantImagem) {
					Inicio = false;
					Jogo = false;
					Chefe = false;
					Vitoria = true;
					Fim = false;
				}
			}		
		}

		if(vidaJ == 0) {
			Inicio = false;
			Jogo = false;
			Chefe = false;
			Vitoria = false;
			Fim = true;
		}
	}
}

function TelaVitoria() {
	console.log("estou na tela de vitoria");
	background(fundo);

	fill(255);
	noStroke();
	textSize(40);
	text("		PARABÉNS! \nVOCÊ GANHOU!", 170, (windowHeight/2)-40);
	textSize(20);
	text("(Aperte R para recomeçar)", 210, (windowHeight/2)+40);
	
	tempo = 0;
	jogadorX = width/2;
	jogadorY = windowHeight;
	projetioX = jogadorX+tamJogX/2;
	projetioY = jogadorY;
	movimentoI = 2;
	movimentoP = 6;
	fase = 1;
	vidaJ = 5;
	pontuação = 0;
	VidaChefe = 10;
	ChefeX = width/2;
	ChefeY = (windowHeight-windowHeight) - tamChefeY;
	compBarraX = tamChefeX;
	movimentoChefe = 2;
	tiroChefeX = ChefeX + tamChefeX/2;
	tiroChefeY = ChefeY + tamTiroCY*2;
	movTiroChefe = 5;
	acertouChefe = 0;
	desenharChefe = true;
	r = 0;
	g = 255;
	resNormal = true;
	bonusVidaX = random(50, width-50);
	bonusVidaY = -random(4000, 5000); 
	bonusVelPX = random(50, width-50);
	bonusVelPY = -random(2000, 3000);
	tempoSair = 0;
	tempoEntrar = 0;


	for(i=0; i<contI; i++) {
		inimigoX[i] = random(0, width - (tamanhoI[i]) - 70); //posição inicial aleatória
		inimigoY[i] = -random(windowHeight); //posição inicial aleatória
		tamanhoI[i] = tamFase1[i]; //tamanho aleatório
	}
	
	if(keyIsDown(82) && Vitoria == true) {
		Inicio = true;
		Jogo = false;
		Chefe = false;
		Vitoria = false;
		Fim = false;
	}
}


function TelaFinal() {
	console.log("estou na tela final");

	background(fundo);

	fill(255);
	noStroke();
	textSize(40);
	text("FIM DE JOGO", 200, windowHeight/2);
	textSize(20);
	text("(Aperte R para recomeçar)", 210, (windowHeight/2)+30);
	
	tempo = 0;
	jogadorX = width/2;
	jogadorY = windowHeight;
	projetioX = jogadorX+tamJogX/2;
	projetioY = jogadorY;
	movimentoI = 2;
	movimentoP = 6;
	fase = 1;
	vidaJ = 5;
	pontuação = 0;
	VidaChefe = 10;
	ChefeX = width/2;
	ChefeY = (windowHeight-windowHeight) - tamChefeY;
	compBarraX = tamChefeX;
	movimentoChefe = 2;
	tiroChefeX = ChefeX + tamChefeX/2;
	tiroChefeY = ChefeY + tamTiroCY*2;
	movTiroChefe = 5;
	acertouChefe = 0;
	desenharChefe = true;
	r = 0;
	g = 255;
	resNormal = true;
	bonusVidaX = random(50, width-50);
	bonusVidaY = -random(4000, 5000); 
	bonusVelPX = random(50, width-50);
	bonusVelPY = -random(2000, 3000);
	tempoSair = 0;
	tempoEntrar = 0;

	for(i=0; i<contI; i++) {
		inimigoX[i] = random(0, width - (tamanhoI[i]) - 70); //posição inicial aleatória
		inimigoY[i] = -random(windowHeight); //posição inicial aleatória
		tamanhoI[i] = tamFase1[i]; //tamanho aleatório
	}
	
	if(keyIsDown(82) && Fim == true) {
		Inicio = true;
		Jogo = false;
		Chefe = false;
		Vitoria = false;
		Fim = false;
	}
}

function draw() {

	if(Inicio) {
		console.log("inicio true");
		TelaInicial();
	}
	else {
		if(Jogo) {
			TelaJogo();
		}
		else {
			if(Chefe) {
				FaseChefe();
			}
			else {
				if(Vitoria) {
					TelaVitoria();
				}
				else {
					if(Fim) {
						TelaFinal();
					}
				}
			}
		}
	}
}