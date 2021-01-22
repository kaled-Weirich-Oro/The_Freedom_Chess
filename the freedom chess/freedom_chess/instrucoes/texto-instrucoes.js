function pinta_n_instrucao(id)
{
	var x;
	desselecionar_n_instrucao();
	x = document.getElementById(id).style.backgroundColor = "#FFBF00";
}
function desselecionar_n_instrucao()
{
	var i;
	for (i = 1; i <= 8; i++)
	{
		x = document.getElementById(i).style.backgroundColor = "#FFFFFF";
	}
}
