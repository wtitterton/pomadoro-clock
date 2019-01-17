//const
var workTimerInt;
var breakTimerInt;
//bools
var workTimerShowing = true;
var reset = false;
//Timer controllers
var workConInterface = document.querySelector('.workController');
var breakConInterface = document.querySelector('.breakController');
// instantiate controller objects
var workController = new Controller(25,workConInterface);
var breakController = new Controller(5,breakConInterface);
// get a handdle on timer elements 
var workTimerElem =  document.querySelector('.workCountDown');
var breakTimerElem = document.querySelector('.breakCountDown');

// buttons handle
var startBtn = document.querySelector('.start');
var resetBtn = document.querySelector('.reset');


//instantiate CountDown timers
var workTimer = new countDown(workTimerElem);
var breakTimer = new countDown(breakTimerElem);

function updateTimerType()
{
	var clockShowing = document.querySelector('.clockShowing');
	if(workTimerShowing)
	{
		clockShowing.innerHTML = "work";
	}
	else
	{
		clockShowing.innerHTML = 'break';
	}
}

function playAudio()
{
	var notification = new Audio('sound/demonstrative.mp3');
	notification.play();
}

function getCurrentWidth(elem)
{
	

	var pa= elem.offsetParent || elem;
    return ((elem.offsetWidth/pa.offsetWidth)*100).toFixed(2)+'%';

}

function handleClockUpdate(controller,timer)
{
	timer.setClock(parseInt(controller.input.value), parseInt(00));
}

function resetAllTimers()
{
	var breakMins = breakController.getTime();
	breakTimer.reset(breakMins);

	var workMins = workController.getTime();
	workTimer.reset(workMins);
}

function runBreakTimer()
{
	workTimerShowing = false;
	playAudio();
	updateTimerType();
	//stop other timer
	console.log(workTimerInt);
	workTimer.stop(workTimerInt);
	// reset all timers
	resetAllTimers()
	// fade in breakTimer
	workTimerElem.classList.remove('zoomInDown');
	workTimerElem.classList.add('zoomOutUp');
	breakTimerElem.style.display = 'block';
	breakTimerElem.classList.remove('fadeOutRight');
	breakTimerElem.classList.add('fadeInLeft');
	// start break timer
	breakTimerInt = setInterval(function(){
		breakTimer.start();
	},1000);
	progBar.reset();
	var time = progBar.getTimeForInt(breakController.input.value);
	progBar.run(time,0);
}

function runWorkTimer()
{
	playAudio();
	workTimerShowing = true;
	updateTimerType();
	breakTimer.stop(breakTimerInt);
	resetAllTimers();
	breakTimerElem.classList.remove('fadeInLeft');
	breakTimerElem.classList.add('fadeOutRight');
	workTimerElem.classList.remove('zoomOutUp');
	workTimerElem.classList.add('zoomInDown');
	
	workTimerInt = setInterval(function(){
		workTimer.start();
	},1000);
	progBar.reset();
	var time = progBar.getTimeForInt(workController.input.value);
	progBar.run(time,0);

}



workController.interface.getElementsByTagName('button')[0].addEventListener('click',function(e){
	/*handleController(e,workController,workTimer);*/
	workController.decrement();
	handleClockUpdate(workController,workTimer);
});

workController.interface.getElementsByTagName('button')[1].addEventListener('click',function(e){
	/*handleController(e,workController,workTimer);*/
	workController.increment();
	handleClockUpdate(workController,workTimer);
});

breakController.interface.getElementsByTagName('button')[0].addEventListener('click',function(e){
	breakController.decrement();
	handleClockUpdate(breakController,breakTimer);
});

breakController.interface.getElementsByTagName('button')[1].addEventListener('click',function(e){
	breakController.increment();
	handleClockUpdate(breakController,breakTimer);
});

startBtn.addEventListener('click', function(){
	rest = false;
	startBtn.classList.toggle('stop');
	if(startBtn.classList.contains('stop'))
	{
		if(workTimerShowing)
		{
			workTimerInt = setInterval(function(){
			workTimer.start();
			},1000);
			var time = progBar.getTimeForInt(workController.input.value);
			var width = getCurrentWidth( document.getElementById('myBar'));
		}
		else
		{
			breakTimerInt = setInterval(function(){
				breakTimer.start();
			},1000)
		}
		var width = getCurrentWidth(document.getElementById('myBar'));
		console.log(width);
		progBar.run(time,width);
		startBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
	}
	else
	{
		if(workTimerShowing)
		{
			workTimer.stop(workTimerInt);
		}
		else
		{
			breakTimer.stop(breakTimerInt);
		}

		progBar.pause();
		startBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		
	}
});

resetBtn.addEventListener('click',function(){
	reset = true;
	startBtn.classList.remove('stop');
	startBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
	if(workTimerShowing)
	{
		var workMins = workController.getTime();
		console.log(workMins);
		workTimer.stop(workTimerInt);
		workTimer.reset(workMins);
		
	}
	else
	{
		var breakMins = breakController.getTime();
		breakTimer.reset(breakMins);
		breakTimer.stop(breakTimerInt);
	}

	progBar.reset();
});


// create new event and pass an event name argument; 
var timeingEvent = new CustomEvent("timerEnd");
// bind to an element
workTimerElem.addEventListener("timerEnd",runBreakTimer , false);
breakTimerElem.addEventListener("timerEnd", runWorkTimer, false);

