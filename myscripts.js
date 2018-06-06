
document.addEventListener('mousedown', mousedown, false);
document.addEventListener('mouseup', mouseup, false);
var $xcoorTo,$xcoorFrom,$swipeTime,$speed;
var $scrollPos;
var $scrollItem;
var $mouseisdown = false;
function mousedown(evt)
{
	$scrollItem = document.getElementById('scrollId');
	$mouseisdown = true;
	var $d = new Date();
	$swipeTime = $d.getTime();
	$xcoorFrom =  evt.screenX;
	//alert("hi");
}

function mouseup(evt)
{
	$xcoorTo =  evt.screenX;
	var $d = new Date();
	var $timeNow = $d.getTime();
	$speed = 1;
	//alert("hi");
	$timeNow = $timeNow- $swipeTime;
	var $res = ($xcoorFrom-$xcoorTo)/$timeNow*1000;
	//$scrollItem.scrollLeft += $xcoorFrom-$xcoorTo;
	setTimeout(function() {scrolRealization();}, 10);
	alert();
}
function scrolRealization()
{
	$scrollItem.scrollLeft += $speed;
	setTimeout(function() {scrolRealization();}, 10);
}