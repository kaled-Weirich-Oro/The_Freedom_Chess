function opcao3_check()
{
	var check, m;
	check = document.getElementById("opcao_auxilia_jogada").checked;
	if (check == true)
	{
		 check = document.getElementById("opcao_auxilia_jogada").checked = false;
		 m = "Opção   auxilia jogada.          desativado";
	}
	else
	{
		 check = document.getElementById("opcao_auxilia_jogada").checked = true;
		 m = "Opção   auxilia jogada.          ativado";
	}
	repete_frase(m);
}
function verifica_opcao3()
{
	var x = document.getElementById("opcao_auxilia_jogada").checked;
	return x;
}
function mostra_possiveis_jogadas()
{
	var aux_jogada, cord_x, cord_y, cont, cord, jogada;
	aux_jogada = verifica_opcao3();	
	if (aux_jogada == true)
	{
	cord = document.getElementById("result").value;
	if (cord.length == 2)
	{
	cord_x = String(cord).charAt(0);
		cord_y = String(cord).charAt(1);
	cord_x = verifica_jogada(cord_x);
	cord = cord_x + cord_y;
	cont = document.getElementById(cord).getElementsByTagName("p")[0].innerHTML;
	if (cont == "♟")
		{   
			var cor = document.getElementById(cord).getElementsByTagName("p")[0].className;
			if (cor == "peca_branca")
				{ jogadas_peao_branco(cord_x, cord_y); }
			else if (cor == "peca_preta")
				{ jogadas_peao_preto(cord_x, cord_y); }
	     }
	else if (cont =="♖")
		{   jogadas_torre(cord_x, cord_y); }
	else if (cont =="♘")
		{   jogadas_cavalo(cord_x, cord_y); }
	else if (cont =="♝")
		{   jogadas_bispo(cord_x, cord_y); }
	else if (cont =="♛")
		{   jogadas_dama(cord_x, cord_y); }
	else if (cont =="♔")
		{   jogadas_rei(cord_x, cord_y); }
	}
	}
}
function pinta_possiveis_jogadas(cx, cy, lado)
{
	var cor_adv, cor_minha;
	cx = parseInt(cx);
	cy = parseInt(cy);
	while ((cy <= 8 && cy >= 1) && (cx <= 8 && cx >= 1))
	{
		if (lado == "frente")
			{ cy = parseInt(cy) + 1; }
		else if (lado == "atras")
			{ cy = parseInt(cy) - 1; }
		else if (lado == "direita")
			{ cx = parseInt(cx) + 1; }
		else if (lado == "esquerda")
			{ cx = parseInt(cx) - 1; }
		else if (lado == "esquerda_frente")
			{ cx = parseInt(cx) - 1;
			  cy = parseInt(cy) + 1; }
		else if (lado == "direita_frente")
			{ cx = parseInt(cx) + 1;
			  cy = parseInt(cy) + 1; }
		else if (lado == "esquerda_atras")
			{ cx = parseInt(cx) - 1;
			  cy = parseInt(cy) - 1; }
		else if (lado == "direita_atras")
			{ cx = parseInt(cx) + 1;
			  cy = parseInt(cy) - 1; }
		if ((cy <= 8 && cy >= 1) && (cx <= 8 && cx >= 1))
		{
		aux = String(cx) + String(cy);
		conteudo = document.getElementById(aux).getElementsByTagName("p")[0].innerHTML;
		}
		else { conteudo = "falso"; break; }
	if (conteudo == "" || conteudo == " ")
	{
		x = document.getElementById(aux).getElementsByTagName("p")[0].className = "casa_possivel";
	}
	else 
		{ 
			pinta_pecas_jogadas_possiveis(aux);
			break; 
		}		
	}
}
function pinta_pecas_jogadas_possiveis(aux)
{
	var cor_adv, cor_m;
	cor_m = document.getElementById("peca_pinta_adv").innerHTML;
	cor_adv = document.getElementById(aux).getElementsByTagName("p")[0].className;
	if (cor_adv == "peca_preta" && cor_m == "peca_branca")
	{
	   x = document.getElementById(aux).getElementsByTagName("p")[0].className = "peca_preta casa_peca_possivel";
	}
	else if (cor_adv == "peca_branca" && cor_m == "peca_preta")
	{
		x = document.getElementById(aux).getElementsByTagName("p")[0].className = "peca_branca casa_peca_possivel";				
	}
}
function limpa_jogadas_possiveis()
{
	var i, j, x, id;
	for (i = 1;i <= 8; i++)
	{
		for (j = 1;j <= 8; j++)
		{
			id = String(j) + String(i);
	x = document.getElementById(id).getElementsByTagName("p")[0].className;
			if (x == "casa_possivel")
			{
		       x = document.getElementById(id).getElementsByTagName("p")[0].className = "";			
			}
			else if (x == "peca_branca casa_peca_possivel")
			{
				x = document.getElementById(id).getElementsByTagName("p")[0].className = "peca_branca";
			}
			else if (x == "peca_preta casa_peca_possivel")
			{
				x = document.getElementById(id).getElementsByTagName("p")[0].className = "peca_preta";
			}
		}
	}
}
function jogadas_peao_branco(cx, cy)
{
	var cord, conteudo, conteudo2, conteudo3, conteudo4, x, auxx, auxy;
	var classe3, classe4, cor;
	if (cy == "2")
	{
		conteudo2 = document.getElementById(cx + "3").getElementsByTagName("p")[0].innerHTML;
		conteudo = document.getElementById(cx + "4").getElementsByTagName("p")[0].innerHTML;
	if ((conteudo == " " || conteudo == "") && (conteudo2 == " " || conteudo2 == ""))
	{
		x = document.getElementById(cx + "4").getElementsByTagName("p")[0].className = 	"casa_possivel";
	}
	}
	auxx = parseInt(cx);
	auxy = parseInt(cy);
	cy = parseInt(cy) + 1;
	pinta_casa(cx, cy, "p");
	cy = auxy;
	cx = auxx;
	cy = parseInt(cy) + 1;
	cx = parseInt(cx) + 1;
	pinta_adv_peao(cx, cy, "peca_preta");
	cy = auxy;
	cx = auxx;
	cx = parseInt(cx) - 1;
	cy = parseInt(cy) + 1;
	pinta_adv_peao(cx, cy, "peca_preta");
	cx = auxx;
	cy = auxy;
	pinta_en_passant_branco(String(cx), String(cy));
}
function pinta_en_passant_branco(cx, cy)
{
	var conteudo, conteudo2, cor, cor2, id, u_cordx, u_cordy;
	var u_cx1, u_cx2, u_cy1, u_cy2;
	u_cordx = document.getElementById("cord_x").innerHTML;
	u_cordy = document.getElementById("cord_y").innerHTML;
	u_cx1 = String(u_cordx).charAt(0);
	u_cx2 = String(u_cordy).charAt(0);
	u_cy1 = String(u_cordx).charAt(1);
	u_cy2 = String(u_cordy).charAt(1);
	if (cy == "5")
	{
		id = parseInt(cx) + 1; // lado direito
		if (id <= 8 && u_cy1 == "7" && u_cy2 == "5" && u_cx1 == String(id) && u_cx2 == String(id))
		{
		conteudo = document.getElementById(id + "5").getElementsByTagName("p")[0].innerHTML;
		cor = document.getElementById(id + "5").getElementsByTagName("p")[0].className;
	   	   if (conteudo == "♟" && cor == "peca_preta")
	       	{
	       		muda = document.getElementById(String(id) + "6").getElementsByTagName("p")[0].className = "casa_possivel";
	    	}
		}
		id = parseInt(cx) - 1; // lado esquerdo
		if (id <= 8 && u_cy1 == "7" && u_cy2 == "5" && u_cx1 == String(id) && u_cx2 == String(id))
		{
		conteudo = document.getElementById(id + "5").getElementsByTagName("p")[0].innerHTML;
		cor = document.getElementById(id + "5").getElementsByTagName("p")[0].className;
	   	   if (conteudo == "♟" && cor == "peca_preta")
	       	{
	       		muda = document.getElementById(String(id) + "6").getElementsByTagName("p")[0].className = "casa_possivel";
	    	}
		}
	}
}
function pinta_en_passant_preto(cx, cy)
{
	var conteudo, conteudo2, cor, cor2, id, u_cordx, u_cordy;
	var u_cx1, u_cx2, u_cy1, u_cy2;
	u_cordx = document.getElementById("cord_x").innerHTML;
	u_cordy = document.getElementById("cord_y").innerHTML;
	u_cx1 = String(u_cordx).charAt(0);
	u_cx2 = String(u_cordy).charAt(0);
	u_cy1 = String(u_cordx).charAt(1);
	u_cy2 = String(u_cordy).charAt(1);
	if (cy == "4")
	{
		id = parseInt(cx) + 1; // lado direito
		if (id <= 8 && u_cy1 == "2" && u_cy2 == "4" && u_cx1 == String(id) && u_cx2 == String(id))
		{
		conteudo = document.getElementById(id + "4").getElementsByTagName("p")[0].innerHTML;
		cor = document.getElementById(id + "4").getElementsByTagName("p")[0].className;
	   	   if (conteudo == "♟" && cor == "peca_branca")
	       	{
	       		muda = document.getElementById(String(id) + "3").getElementsByTagName("p")[0].className = "casa_possivel";
	    	}
		}
		id = parseInt(cx) - 1; // lado esquerdo
		if (id <= 8 && u_cy1 == "2" && u_cy2 == "4" && u_cx1 == String(id) && u_cx2 == String(id))
		{
		conteudo = document.getElementById(id + "4").getElementsByTagName("p")[0].innerHTML;
		cor = document.getElementById(id + "4").getElementsByTagName("p")[0].className;
	   	   if (conteudo == "♟" && cor == "peca_branca")
	       	{
	       		muda = document.getElementById(String(id) + "3").getElementsByTagName("p")[0].className = "casa_possivel";
	    	}
		}
	}
}
function pinta_adv_peao(cx, cy, cor_adv)
{
	var conteudo, aux;
	if ((cy <= 8 && cy >= 1) && (cx <= 8 && cx >= 1))
	{
		aux = String(cx) + String(cy);
	   conteudo = document.getElementById(aux).getElementsByTagName("p")[0].innerHTML;
	   cor = document.getElementById(aux).getElementsByTagName("p")[0].className;
	   if (cor == cor_adv && (conteudo != " " || conteudo != ""))
	   {
	   	pinta_pecas_jogadas_possiveis(aux);
	   }
	}
}
function jogadas_peao_preto(cx, cy)
{
	var cord, conteudo, conteudo2, auxx, auxy;
	auxx = parseInt(cx);
	auxy = parseInt(cy);
	if (cy == "7")
	{
		conteudo2 = document.getElementById(cx + "6").getElementsByTagName("p")[0].innerHTML;
		conteudo = document.getElementById(cx + "5").getElementsByTagName("p")[0].innerHTML;
	if ((conteudo == " " || conteudo == "") && (conteudo2 == " " || conteudo2 == ""))
	{
		x = document.getElementById(cx + "5").getElementsByTagName("p")[0].className = 	"casa_possivel";
	}
	}
	cy = parseInt(cy) - 1;
	pinta_casa(cx, cy, "p");
	cy = auxy;
	cx = auxx;
	cy = parseInt(cy) - 1;
	cx = parseInt(cx) + 1;
	pinta_adv_peao(cx, cy, "peca_branca");
	cy = auxy;
	cx = auxx;
	cx = parseInt(cx) - 1;
	cy = parseInt(cy) - 1;
	pinta_adv_peao(cx, cy, "peca_branca");
	cy = auxy;
	cx = auxx;
	pinta_en_passant_preto(String(cx), String(cy));
}
function jogadas_bispo(cx, cy)
{
	pinta_possiveis_jogadas(cx, cy, "direita_frente");
	pinta_possiveis_jogadas(cx, cy, "direita_atras");
	pinta_possiveis_jogadas(cx, cy, "esquerda_frente");
	pinta_possiveis_jogadas(cx, cy, "esquerda_atras");
}
function jogadas_dama(cx, cy)
{
	pinta_possiveis_jogadas(cx, cy, "direita_frente");
	pinta_possiveis_jogadas(cx, cy, "direita_atras");
	pinta_possiveis_jogadas(cx, cy, "esquerda_frente");
	pinta_possiveis_jogadas(cx, cy, "esquerda_atras");
	pinta_possiveis_jogadas(cx, cy, "frente");
	pinta_possiveis_jogadas(cx, cy, "atras");
	pinta_possiveis_jogadas(cx, cy, "esquerda");
	pinta_possiveis_jogadas(cx, cy, "direita");
}
function jogadas_torre(cx, cy)
{	
	pinta_possiveis_jogadas(cx, cy, "frente");
	pinta_possiveis_jogadas(cx, cy, "atras");
	pinta_possiveis_jogadas(cx, cy, "esquerda");
	pinta_possiveis_jogadas(cx, cy, "direita");
}
function jogadas_cavalo(cx, cy)
{
	var x, cord, auxx, auxy, conteudo;
	auxx = cx;
	auxy = cy;
	cord = String(cx) + String(cy);
	cy = parseInt(cy) + 2;
	cx = parseInt(cx) + 1;
	pinta_casa(cx, cy, "c");
	cx = parseInt(cx) - 2;
	pinta_casa(cx, cy, "c");
	cx = auxx;
	cy = auxy;
	cx = parseInt(cx) - 2;
	cy = parseInt(cy) + 1;
	pinta_casa(cx, cy, "c");
	cy = parseInt(cy) - 2;
	pinta_casa(cx, cy, "c");
	cx = auxx;
	cy = auxy;
	cx = parseInt(cx) + 2;
	cy = parseInt(cy) + 1;
	pinta_casa(cx, cy, "c");
	cy = parseInt(cy) - 2;
	pinta_casa(cx, cy, "c");
	cx = auxx;
	cy = auxy;
	cy = parseInt(cy) - 2;
	cx = parseInt(cx) + 1;
	pinta_casa(cx, cy, "c");
	cx = parseInt(cx) - 2;
	pinta_casa(cx, cy, "c");
}
function jogadas_rei(cx, cy)
{
	var auxx, auxy;
	auxx = parseInt(cx);
	auxy = parseInt(cy);
	cx = parseInt(cx) + 1;
		pinta_casa(cx, cy, "r");
	cy = parseInt(cy) + 1;
			pinta_casa(cx, cy, "r");
	cy = parseInt(cy) - 2;
			pinta_casa(cx, cy, "r");
		cx = auxx;
		cy = auxy
	cy = parseInt(cy) + 1;
			pinta_casa(cx, cy, "r");
	cy = parseInt(cy) - 2;
			pinta_casa(cx, cy, "r");
		cx = auxx;
		cy = auxy;
	cx = parseInt(cx) - 1;
			pinta_casa(cx, cy, "r");
	cy = parseInt(cy) + 1;
			pinta_casa(cx, cy, "r");
    cy = parseInt(cy) - 1;
    		pinta_casa(cx, cy, "r");
    cy = parseInt(cy) - 1;
    		pinta_casa(cx, cy, "r");
   	cx = auxx;
   	cy = auxy;
   	verifica_rock(cx, cy);
}
function verifica_rock(cx, cy)
{
	var cor, possivel_b, possivel_p;
	possivel_b = document.getElementById("rock_branco").innerHTML;
	possivel_p = document.getElementById("rock_preto").innerHTML;
	cor = document.getElementById(String(cx) + String(cy)).getElementsByTagName("p")[0].className;	
	cx = String(cx);
	cy = String(cy);
	if (cx == "5")
	{
		if (cy == "1" && cor == "peca_branca" && possivel_b == "0")    // rock brancas
		{
			rock_branco_direita(cx, cy);
			rock_branco_esquerda(cx, cy);
		}
		else if (cy == "8" && cor == "peca_preta" && possivel_p == "0")     // rock pretas
		{
			rock_preto_direita(cx, cy);
			rock_preto_esquerda(cx, cy);
		}
	}
}
function rock_preto_esquerda(cx, cy)
{
	var conteudo48, conteudo38, conteudo28, conteudo18, cor;
	cor = document.getElementById("18").getElementsByTagName("p")[0].className;
	conteudo48 = document.getElementById("48").getElementsByTagName("p")[0].innerHTML;
	conteudo38 = document.getElementById("38").getElementsByTagName("p")[0].innerHTML;
	conteudo28 = document.getElementById("28").getElementsByTagName("p")[0].innerHTML;
	conteudo18 = document.getElementById("18").getElementsByTagName("p")[0].innerHTML;
	if ((conteudo48 == " " || conteudo48 == "") && (conteudo38 == " " || conteudo38 == "")
	 && (conteudo28 == " " || conteudo28 == "")	&& (conteudo18 == "♖") && (cor == "peca_preta"))
	{
		pinta_casa(3, 8, "r");
	}
}
function rock_preto_direita(cx, cy)
{
	var conteudo68, conteudo78, conteudo88, cor;
	cor = document.getElementById("88").getElementsByTagName("p")[0].className;
	conteudo68 = document.getElementById("68").getElementsByTagName("p")[0].innerHTML;
	conteudo78 = document.getElementById("78").getElementsByTagName("p")[0].innerHTML;
	conteudo88 = document.getElementById("88").getElementsByTagName("p")[0].innerHTML;
	if ((conteudo68 == " " || conteudo68 == "") && (conteudo78 == " " || conteudo78 == "")
		&& (conteudo88 == "♖") && (cor == "peca_preta"))
	{
		pinta_casa(7, 8, "r");
	}
}
function rock_branco_direita(cx, cy)
{
	var conteudo61, conteudo71, conteudo81, cor;
	cor = document.getElementById("81").getElementsByTagName("p")[0].className;
	conteudo61 = document.getElementById("61").getElementsByTagName("p")[0].innerHTML;
	conteudo71 = document.getElementById("71").getElementsByTagName("p")[0].innerHTML;
	conteudo81 = document.getElementById("81").getElementsByTagName("p")[0].innerHTML;
	if ((conteudo61 == " " || conteudo61 == "") && (conteudo71 == " " || conteudo71 == "")
		&& (conteudo81 == "♖") && (cor == "peca_branca"))
	{
		pinta_casa(7, 1, "r");
	}
}
function rock_branco_esquerda(cx, cy)
{
	var conteudo41, conteudo31, conteudo21, conteudo11, cor;
	cor = document.getElementById("11").getElementsByTagName("p")[0].className;
	conteudo41 = document.getElementById("41").getElementsByTagName("p")[0].innerHTML;
	conteudo31 = document.getElementById("31").getElementsByTagName("p")[0].innerHTML;
	conteudo21 = document.getElementById("21").getElementsByTagName("p")[0].innerHTML;
	conteudo11 = document.getElementById("11").getElementsByTagName("p")[0].innerHTML;
	if ((conteudo41 == " " || conteudo41 == "") && (conteudo31 == " " || conteudo31 == "")
	 && (conteudo21 == " " || conteudo21 == "")	&& (conteudo11 == "♖") && (cor == "peca_branca"))
	{
		pinta_casa(3, 1, "r");
	}
}
function joga_torre_rock()
{
	var opc3, u_cx, u_cy, u_cont, muda, u_cor;
	opc3 = verifica_opcao3();
	if (opc3 == true)
	{
		u_cx = document.getElementById("cord_x").innerHTML;
		u_cy = document.getElementById("cord_y").innerHTML;
		u_cont = document.getElementById("conteudo_pecax").innerHTML;
		if (u_cont == "♔")
		{
			if (u_cx == "51")
			{
				if (u_cy == "71") // rock branco direito
				{
					muda = document.getElementById("81").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("81").getElementsByTagName("p")[0].className = "";
					muda = document.getElementById("61").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("61").getElementsByTagName("p")[0].className = "peca_branca";
					muda = "   Torre branca de h1 para f1. Roque branco pequeno";
					muda = document.getElementById("rock_branco").innerHTML = "1";
					repete_frase(muda);
				}
				else if (u_cy == "31") // rock branco esquerdo
				{
					muda = document.getElementById("11").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("11").getElementsByTagName("p")[0].className = "";
					muda = document.getElementById("41").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("41").getElementsByTagName("p")[0].className = "peca_branca";
					muda = "Torre branca de a1 para d1.    Roque branco grande.";
					muda = document.getElementById("rock_branco").innerHTML = "1";
					repete_frase(muda);
				}		
			}
			else if (u_cx == "58")
			{
				if (u_cy == "78") // rock preto direito
				{
					muda = document.getElementById("88").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("88").getElementsByTagName("p")[0].className = "";
					muda = document.getElementById("68").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("68").getElementsByTagName("p")[0].className = "peca_preta";
					muda = "Torre branca de h8 para f8. Roque preto pequeno";
					muda = document.getElementById("rock_preto").innerHTML = "1";
					repete_frase(muda);
				}
				else if (u_cy == "38") // rock preto esquerdo
				{
					muda = document.getElementById("18").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("18").getElementsByTagName("p")[0].className = "";
					muda = document.getElementById("48").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("48").getElementsByTagName("p")[0].className = "peca_preta";
					muda = "   Torre preta de a8 para d8.  Roque preto grande.";
					muda = document.getElementById("rock_preto").innerHTML = "1";
					repete_frase(muda);
				}
			}
		}
	}
}
function volta_jogada_rock()
{
var opc3, u_cx, u_cy, u_cont, muda;
	opc3 = verifica_opcao3();
	if (opc3 == true)
	{
		u_cx = document.getElementById("cord_x").innerHTML;
		u_cy = document.getElementById("cord_y").innerHTML;
		u_cont = document.getElementById("conteudo_pecax").innerHTML;
		if (u_cont == "♔")
		{
			if (u_cx == "51")
			{
				if (u_cy == "71") // rock branco direito
				{
					muda = document.getElementById("81").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("81").getElementsByTagName("p")[0].className = "peca_branca";
					muda = document.getElementById("61").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("61").getElementsByTagName("p")[0].className = "";
					muda = "Torre branca f1 para h1.";
					muda = document.getElementById("rock_branco").innerHTML = "0";
					repete_frase(muda);
				}
				else if (u_cy == "31") // rock esquerdo branco
				{
					muda = document.getElementById("41").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("41").getElementsByTagName("p")[0].className = "";
					muda = document.getElementById("11").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("11").getElementsByTagName("p")[0].className = "peca_branca";
						muda = "Torre branca c1 para a1.";
					muda = document.getElementById("rock_branco").innerHTML = "0";
					repete_frase(muda);
				}
			}
			else if (u_cx == "58")
			{
				if (u_cy == "78") // rock preto direito
				{
					muda = document.getElementById("88").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("88").getElementsByTagName("p")[0].className = "peca_preta";
					muda = document.getElementById("68").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("68").getElementsByTagName("p")[0].className = "";
					muda = "   Torre branca de f8 para h8.";
					muda = document.getElementById("rock_preto").innerHTML = "0";
					repete_frase(muda);
				}
				else if (u_cy == "38") // rock preto esquerdo
				{
					muda = document.getElementById("18").getElementsByTagName("p")[0].innerHTML = "♖";
					muda = document.getElementById("18").getElementsByTagName("p")[0].className = "peca_preta";
					muda = document.getElementById("48").getElementsByTagName("p")[0].innerHTML = "";
					muda = document.getElementById("48").getElementsByTagName("p")[0].className = "";
					muda = "   Torre preta de d8 para a8.";
					muda = document.getElementById("rock_preto").innerHTML = "0";
					repete_frase(muda);
				}
			}
		}
	}	
}
function pinta_casa(cx, cy, peca)
{
	var conteudo, cord;
	if ((cy <= 8 && cy >= 1) && (cx <= 8 && cx >= 1))
	{
	   cord = String(cx) + String(cy);
	   conteudo = document.getElementById(cord).getElementsByTagName("p")[0].innerHTML;
	   if (conteudo == " " || conteudo == "")
	       {
		x = document.getElementById(cord).getElementsByTagName("p")[0].className = 	"casa_possivel";
	       }
	    else 
		{ 
			if (peca != "p")
			{    pinta_pecas_jogadas_possiveis(cord);      }
		}		
	}
}
function valida_casa_possivel(casa)
{
	var classe;
	classe = document.getElementById(casa).getElementsByTagName("p")[0].className;
	if (classe == "casa_possivel" || classe == "peca_preta casa_peca_possivel"
		|| classe == "peca_branca casa_peca_possivel")
	{
		return true;
	}
	else
	{ 
		repete_frase("Jogada não permitida.      selecione uma peça novamente");
		return false; 
	}
}
function seta_foco_hora()
{
	var x, m;
	x = document.getElementById("titulos_relogio").style.visibility;
	if (x == "hidden")
	{
		mostra_edita_tempo();
	}
		m = document.getElementById("hora").focus();
}