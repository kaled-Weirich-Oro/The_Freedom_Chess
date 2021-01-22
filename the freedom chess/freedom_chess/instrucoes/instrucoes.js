function inicia_pagina()
{
	var url = window.location.search.replace("?", "");
	if (url == "codigo=1")
	{
		mostra_subtitulo("comando_voz");
	}
	else if (url == "codigo=2") 
	{
		mostra_subtitulo("digitacao");
	}
}
function mostra_subtitulo(id)
{
	esconde_subtitulos();
	var x;
	x = document.getElementById(id).style.display = "block";
	x = document.getElementById(id).style.visibility = "visible";
	desselecionar_n_instrucao();
}
function esconde_subtitulos()
{
	var x;
	x = document.getElementById("introducao").style.display = "none";
	x = document.getElementById("introducao").style.visibility = "hidden";
	x = document.getElementById("comando_voz").style.display = "none";
	x = document.getElementById("comando_voz").style.visibility = "hidden";
	x = document.getElementById("digitacao").style.display = "none";
	x = document.getElementById("digitacao").style.visibility = "hidden";
}
function pinta_n_instrucao(id)
{
	var x;
	desselecionar_n_instrucao();
	x = document.getElementById(id).style.backgroundColor = "#111111";
	x = document.getElementById(id).style.color = "#EEEEEE";
}
function desselecionar_n_instrucao()
{
	var i;
	for (i = 1; i <= 8; i++)
	{
		x = document.getElementById(i).style.backgroundColor = "#FFFFFF";
	}
}