
document.addEventListener('mousedown', mousedown, false);
document.addEventListener('mouseup', mouseup, false);
document.addEventListener('mousemove', mousemove, false);
var $xcoorTo,$xcoorFrom,$swipeTime,$speed;
var $scrollPos;
var $scrollItem;
var $mouseisdown = false;
function mousedown(evt)
{
	$scrollItem = document.getElementById('scrollId');
	$mouseisdown = true;
}

function mousemove(evt)
{
	$xcoorTo =  evt.screenX;
	if ($mouseisdown )
	{
		$scrollItem.scrollLeft += $xcoorFrom-$xcoorTo;
		$speed = $xcoorFrom-$xcoorTo;
	}
	$xcoorFrom=  evt.screenX;
	//alert("hi");
}

function mouseup(evt)
{
	$mouseisdown = false;
	//alert($speed);
	speedProceed();
}
function speedProceed()
{
	if ((!($mouseisdown))&&(($speed > 1)||($speed < -1)))
	{
		$scrollItem.scrollLeft += $speed;
		$speed *= 0.98;
		setTimeout(function() {speedProceed();}, 10)
	}
}
