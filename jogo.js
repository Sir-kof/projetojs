var timeId = null; //variável de armazenamento da chamada de função timeout.

function iniciaJogo(){

	var url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if(nivel_jogo == 1) { //Nível Fácil
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2) { //Nível Normal
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3) { //Nível Difícil
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//quantidade de balões
	var qtde_baloes = 80;

	criaBaloes(qtde_baloes);

	//imprimindo quantidade de balões inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagemTempo(tempo_segundos + 1)
}

function criaBaloes(qtde_baloes) {

	for (var i = 1; i <= qtde_baloes; i++) {
		
		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this); }

		document.getElementById('cenario').appendChild(balao);
	}
}

function contagemTempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timeId);
		gameOver();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timeId = setTimeout("contagemTempo("+segundos+")", 1000);
}

function gameOver(){
	alert('Fim de jogo. Você não conseguiu estourar todos os balões a tempo.')
}


function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick", "")
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1)
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	statusGame(baloes_inteiros)
}

function statusGame(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabéns. Você conseguiu estourar todos os balões a tempo.')
		pararJogo()
	}
}

function pararJogo(){
	clearTimeout(timeId);
}