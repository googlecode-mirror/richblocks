// ================================================================
//                   ------ dock menu -------
// script by Gerard Ferrandez - Ge-1-doot - February 2006
// http://www.dhteumeuleu.com
//
// Todos os cr�ditos deste script vai para o Gerard Ferrandez
// Quem tiver oportunidade acesse o site dele. � muito bom o que o cara faz
//
// ================================================================

function dock(dock, sMin, sMax)
{
	this.icons = document.getElementById(dock).getElementsByTagName('img');
	this.N = this.icons.length;
	this.s = sMin;
	this.ovk = 0;
	this.pxLeft = function(o)
	{
		for(var x=-document.documentElement.scrollLeft; o != null; o = o.offsetParent) x+=o.offsetLeft;
		return x;
	}
	for(var i=0;i<this.N;i++)
	{
		with(this.icons[i])
		{
			style.width = sMin+"px";
			style.height = sMin+"px";
			className = "dockicon";
		}
	}
	this.run = function()
	{
		with(this)
		{
			for(var i=0;i<N;i++)
			{
				var o = icons[i];
				var W = parseInt(o.style.width);
				if(ov && ov.className=="dockicon")
				{
					if(ov!=ovk)
					{
						ovk=ov;
						document.getElementById("legend").innerHTML = ov.lang;
					}
					if(M) W = Math.max((s*Math.cos(((pxLeft(o)+W/2)-xm)/sMax)),sMin);
					s = Math.min(sMax,s+1);
				}
				else
				{
					s = Math.max(s-1,sMin);
					W = Math.max(W-N,sMin);
				}
				o.style.width = W+"px";
				o.style.height = W+"px";
			}
			if(s >= sMax) M = false;
		}
	}
}