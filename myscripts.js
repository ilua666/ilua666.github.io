
document.addEventListener('mousedown', mousedown, false);
document.addEventListener('mouseup', mouseup, false);
document.addEventListener('mousemove', mousemove, false);
window.ondragstart = function() { return false; } 
var xcoorTo,xcoorFrom,speed;
var scrollItem;
var searchStr = "";
var mouseisdown = false;
const maxSize = 320;
const apiPrefix = "https://www.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&key=AIzaSyB8iFzdNo8E2OuiJeIhHPSXpbh3psn8mvQ&q="
const youtubePrefix = "https://www.youtube.com/watch?v="
var elementwidth = 320;
var blockArr = [];
const accel = 1;
var searchResult;
var inInEnd = false;


function mousedown(evt)
{
	mouseisdown = true;
}

function mousemove(evt)
{
	xcoorTo =  evt.screenX;
	if (mouseisdown )
	{
		scrollItem.scrollLeft += xcoorFrom-xcoorTo;
		speed = xcoorFrom-xcoorTo;
	}
	xcoorFrom=  evt.screenX;
	//alert("hi");
}

function mouseup(evt)
{
	mouseisdown = false;
	speedProceed();
}

function resize()
{
	var scrollpoint = scrollItem.scrollLeft;                  //Ещё одна функция, что принесла боль
	var curretSeen = Math.floor((scrollpoint+2)/elementwidth);       //высчитываем на каком элементе остановочка
	var newWindowSize = document.getElementById('body').clientWidth;
	var targetOnScreen = Math.floor(newWindowSize/maxSize) + 1;      //Считаем сколько элементов на экране должно быть
	var targetBlockArraySize = targetOnScreen*maxSize;				//Размер окна для этого числа элементов
	var targetAndWindowDif = newWindowSize - targetBlockArraySize;
	var sizeCurrection = targetAndWindowDif / targetOnScreen;		
	var currectedSize = (maxSize + sizeCurrection - 20)+'px';		//высчитываем коррекционный размер для каждого.
	for (var i = 0; i < blockArr.length; i++)						//математика и бумага рулит
	{
		blockArr[i].style.width = currectedSize;
	}
	elementwidth = maxSize + sizeCurrection;
	scrollItem.scrollLeft = curretSeen*elementwidth;
}

function speedProceed()
{
	if ((!(mouseisdown))&&(Math.abs(speed) > 1))
	{
		scrollItem.scrollLeft += speed;
		if (speed > 0)
		{
			speed -= accel;
		}
		else 
		{
			speed += accel;
		}
		setTimeout(function() {speedProceed();}, 10)
	}
	else
	{
		if (Math.abs(speed) <= 1)
		{
			positionNiceficator();
		}
	}
	var scrollpoint = scrollItem.scrollLeft;
	var WindowSize = document.getElementById('body').clientWidth;
	if ((scrollpoint+WindowSize+30 > listBlock.clientWidth) && !(inInEnd))
	{
		inInEnd = true;
		alert("мы в конце, прогрузочка");
	}
	if (scrollpoint+WindowSize < listBlock.clientWidth - maxSize*2)
	{
		inInEnd = false;
	}
}


function loading()
{
	scrollItem = document.getElementById('scrollId');
	listBlock = document.getElementById('listBlock');
	for (var i = 0; i < 30; i++)
	{
		var element = document.createElement('div');
    	element.className = 'blockwithborder';
    	element.style.width = '300px';
    	listBlock.appendChild(element);
    	blockArr.push(element);
	}
	resize();
}


function speedNiceficator() 							//он выравнивает по скорости, но не работает нормально, аааааа
{														//ненужный, неиспользуемый, похороненный
	var startX = scrollItem.scrollLeft % elementwidth 	//Попытка используя кинематику на основе исходной скорости рассчитать ту,
	var time = Math.abs(speed/accel);					//на которой красиво блоки остановятся. По законам должен работать
	if  (speed > 0)										//Математически всё красиво, но для точности надо скроллинг
	{													//через интегралы делать, а это что-то сложно, да и времени мало
		var predictionX = startX+ speed*time - accel*time*time/2;
	}
	else
	{
		var predictionX = startX + speed*time + accel*time*time/2; //Без понятия, почему он условно перепрыгивает дальше нужного, не должен то по формулкам
	}
	var stopOn = Math.floor(predictionX/elementwidth);
	if((predictionX % elementwidth) > (elementwidth / 2))
	{
		stopOn++
	}
	var targetX = stopOn*elementwidth - startX;				//Слишком много потрачено времени, сделать positionNiceficator по остановке
	//var targetX = predictionX;
	var sqrTime2 = 2*targetX*accel;
	time = Math.sqrt(Math.abs(sqrTime2));
	tempSpeed = accel*time;
	if (targetX < 0)
	{
		speed = tempSpeed/(-1);
	}
	else
	{
		speed = tempSpeed;
	}
}


function positionNiceficator() //он выравнивает по позиции относительной
{
	var startX = scrollItem.scrollLeft % elementwidth // Это просто некрасивый автодоводчик до нужного места
	if(startX > (elementwidth / 2))						//можно было и лучше, но я не могу.
	{
		var targetX = elementwidth - startX;
	}
	else
	{
		var targetX = -startX;
	}
	var sqrTime2 = 2*targetX*accel;
	time = Math.sqrt(Math.abs(sqrTime2));
	tempSpeed = accel*time;
	if (targetX < 0)
	{
		speed = tempSpeed/(-1);
	}
	else
	{
		speed = tempSpeed;
	}
	setTimeout(function() {speedProceed();}, 10)
}

function searchFirst()
{
	searchStr = document.getElementById('keywords').value
	if(searchStr.length == 0)
	{
		alert('Пусто');
	}
	else
	{
		searchStr = searchStr.replace(/\s/g,'+');
		var xhr = new XMLHttpRequest();
		xhr.open("GET", apiPrefix + searchStr, false); //user, password);
		xhr.send();
    	searchResult = JSON.parse(xhr.responseText);
		alert( xhr.responseText );
		loadingResults();
	}
}
function loadingResults()
{
	scrollItem = document.getElementById('scrollId');
	listBlock = document.getElementById('listBlock');
	for (var i = 0; i < searchResult.items.length; i++)
	{
		var element = document.createElement('div');
    	element.className = 'blockwithborder';
    	//element.style.width = '300px';
    	listBlock.appendChild(element);
    	blockArr.push(element); 					//Итак блок создан

    	var a = document.createElement('a');		//ссылка
    	a.setAttribute("href", youtubePrefix + searchResult.items[i].id.videoId);
    	a.setAttribute("target", "_blank");
    	element.appendChild(a);


    	var img = document.createElement('img');  	//Картинка с ссылкой
    	img.setAttribute("src",searchResult.items[i].snippet.thumbnails.high.url);
    	img.draggable = false;
    	a.appendChild(img);


    	//var t = document.createTextNode("N"+i);		//Временный номер результата, позже убрать
 		//element.appendChild(t);
 													//название,автор,описание

 		var h1 = document.createElement('h1');		//название само
 		var t = document.createTextNode(searchResult.items[i].snippet.title);
 		h1.appendChild(t);
    	element.appendChild(h1);									

    	var h2 = document.createElement('h2');		//название канала
 		var t = document.createTextNode(searchResult.items[i].snippet.channelTitle);
 		h2.appendChild(t);
    	element.appendChild(h2);	

    	var p = document.createElement('p');		//Описание
 		var t = document.createTextNode(searchResult.items[i].snippet.description);
 		p.appendChild(t);
    	element.appendChild(p);	
	}
	resize();
}