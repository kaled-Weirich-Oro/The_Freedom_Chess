(function($) {
	var $falar_novamente = $('#falar_novamente');
	var $btn = $('#btn');
	var cord_jogada, f_result, f_result2; //teste
	var transcricao;
	var cordenada_letra;
	var cordenada_num;
	var jogada;
	var ativo = false;
	var local_peca;
	var local_jogada;
	var muda;
	if ('webkitSpeechRecognition' in window) {
		var recognition = new webkitSpeechRecognition();
		recognition.lang = "pt-br";
		recognition.continuous = false;
		recognition.interimResults = false;
		$btn.click(function(e){
			var x;
			e.preventDefault();
			if (ativo == false)
				{
				recognition.start();
				ativo = true;
				x = document.getElementById("rec").className = " ";
				}
			else
				{
				recognition.stop();
				ativo = false;
				x = document.getElementById("rec").className = "hidden-lg hidden-md hidden-sm hidden-xs";
				 }
		});
		recognition.onresult = function(event)
		{
			var certo, frase;
				recognition.stop();
			for (var i = event.resultIndex; i < event.results.length; i++) 
			{
				transcricao = event.results[i][0].transcript;
			}
		    frase = document.getElementById("frase_dita").innerHTML = "Frase dita: " + transcricao;
				cord_jogada = frase_cordenada(transcricao);
				jogada = document.getElementById("jogada").innerHTML;
		    	if (transcricao == "voltar jogada" || transcricao == "Voltar jogada" || transcricao == "Voltar Jogada"
		|| transcricao == "voltar Jogada" || transcricao == "voltar jogada")
			   	{
			   		volta_jogada();
			   	}
			   	else if (transcricao == "Salvar tempo" || transcricao == "salvar tempo" ||
			   		transcricao == "Salvar relógio" || transcricao == "Salvar Relógio" ||
			   		transcricao == "salvar relógio" || transcricao == "salvar Relógio")
			   	{
			   		edita_tempo();
			   	}
			   	else if (transcricao == "Editar tempo" || transcricao == "editar tempo" ||
			   	        transcricao == "editar Tempo" || transcricao == "Editar relógio" ||
			   	        transcricao == "editar relógio" || transcricao == "Editar Relógio" ||
			   	        transcricao == "editar Relógio")
			   	{
			   		mostra_edita_tempo();
			   	}
			   	else if (transcricao == "Pausa" || transcricao == "pausa" ||
			   	 transcricao == "Pausar" || transcricao == "pausar")
			   	 {
			   	 	pausar_relogio();
			   	 }
			   	 else if (transcricao == "opção 1" || transcricao == "Opção 1")
			   	 {
			   	 	opcao1_check();
			   	 }
			   	 else if (transcricao == "opção 2" || transcricao == "Opção 2")
			   	 {
			   	 	opcao2_check();
			   	 }
			   	 else if (transcricao == "opção 3" || transcricao == "Opção 3")
			   	 {
			   	 	opcao3_check();
			   	 }
			   	 else if (transcricao == "apagar coordenada" || transcricao == "Apagar coordenada" ||
			   	 	transcricao == "apagar coordenadas" || transcricao == "Apagar coordenadas" ||
			   	 	transcricao == "limpar coordenada" || transcricao == "Limpar coordenada" ||
			   	 	transcricao == "limpar coordenadas" || transcricao == "Limpar coordenadas")
			   	 {
			   	 	apagar_cordenada();
			   	 }
			   	else
			   	{
			   		if (cord_jogada != false)
			         {
				if (jogada == 0)
				{
					var conteudo;
					conteudo = document.getElementById(cord_jogada).getElementsByTagName("p")[0].innerHTML;
					f_result = cord_jogada.charAt(0);
					f_result = numero_letra(f_result);
					f_result = f_result + String(cord_jogada.charAt(1));
					if (conteudo != "" && conteudo != " ")
					{
					$('#result').val(f_result);
					repete_cordenada();
					local_peca = cord_jogada; //(String(cordenada_letra) + String(cordenada_num));
					muda_cor_adv(cord_jogada);
					mostra_possiveis_jogadas();
					jogada = document.getElementById("jogada").innerHTML = "1";	
					muda = document.getElementById("result2").focus();
					}
					else
					{
						frase = document.getElementById("frase_dita").innerHTML = "Frase dita: " + transcricao
						+ "   <p style='color : red;'>" + f_result + " casa vazia </p>";
					}			
				 }	
				else
				{
					f_result = document.getElementById("result").value;
					local_peca = f_result.charAt(0);
					local_peca = verifica_jogada(local_peca);
					local_peca = local_peca + f_result.charAt(1);
					local_jogada = cord_jogada;
					joga_peca(local_peca, local_jogada);
					limpa_inputs();
					muda = document.getElementById("result").focus();
				}	
				}
    	   else
			   {
			   		recognition.abort();
			   }
			}
		}
		recognition.onend = function()
		{
			var x, y;
			ativo = false;
			y = document.getElementById("result").value;
			if (y == "")
			{
				jogada = 0;
			}
			else
			{
				jogada = 1;
			}
		x = document.getElementById("rec").className = "hidden-lg hidden-md hidden-sm hidden-xs";
		}
		$falar_novamente.click(function(e)
		{
			e.preventDefault();
			jogada = jogada - 1;
			limpa_inputs();
		})
	}
	else
	{
		$btn.hide();
	}

})(jQuery);
(function($) {
var $falar = $('#btn_falar_peca');
var ativo = false;
var frase, x;
if ('webkitSpeechRecognition' in window) {
		var recognition = new webkitSpeechRecognition();
		recognition.lang = "pt-br";
		recognition.continuous = false;
		recognition.interimResults = false;
		$falar.click(function(e){
			e.preventDefault();
			if (ativo == false)
				{
				recognition.start();
				ativo = true;
				x = document.getElementById("rec_peca").className = " ";
				}
			else
				{
				recognition.stop();
				ativo = false;
				x = document.getElementById("rec_peca").className = "hidden-lg hidden-md hidden-sm hidden-xs";
				 }
		});
		recognition.onresult = function(event)
		{
			var letra_peca, muda, peca;
			recognition.stop();
			for (var i = event.resultIndex; i < event.results.length; i++) {
				frase = event.results[i][0].transcript;
			}
			muda = document.getElementById("frase_dita_peca").innerHTML = "frase dita: "  + frase;
				letra_peca = frase.charAt(0);
					letra_peca = nome_peca_promovida(letra_peca);
					if (letra_peca != "")
					{
						muda = document.getElementById("fala_peca_promovida").value = letra_peca;
						peca = letra_peca;
						peca = nome_desenho_peca(peca);
						escolhe_peca_promovida(peca);
					}
		}
		recognition.onend = function(event)
		{
			recognition.stop();
			x = document.getElementById("rec_peca").className = "hidden-lg hidden-md hidden-sm hidden-xs";
		}
	}
else
{
	$falar.hide();
}
})(jQuery)
function nome_desenho_peca(n)
{
	if (n == "dama" || n == "Dama")
		{ return "♛"; }
	if (n == "torre" || n == "Torre")
		{ return "♖"; }
	else if (n == "cavalo" || n == "Cavalo")
		{ return "♘"; }
	else if (n == "bispo" || n == "Bispo")
		{ return "♝"; }
}
function apagar_cordenada()
{
	var jogada, r1;
	jogada = document.getElementById("jogada").innerHTML = "0";
	limpa_inputs();
	limpa_jogadas_possiveis();
	r1 = document.getElementById("result").focus();
	repete_frase("apagou coordenada.     Selecione sua peça novamente");
}
function verifica_jogada(letra)
{
	if (letra == "a" || letra == "A")
		{
			return 1;
		}
	else if (letra == "b" || letra == "B")
		{
			return 2;
		}
	else if (letra == "c" || letra == "C")
		{
			return 3;
		}
	else if (letra == "d" || letra == "D")
		{
			return 4;
		}
	else if (letra == "e" || letra == "E")
		{
			return 5;
		}
	else if (letra == "f" || letra == "F")
		{
			return 6;
		}
	else if (letra == "g" || letra == "G")
		{
			return 7;
		}
	else if (letra == "h" || letra == "H")
		{
			return 8;
		}
}
function digita_opcoes()
{
	var x, muda;
	x = document.getElementById("result").value;
	if (x == "voltar" || x == "Voltar" || x == "Voltar jogada" || x == "voltar jogada")
	{
		volta_jogada();
		muda = document.getElementById("result").focus();
	}
	else if (x == "tempo" || x == "Tempo" || x == "relogio" || x == "relógio" ||  x == "Relogio"
		|| x == "Relógio")
	{
		mostra_edita_tempo();
		muda = document.getElementById("result").value = "";
	}
	else if (x == "Salvar" || x == "salvar" || x == "salvar tempo" || x == "Salvar tempo" ||
		x == "salvar Tempo" || x == "Salvar Tempo" || x == "salvar relógio" || x == "Salvar Relógio"
		|| x == "salvar relogio" || x == "Salvar relogio" || x == "Salvar Relogio" || x == "salvar Relogio")
	{
		edita_tempo();
		muda = document.getElementById("result").value = "";
	}
	else if (x == "Pausar" || x == "pausar")
	{
		pausar_relogio();
		muda = document.getElementById("result").value = "";
	}
    else if (x == "opção 1" || x == "Opção 1" || x == "opçao 1" || x == "Opçao 1"
	 		   || x == "opcao 1" || x == "Opcao 1" || x == "op 1" || x == "Op 1")
   		 {
      	 	opcao1_check();
      	 	muda = document.getElementById("result").value = "";
			muda = document.getElementById("result").focus();
	   	 }
	else if (x == "opção 2" || x == "Opção 2" || x == "opçao 2" || x == "Opçao 2"
	 		   || x == "opcao 2" || x == "Opcao 2" || x == "Op 2" || x == "op 2")
	  	 {
			opcao2_check();
      	 	muda = document.getElementById("result").value = "";
			muda = document.getElementById("result").focus();
		 }
	else if (x == "opção 3" || x == "Opção 3" || x == "opçao 3" || x == "Opçao 3"
	 		   || x == "opcao 3" || x == "Opcao 3" || x == "Op 3" || x == "op 3")
	  	 {
			opcao3_check();
      	 	muda = document.getElementById("result").value = "";
			muda = document.getElementById("result").focus();
		 }
}
function digita_jogada()
{
	var x, cont;
	x = document.getElementById("result2").value;
	if (x.length > 1)
	{
	x = parseInt(x.charAt(1));
	if (Number.isInteger(x))
	{
	var cordenada_peca;
	var cordenada_posicao;
	var jogada;
	var j_letra;
	cordenada_peca = document.getElementById("result").value;
	j_letra = cordenada_peca.charAt(0);
	j_letra = verifica_jogada(j_letra);
	cordenada_peca = String(j_letra) + String(cordenada_peca.charAt(1));
	cordenada_posicao = document.getElementById("result2").value;
	j_letra = cordenada_posicao.charAt(0);
	j_letra = verifica_jogada(j_letra);
	cordenada_posicao = String(j_letra) + String(cordenada_posicao.charAt(1)) ;
	cont = conteudo_peca(cordenada_peca);
	joga_peca(cordenada_peca, cordenada_posicao);
	limpa_inputs();
	jogada = document.getElementById("jogada").innerHTML = "0";
	}
	}
	else if (x != "")
		{ repete_cordenada();    }
	x = document.getElementById("result").focus();
}
function conteudo_peca(cord)
{
	var x = document.getElementById(cord).getElementsByTagName('p')[0].innerHTML;
	return x;
}
function joga_peca(c_peca, c_jogada)
{
	var aux_jogada, r_aux_jogada, controla_relogio;
	r_aux_jogada = false;
	aux_jogada = verifica_opcao3();
	if (aux_jogada == true)
	{
		r_aux_jogada = valida_casa_possivel(c_jogada);
	}
 if ((aux_jogada == true && r_aux_jogada == true) || aux_jogada == false)
  {
		limpa_jogadas_possiveis();
	if (c_peca != c_jogada)
	{
	var njogada, cor, npeca, npeca2, njogada2, cor2;
	var cont_x, cont_y, muda, promocao, en_passat, check2;
	cor = document.getElementById(c_peca).getElementsByTagName("p")[0].className;
	cor2 = document.getElementById(c_jogada).getElementsByTagName("p")[0].className;
	npeca = document.getElementById(c_peca).getElementsByTagName("p")[0].innerHTML;
	npeca2 = document.getElementById(c_jogada).getElementsByTagName("p")[0].innerHTML;
	promocao = promove(npeca, c_jogada);
	cont_x = npeca;
	cont_y = npeca2;
	aux_fala_peca_jogada(npeca, c_peca, c_jogada);
	if (cor == "peca_branca")
	{
	muda = document.getElementById(c_jogada).innerHTML = "<p class='peca_branca'>"+ npeca + "</p>";		
	controla_relogio = document.getElementById("seta_relogio").innerHTML = "2";
	if (npeca == "♔")
		{ muda = document.getElementById("rock_branco").innerHTML = "1";   }
	}
	else
	{
	muda = document.getElementById(c_jogada).innerHTML = "<p class='peca_preta'>"+ npeca + "</p>";		
	controla_relogio = document.getElementById("seta_relogio").innerHTML = "1";
	if (npeca == "♔")
		{ muda = document.getElementById("rock_preto").innerHTML = "1";   }
	}
	if (cor2 == "peca_branca")
	{
	muda = document.getElementById("conteudo_pecay").innerHTML = "<p class='peca_branca'>"+ npeca2 + "</p>";		
	}
	else
	{
	muda = document.getElementById("conteudo_pecay").innerHTML = "<p class='peca_preta'>"+ npeca2 + "</p>";		
	}
	muda = document.getElementById("cord_x").innerHTML = c_peca;
	muda = document.getElementById("cord_y").innerHTML = c_jogada;
	muda = document.getElementById("cor_pecax").innerHTML = cor;
	muda = document.getElementById("cor_pecay").innerHTML = cor2;
	muda = document.getElementById(c_peca).innerHTML = "<p></p>";
	muda = document.getElementById("conteudo_pecax").innerHTML = cont_x;
	muda = document.getElementById("conteudo_pecay").innerHTML = cont_y;
	muda = document.getElementById("voltar_jogada").style.visibility = "visible";
	en_passant();	
		x1 = document.getElementById("result").value = "";
		xy = document.getElementById("jogada").innerHTML = "0";
	joga_torre_rock();
	}
	else   //cx == cy
	{
		muda = document.getElementById("result").value = "";
		muda = document.getElementById("jogada").innerHTML = "0";
		limpa_jogadas_possiveis();
		repete_frase("Selecione uma peça novamente");
	}
  }
  else
  	{ apagar_cordenada();   }
}
function opcoes_promocao()
{
	var m, i;
	m = document.getElementById("fundo").style.visibility = "visible";
	m = document.getElementById("fundo").style.display = "inline";
	x = document.getElementsByClassName("pecas_promovidas");
	for (i=0;i<x.length;i++)
	{
	m = document.getElementsByClassName("pecas_promovidas")[i].style.display = "inline";
	m = document.getElementsByClassName("pecas_promovidas")[i].style.visibility = "visible";
	}
	m = document.getElementById("fala_peca_promovida").focus();
}
function valida_casa()
{
	var num, letra, m, fr, id;
	fr = document.getElementById("result").value;
	if (fr.length == 2)
	{
	letra = fr.charAt(0);
	num = fr.charAt(1);
	num = parseInt(num);
	letra = verifica_jogada(letra); // retorna numero
	if (Number.isInteger(letra) && Number.isInteger(num))
	{
		if ((parseInt(letra) >= 1 && parseInt(letra) <= 8) && (parseInt(num) >= 1 && parseInt(num) <= 8))
		{
			id = String(letra) + String(num);
			m = document.getElementById("jogada").innerHTML = "1";
			muda_cor_adv(id);
		}
	}
	}
}
function aux_fala_peca_jogada(peca, cord1, cord2)
{
	var cord1_0, cord2_0;
	cord1 = String(cord1);
	cord2 = String(cord2);
	 peca = nome_peca(peca);
	 cord1_0 = cord1.charAt(0);
	 cord1_0 = numero_letra(cord1_0);
	 cord1 = String(cord1_0) + String(cord1.charAt(1));
	 cord2_0 = cord2.charAt(0);
	 cord2_0 = numero_letra(cord2_0);
	 cord2 = String(cord2_0) + String(cord2.charAt(1));	 
	check2 = document.getElementById("opcao_nomes_padrao").checked;
	if (check2 == true)
	{
		cord1 = String(cord1);
		letra_cord = cord1.charAt(0);
		letra_cord = nome_padroes_cego(letra_cord);
		if (letra_cord != "false")
		{
			cord1 = letra_cord + cord1.charAt(1);
		}
		cord2 = String(cord2);
		letra_cord = cord2.charAt(0);
		letra_cord = nome_padroes_cego(letra_cord);	
		if (letra_cord != "false")
		{
			cord2 = letra_cord + cord2.charAt(1);
		}	
	}
	 fala_peca_jogada(peca, cord1, cord2);
}
function fala_peca_jogada(peca, cord1, cord2)
{
	var check;
	check = verifica_opcao1();
	if (check == true)
	{
	responsiveVoice.setDefaultVoice("Brazilian Portuguese Female");
	responsiveVoice.speak(peca + " " + "de " + cord1 + " " + "para " + cord2);
	}

}
function limpa_inputs()
{
	var x, y;
	x = document.getElementById("result").value = "";
	y = document.getElementById("result2").value = "";
	x = document.getElementById("frase_dita").innerHTML = "";
	x = document.getElementById("fala_peca_promovida").value = "";
	x = document.getElementById("frase_dita_peca").innerHTML = "Frase dita: ";
}
function joga_mouse(id)
{
	var xy, conteudo, x1, x2, jogada, muda;
	var cordenada1, cor_peca, frase, result;
	conteudo = document.getElementById(id).getElementsByTagName("p")[0].innerHTML;
	jogada = document.getElementById("jogada").innerHTML;
	if (jogada == "0")
	{
		id = String(id);
		x1 = id.charAt(0);
		x2 = id.charAt(1);
		cordenada1 = numero_letra(x1);
		cordenada1 = cordenada1 + x2;
		if (conteudo != "" && conteudo != " ")
		{
					reproduz_peca_selecionada(id, conteudo);
					x1 = document.getElementById("result").value = cordenada1;
					x1 = document.getElementById("jogada").innerHTML = "1";
					muda_cor_adv(id);
					mostra_possiveis_jogadas();
					muda = document.getElementById("result2").focus();
		}
		else
		{
		frase = document.getElementById("frase_dita").innerHTML = "<p style='color : red;'>"
		+ cordenada1 + " casa vazia</p>";
		}
	}
	else
	{
		result = document.getElementById("result").value;
		xy = result.charAt(0);
		xy = verifica_jogada(xy);
		xy = xy + result.charAt(1);
		xy = parseInt(xy);
		joga_peca(xy, id);
		muda = document.getElementById("result").focus();
	}
}
function muda_cor_adv(id)
{
	var cor_peca;
	cor_peca = document.getElementById(id).getElementsByTagName("p")[0].className;
		cor_peca = document.getElementById("peca_pinta_adv").innerHTML = cor_peca;
}
function numero_letra(num)
{
	if (num == "1")
	{
		return "a";
	}
	else if (num == "2")
	{
		return "b";
	}
	else if (num == "3")
	{
		return "c";
	}
	else if (num == "4")
	{
		return "d";
	}
	else if (num == "5")
	{
		return "e";
	}
	else if (num == "6")
	{
		return "f";
	}
	else if (num == "7")
	{
		return "g";
	}
	else if (num == "8")
	{
		return "h";
	}
}
function promove(peca, posicao)
{
	if (peca == "♟")
	{
		var ncasa, muda;
		ncasa = String(posicao).charAt(1);
		if (parseInt(ncasa) == 8)
		{
			muda = document.getElementsByClassName("peca_promocao");
			muda = muda.className = "peca_promocao peca_branca";
			opcoes_promocao();
			return "promove_branca";
		}
		else if (parseInt(ncasa) == 1)
		{
			muda = document.getElementsByClassName("peca_promocao");
			muda = muda.className = "peca_promocao peca_preta";
			opcoes_promocao();
			return "promove_preta";
		}
	}
	return "nao_promove";
}
function escolhe_peca_promovida(peca)
{
	var muda, cord_peca, cor, x;
	cor = document.getElementById("cor_pecax").innerHTML;
	cord_peca = document.getElementById("cord_y").innerHTML;
	if (cor == "peca_branca")
		{
		muda = document.getElementById(cord_peca).innerHTML = "<p class='peca_branca'>"+ peca + "</p>";		
		}
		else
		{
		muda = document.getElementById(cord_peca).innerHTML = "<p class='peca_preta'>"+ peca + "</p>";		
		}
	muda = document.getElementById("fundo").style.visibility = "hiden";
	muda = document.getElementById("fundo").style.display = "none";
	x = document.getElementsByClassName("pecas_promovidas");
	for (var i=0; i<x.length;i++)
	{
	muda = document.getElementsByClassName("pecas_promovidas")[i].style.visibility = "hiden";
	muda = document.getElementsByClassName("pecas_promovidas")[i].style.display = "none";
	}
	limpa_inputs();
	muda = document.getElementById("jogada").innerHTML = "0";
}
function verifica_fala(c1, c2, frase)
{
	if (c1 == "a" || c1 == "A" || c1 == "b" || c1 == "B" || c1 == "c" || c1 == "C" || c1 == "d"
		|| c1 == "D" || c1 == "e" || c1 == "E" || c1 == "f" || c1 == "F" || c1 == "g" || c1 == "G"
		|| c1 == "h" || c1 == "H")
	{
		if (c2 >= 1 && c2 <= 8)
		{
			return true;
		}
	}
	if (frase == "voltar jogada" || frase == "Voltar jogada" || frase == "Voltar Jogada"
		|| frase == "voltar Jogada")
	{
		return true;
	}
	return false;
}
function digita_peca_promovida()
{
	var palavra, peca, letra, i;
	palavra = document.getElementById("fala_peca_promovida").value;
	palavra = String(palavra);
	if (palavra != "")
	{
		for (i=0;i<palavra.length;i++)
		{
		letra = palavra.charAt(i);
		letra = nome_peca_promovida(letra);
		if (letra != "")
			{ 
				palavra = document.getElementById("fala_peca_promovida").value = letra;
				peca = letra;
				peca = nome_desenho_peca(peca);
						escolhe_peca_promovida(peca);
				break; 
			}
		}
	}
}
function nome_peca_promovida(l)
{
	if (l == "d" || l == "D")
		{ return "Dama"; }
	else if (l == "t" || l == "T")
		{ return "Torre"; }
	else if (l == "b" || l == "B")
		{ return "Bispo"}
	else if (l == "c" || l == "C")
		{ return "Cavalo"; }
	return "";
}
function volta_jogada()
{
	var x1, y1, letrax, letray;
	var contx, conty, muda, corx, cory;
	var en_passant, en_passant_casa;
	en_passant = document.getElementById("en_passant").innerHTML;
	x1 = document.getElementById("cord_x").innerHTML;
	y1 = document.getElementById("cord_y").innerHTML;
	contx = document.getElementById("conteudo_pecax").innerHTML;
	conty = document.getElementById("conteudo_pecay").innerHTML;
	muda = document.getElementById("voltar_jogada").style.visibility = "hidden";
		corx = document.getElementById("cor_pecax").innerHTML;
		cory = document.getElementById("cor_pecay").innerHTML;
	if (en_passant != "false")
	{
		volta_jogada_en_passant();
	}
	if (corx == "peca_branca")
	{
	muda = document.getElementById(x1).innerHTML = "<p class='peca_branca'>"+ contx + "</p>";		
	corx = "branco";
	muda = document.getElementById("seta_relogio").innerHTML = "1";
	}
	else
	{
	muda = document.getElementById(x1).innerHTML = "<p class='peca_preta'>"+ contx + "</p>";		
	corx = "preto";
	muda = document.getElementById("seta_relogio").innerHTML = "2";
	}
	if (cory == "peca_branca")
	{
	muda = document.getElementById(y1).innerHTML = "<p class='peca_branca'>"+ conty + "</p>";		
	cory = "branco";
	}
	else
	{
	muda = document.getElementById(y1).innerHTML = "<p class='peca_preta'>"+ conty + "</p>";		
	cory = "preto";
	}
	limpa_inputs();
	letrax = x1.charAt(0);
	letray = y1.charAt(0);
	letrax = numero_letra(letrax);
	letray = numero_letra(letray);
	x1 = String(letrax) + x1.charAt(1);
	y1 = String(letray) + y1.charAt(1);
	contx = nome_peca(contx);
	conty = nome_peca(conty);
	if (contx == "")
	{ corx = "";	}
	if (conty == "")
	{ cory = "";	}
check2 = document.getElementById("opcao_nomes_padrao").checked;
	if (check2 == true)
	{
		y1 = String(y1);
		letra_casa = y1.charAt(0);
		letra_casa = nome_padroes_cego(letra_casa);
		if (letra_casa != "false")
		{
			y1 = letra_casa + y1.charAt(1);
		}
		x1 = String(x1);
		letra_casa = x1.charAt(0);
		letra_casa = nome_padroes_cego(letra_casa);
		if (letra_casa != "false")
		{
			x1 = letra_casa + x1.charAt(1);
		}
	}
	muda = String("voltou jogada   " + y1 + "   " + conty + "  " + cory + "     " + x1 + 
		"   " + contx + "  " + corx + "      ");
	repete_frase(muda);
	volta_jogada_rock();
}
function volta_jogada_en_passant()
{
	var m, cord, n1;
	cord = document.getElementById("peao_en_passant").innerHTML;
	cord = String(cord);
	n1 = cord.charAt(1);
	if (n1 == "5")
	{
		m = document.getElementById(cord).innerHTML = "<p class='peca_preta'>♟</p>";
	}
	else if (n1 == "4")
	{
		m = document.getElementById(cord).innerHTML = "<p class='peca_branca'>♟</p>";
	}
}
function result_foco()
{
	var x;
	x = document.getElementById("result").focus()
}
function edita_tempo()
{
	var h, m, s, muda;
	h = document.getElementById("horas").value;
	m = document.getElementById("minutos").value;
	s = document.getElementById("segundos").value;
	tempo = h + ":" + m + ":" + s;
	muda = document.getElementById("tempo_j1").innerHTML = tempo;
	muda = document.getElementById("tempo_j2").innerHTML = tempo;
	mostra_relogio();
	repete_frase("Relógio ajustado      " + h + " horas   " + m + " minutos   " + s + " segundos");
	muda = document.getElementById("result").focus();
}
function mostra_relogio()
{
	var muda;
	muda = document.getElementById("titulos_relogio").style.display = "none";
	muda = document.getElementById("titulos_relogio").style.visibility = "hidden";
	muda = document.getElementById("tempo_jogadores").style.display = "block";
	muda = document.getElementById("tempo_jogadores").style.visibility = "visible";
	muda = document.getElementById("result").focus();
	muda = document.getElementById("cancelar_tempo").className = "btn btn-primary";
}
function mostra_edita_tempo()
{
	var muda;
	muda = document.getElementById("seta_relogio").innerHTML = "0";//pausa relógio
	muda = document.getElementById("tempo_jogadores").style.display = "none";
	muda = document.getElementById("tempo_jogadores").style.visibility = "hidden";
	muda = document.getElementById("titulos_relogio").style.display = "block";
	muda = document.getElementById("titulos_relogio").style.visibility = "visible";
	muda = document.getElementById("horas").focus();
	muda = document.getElementById("horas").select();
}
function sleep(seconds) {
  var n, start = new Date();
  start = start.getSeconds();
  while (1)
  {
  	n = new Date();
  	n = n.getSeconds();
    if ((n - start) >= seconds)
      break;
  }
}
function relogio_preto()
{
	var x, r2, sec, min, hora;
	var p_j2_dm = 0;
		r2 = document.getElementById("tempo_j2").innerHTML;
		hora = parseInt(String(r2.charAt(0)) + String(r2.charAt(1)));
		min = parseInt(String(r2.charAt(3)) + String(r2.charAt(4)));
		sec = parseInt(String(r2.charAt(6)) + String(r2.charAt(7)));
			if (String(min) == "0" || String(min) == "00")
			{
				hora = hora - 1;
				min = 59;
				p_j2_dm = 1;
			}
		if (String(sec) == "0" || String(sec) == "00")
			{
				if (p_j2_dm == 0)
				{   min = min - 1;   }
				sec = 59;
			}
			else
			{    sec = sec - 1;   }
		if (String(hora).length < 2)
			hora = "0" + String(hora);
		if (String(min).length < 2)
			min = "0" + String(min);
		if (String(sec).length < 2)
			sec = "0" + String(sec);
		x = document.getElementById("tempo_j2").innerHTML = hora + ":" + min + ":" + sec;
}
function relogio_branco()
{
	var x, r1, sec, min, hora;
	var p_j1_dm = 0;
		r1 = document.getElementById("tempo_j1").innerHTML;
		hora = parseInt(String(r1.charAt(0)) + String(r1.charAt(1)));
		min = parseInt(String(r1.charAt(3)) + String(r1.charAt(4)));
		sec = parseInt(String(r1.charAt(6)) + String(r1.charAt(7)));
		if (String(min) == "0" || String(min) == "00")
		{
			hora = hora - 1;
			min = 59;
			p_j1_dm = 1;
		}
		if (String(sec) == "0" || String(sec) == "00")
		{
			if (p_j1_dm == 0)
			{    min = min - 1;   }
			sec = 59;
		}
		else
		{ sec = sec - 1;   }
		if (String(hora).length < 2)
			hora = "0" + String(hora);
		if (String(min).length < 2)
			min = "0" + String(min);
		if (String(sec).length < 2)
			sec = "0" + String(sec);
		x = document.getElementById("tempo_j1").innerHTML = hora + ":" + min + ":" + sec;	
}
function relogio()
{
	var vez_relogio, muda;
		vez_relogio = document.getElementById("seta_relogio").innerHTML;
			vez_relogio = parseInt(vez_relogio);
		if (vez_relogio == 2)
		{
			relogio_preto();
			muda = document.getElementById("pausa_relogio").getElementsByTagName('i')[0].className = "glyphicon glyphicon-pause";
			muda = document.getElementById("pausa_relogio").className = ".btn btn-danger";
		}
		else if (vez_relogio == 1)
		{
			relogio_branco();
			muda = document.getElementById("pausa_relogio").getElementsByTagName('I')[0].className = "glyphicon glyphicon-pause";
			muda = document.getElementById("pausa_relogio").className = ".btn btn-danger";
		}
		setTimeout(relogio, 1000);
}
function pausar_relogio()
{
	var x, muda, cor;
	x = document.getElementById("seta_relogio").innerHTML;
	if (x != "0")
	{
		muda = document.getElementById("seta_relogio").innerHTML = "0";
		muda = document.getElementById("pausa_relogio").getElementsByTagName('I')[0].className = "glyphicon glyphicon-play";
		muda = document.getElementById("pausa_relogio").className = "btn btn-primary";
		repete_frase("Relógio pausado");
	}
	else
	{
		cor = document.getElementById("cor_pecax").innerHTML;
		if (cor == "peca_branca")
		{
			muda = document.getElementById("seta_relogio").innerHTML = "2";
		}
		else
		{
			muda = document.getElementById("seta_relogio").innerHTML = "1";
		}
		repete_frase("Relógio despausado");
	}
}
function muda_hora_relogio()
{
	var x, hora;
	hora = document.getElementById("horas").value;
	if (hora.length < 2)
	{
		hora = "0" + hora;
	}
	else if (hora.length > 2)
	{
		hora = String(hora).charAt(1) + String(hora).charAt(2);
	}
	hora = document.getElementById("horas").value = hora;
	if (parseInt(hora) > 20)
	{
		x = document.getElementById("horas").value = "20";
		repete_frase("O numero máximo de horas é 20.");
	}
	else if (parseInt(hora) < 0)
	{
		x = document.getElementById("horas").value = "00";
		repete_frase("O numero minimo de horas é 0.");
	}
	else
	{
		repete_frase(hora + "horas");
	}
}
function muda_minutos_relogio()
{
	var x, minutos;
	minutos = document.getElementById("minutos").value;
	if (minutos.length < 2)
	{
		minutos = "0" + minutos;
	}
	else if (minutos.length > 2)
	{
		minutos = String(minutos).charAt(1) + String(minutos).charAt(2);
	}
	minutos = document.getElementById("minutos").value = minutos;
	x = document.getElementById("minutos").value;
	if (parseInt(x) > 59)
	{
		x = document.getElementById("minutos").value = "59";
		repete_frase("O numero máximo de minutos é 59.");
	}
	else if (parseInt(x) < 0)
	{
		x = document.getElementById("minutos").value = "0";
		repete_frase("O numero minimo de minutos é 0.");
	}
	else
	{
		repete_frase(minutos + "minutos");
	}
}
function muda_segundos_relogio()
{
	var x, segundos;
	segundos = document.getElementById("segundos").value;
	if (segundos.length < 2)
	{
		segundos = "0" + segundos;
	}
	else if (segundos.length > 2)
	{
		segundos = String(segundos).charAt(1) + String(segundos).charAt(2);
	}
	segundos = document.getElementById("segundos").value = segundos;
	x = document.getElementById("segundos").value;
	if (parseInt(x) > 59)
	{
		x = document.getElementById("segundos").value = "59";
		repete_frase("O numero máximo de segundos é 59.");
	}
	else if (parseInt(x) < 0)
	{
		x = document.getElementById("segundos").value = "0";
		repete_frase("O numero minimo de segundos é 0.");
	}
	else
	{
		repete_frase(segundos + "segundos");
	}
}
function reproduz_peca_selecionada(casa, conteudo)
{
	var check, frase, cor, check2;
	check = document.getElementById("opcao_cego").checked;
	if (check == true)
	{
		cor = document.getElementById(casa).getElementsByTagName("p")[0].className;
		if (cor == "peca_branca")
		{
			cor = "branco";
		}
		else
		{
			cor = "preto";
		}
		casa = String(casa);
		casa = String(numero_letra(casa.charAt(0)) + String(casa.charAt(1)));
		check2 = document.getElementById("opcao_nomes_padrao").checked;
	if (check2 == true)
	{
		casa = String(casa);
		letra_casa = casa.charAt(0);
		letra_casa = nome_padroes_cego(letra_casa);
		if (letra_casa != "false")
		{
			casa = letra_casa + casa.charAt(1);
		}
	}
		conteudo = nome_peca(conteudo);
		frase = casa + "   " + conteudo + "   " + cor + "   selecionado";
		repete_frase(frase);
	}
}
function aux_texto_fala(casa, id)
{
	var cor, peca, check, check2, letra_casa;
	check = document.getElementById("opcao_cego").checked;
	if (check == true)
	{
	peca = document.getElementById(id).getElementsByTagName("p")[0].innerHTML;
	peca = nome_peca(peca);
	cor = document.getElementById(id).getElementsByTagName("p")[0].className;
	if (cor == "peca_preta")
	{
		cor = "Preto";
	}
	else if (cor == "peca_branca")
	{
		cor = "Branco";
	}
	else
	{
		cor = "";
	}
	check2 = document.getElementById("opcao_nomes_padrao").checked;
	if (check2 == true)
	{
		casa = String(casa);
		letra_casa = casa.charAt(0);
		letra_casa = nome_padroes_cego(letra_casa);
		if (letra_casa != "false")
		{
			casa = letra_casa + casa.charAt(1);
		}
	}
	texto_fala(casa, peca, cor, 'p', 0, 0, 0);
   }
}
function nome_padroes_cego(l)
{
	if (l == "a")
		{ return "ana"; }
	else if (l == "b")
		{ return "bela"; }
	else if (l == "c")
		{ return "cesar"; }
	else if (l == "d")
		{ return "davi"; }
	else if (l == "e")
		{ return "eva"; }
	else if (l == "f")
		{ return "félix"; }
	else if (l == "g")
		{ return "gustav"; }
	else if (l == "h")
		{ return "hector"; }
	else
		{ return "false"; }
}
function nome_peca(peca)
{
	if (peca == "♖")
	{
		peca = "Torre";
	}
	else if (peca == "♘")
	{
		peca = "Cavalo";
	}
	else if (peca == "♝")
	{
		peca = "Bispo";
	}
	else if (peca == "♛")
	{
		peca = "Dama";
	}
	else if (peca == "♔")
	{
		peca = "Rei";
	}
	else if (peca == "♟")
	{
		peca = "Peão";
	}
	else
	{
		peca = "";
	}
	return peca;
}
function fala_tempo(j)
{
	var tempo, hora, min, sec, cor, check;
	check = verifica_opcao1();
	if (check == true)
	{
	if (j == 1)
	{
		tempo = document.getElementById("tempo_j1").innerHTML;
		cor = "Brancas";
	}
	else
	{
		tempo = document.getElementById("tempo_j2").innerHTML;
		cor = "Pretas";
	}	
	if (hora != "-")
		{   hora = parseInt(String(tempo.charAt(0)) + String(tempo.charAt(1)));   }
	else
		{   
	hora = String(tempo.charAt(0));
			repete_frase("menos");
		}
	min = parseInt(String(tempo.charAt(3)) + String(tempo.charAt(4)));
	sec = parseInt(String(tempo.charAt(6)) + String(tempo.charAt(7)));
	texto_fala(0, 0, 0, 'r', hora, min, sec, cor);
	}
}
function opcao1_check()
{
	var check, m;
	check = document.getElementById("opcao_cego").checked;
	if (check == true)
	{
		 check = document.getElementById("opcao_cego").checked = false;
		 m = "Opção       reproduzir pagina sonoramente.          desativado";
	}
	else
	{
		 check = document.getElementById("opcao_cego").checked = true;
		 m = "Opção        reproduzir pagina sonoramente.          ativado";
	}
		 repete_frase(m);
}
function verifica_opcao1()
{
	var check = document.getElementById("opcao_cego").checked;
	return check;
}
function opcao2_check()
{
	var check, m;
	check = document.getElementById("opcao_nomes_padrao").checked;
	if (check == true)
	{
		 check = document.getElementById("opcao_nomes_padrao").checked = false;
		 m = "Opção          nomes padrões.          desativado";
	}
	else
	{
		 check = document.getElementById("opcao_nomes_padrao").checked = true;
	     m = "Opção           nomes padrões.          ativado";
	}
	repete_frase(m);
}
function verifica_opcao2()
{
	var check = document.getElementById("opcao_nomes_padrao").checked;
	return check;
}
function texto_fala(casa, peca, cor, t, h, m, s, cor_rel)
{
	responsiveVoice.setDefaultVoice("Brazilian Portuguese Female");
	if (t == "p")
	{
		responsiveVoice.speak(casa + "   " + peca + "   " + cor);
	}
	else
	{
		responsiveVoice.speak(cor_rel + "   " + h + "horas   " + m + "minutos   " + s + "segundos");
	}
}
function repete_frase(f)
{
	var check;
	check = document.getElementById("opcao_cego").checked;
	if (check == true)
	{
	responsiveVoice.setDefaultVoice("Brazilian Portuguese Female");
	responsiveVoice.speak(f);
	}	
}
function repete_cordenada()
{
	var cord, check, letra, cont;
	cord = document.getElementById("result").value;
	if (cord != "" && cord.length == 2)
	{
		letra = cord.charAt(0);
		letra = verifica_jogada(letra);
		letra = letra + String(cord.charAt(1));
		cont = document.getElementById(letra).getElementsByTagName("p")[0].innerHTML;
		reproduz_peca_selecionada(letra, cont);
	}
}
function reproduz_situacao_jogo(tecla)
{
	var i, j, conteudo, cor, check, letra;
	check = document.getElementById("opcao_cego").checked;
	if (check == true)
	{
	for (i = 1; i <= 8; i++) {
		for (j = 1; j <= 8; j++) {
			letra = numero_letra(j);
			conteudo = document.getElementById(String(j) + String(i)).getElementsByTagName("p")[0].innerHTML;
			conteudo = nome_peca(conteudo);
			cor = document.getElementById(String(j) + String(i)).getElementsByTagName("p")[0].className;
			if (conteudo != "")
			{
				if (cor == "peca_branca")
				{
					cor = "branco";
				}
				else
				{
					cor = "preto";
				}
				responsiveVoice.setDefaultVoice("Brazilian Portuguese Female");
					responsiveVoice.speak(letra + i + "	  " + conteudo + "   " + cor);
			}
		}
	   }
	}
}
function letras_validas(l)
{
	if (l == "a" || l == "A" || l == "b" || l == "B" || l == "c" || l == "C" || l == "d" ||
		l == "D" || l == "e" || l == "E" || l == "f" || l == "F" || l == "g" || l == "G" ||
		 l == "h" || l == "H")
	{
		return l;
	}
	else
	{
		return false;
	}
}
function frase_cordenada(transcricao)
{
	var tl, tn, letra, num, ret;
	letra = 0;
	num = 0;
	for (var i = 0; i < transcricao.length; i++) {
		tl = letras_validas(transcricao.charAt(i));
		tn = transcricao.charAt(i);
		if (tl != false && letra == 0)
		{
			letra = tl;
		}
		else if ((tn == "1" || tn == "2" || tn == "3" || tn == "4" || tn == "5" || tn == "6"
			|| tn == "7" || tn == "8") && num == 0)
		{
			num = tn;
		}
		if (letra != 0 && num != 0)
		{
			break;
		}
	   }
	 if (letra != 0 && num != 0)
	 {
	 	letra = verifica_jogada(letra);
	 	ret = String(letra) + String(num);
	 	return ret;
	 }
	 else
	 {
	 	return false;
	 }
}
function en_passant()
{
	var cont_x, cont_y, cord_x, cord_y, corx, cory;
	var m, n1, n2, lx, ly, cont_esquerda, cont_direita;
	var cord_direita, cord_esquerda, cord_apaga_peao_direita, cord_apaga_peao_esquerda;
	var cord_x_acerta, cord_y_acerta;
	cord_x = document.getElementById("cord_x").innerHTML;
	cord_y = document.getElementById("cord_y").innerHTML;
	cord_x_acerta = cord_x;
	cord_y_acerta = cord_y;
	cont_x = document.getElementById("conteudo_pecax").innerHTML;
	cont_y = document.getElementById("conteudo_pecay").innerHTML;
	corx = document.getElementById("cor_pecax").innerHTML;
	cory = document.getElementById("cor_pecay").innerHTML;
	lx = String(cord_x.charAt(0));
	ly = String(cord_y.charAt(0));
	nx = String(cord_x.charAt(1));
	ny = String(cord_y.charAt(1));
	if (cont_x == "♟" && (cont_y == "" || cont_y == " "))
	{
		cord_direita = String(parseInt(parseInt(lx) + 1)) + String(nx);
	  if (cord_direita < 90)
	  {
	cord_apaga_peao_direita = cord_direita;
	cont_direita = document.getElementById(cord_direita).getElementsByTagName('p')[0].innerHTML;
		}
		else {cont_direita = "false";}
	cord_esquerda = String(parseInt(parseInt(lx) - 1) + String(nx));
	if (cord_esquerda > 10)
	{
	cord_apaga_peao_esquerda = cord_esquerda;
	cont_esquerda = document.getElementById(cord_esquerda).getElementsByTagName('p')[0].innerHTML;
	 }
	 else {cont_esquerda = "false";}
		if (nx == 5 && corx == "peca_branca")
		{
		 if (cont_direita == "♟")
		  {
			if ((ly == parseInt(parseInt(lx)+1)) && ny == 6)
			  {
			  	execute_en_passant("branco", cord_direita, cord_apaga_peao_direita);
			  	return true;
			  }
		   }
		if (cont_esquerda == "♟")
			{
			 if ((ly == parseInt(parseInt(lx)-1) && ny == 6))
			 {
			 	execute_en_passant("branco", cord_esquerda, cord_apaga_peao_esquerda);
			  	return true;
			 }
		  }
		}
		else if (nx == 4 && corx == "peca_preta")
		{
			if (cont_direita == "♟")
			{
				if ((ly == parseInt(parseInt(lx)+1)) && ny == 3)
			  {
			  	execute_en_passant("preto", cord_direita, cord_apaga_peao_direita);
			  	return true;
			  }
			}
			if (cont_esquerda == "♟")
			{
			 if ((ly == parseInt(parseInt(lx)-1) && ny == 3))
			 {
			 	execute_en_passant("preto", cord_esquerda, cord_apaga_peao_esquerda);
			  	return true;
			  }
			}
		}
	}
	m = document.getElementById("cord_x").innerHTML = cord_x_acerta;
	m = document.getElementById("cord_y").innerHTML = cord_y_acerta;
	m = document.getElementById("en_passant").innerHTML = "false";
	return false;
}
function execute_en_passant(cor, cord_peao, cord_apaga_peao)
{
	var m;
	if (cor == "branco")
	{
  	m = document.getElementById("cor_pecax").innerHTML = "peca_branca";
  	m = document.getElementById("cor_pecay").innerHTML = "peca_preta";
 	m = document.getElementById("conteudo_pecax").innerHTML = "♟";
	}
	else
	{
  	m = document.getElementById("cor_pecax").innerHTML = "peca_preta";
  	m = document.getElementById("cor_pecay").innerHTML = "peca_branca";
 	m = document.getElementById("conteudo_pecax").innerHTML = "♟";
	}
	m = document.getElementById(cord_peao).innerHTML = "<p> </p>";
	m = document.getElementById("peao_en_passant").innerHTML = cord_apaga_peao;
  	m = document.getElementById("conteudo_pecay").innerHTML = "";
	m = document.getElementById("en_passant").innerHTML = "true";
}
function inicia_pagina()
{
	var x;
	x = document.getElementById("opcao_auxilia_jogada").checked = true;
	relogio();
}
$(document).ready(function(){
  $(document).keypress(function(e){
	if (e.wich == 32 || e.keyCode == 32){    // espaço
		reproduz_situacao_jogo();
	}
	else if (e.wich == 33 || e.keyCode == 33)   // !
	{
		opcao1_check();
	}
	else if (e.wich == 64 || e.keyCode == 64)   // @
	{
		opcao2_check();
	}
	else if (e.wich == 35 || e.keyCode == 35)    // #
	{
		opcao3_check();
	}
  })
})