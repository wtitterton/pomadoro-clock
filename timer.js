function countDown(elem)
{
  this.mins = 25;
  this.seconds = 00;
  this.elem = elem;
}

countDown.prototype.setClock = function(minutes,secs)
{
  this.mins = minutes;
  this.seconds = secs;
  this.updateClock();
}

countDown.prototype.start = function()
{
  this.mins = parseInt(this.mins);
  this.seconds = parseInt(this.seconds);
  this.tick();
 }
countDown.prototype.stop = function(inter)
{
 clearInterval(inter);
}

countDown.prototype.tick = function()
{
  if(this.mins == 0 && this.seconds == 0 )
   {  
      // actually fires the event on the timer that has reached 0
      // eg correspondes to the instance of the timer that is a zero
      this.elem.dispatchEvent(timeingEvent);
      return;
   }
   if(this.seconds > 0 || this.mins > 0)
   {
    
     if(this.seconds == 0 || this.mins == 1)
       {
         this.mins = this.mins -1;
         this.seconds = 59;
         
       }
     else
       {
         this.seconds = this.seconds -1;
       }
     
     this.updateClock();
   }
  
 }

countDown.prototype.updateClock = function()
{
  
  if(this.seconds < 10)
    {
       this.elem.innerHTML = this.mins + ":" + "0" + this.seconds;
    }
  else
    {
      this.elem.innerHTML = this.mins + ":" + this.seconds;  
    }
 }

 countDown.prototype.reset = function(mins)
 {

    this.elem.innerHTML = mins + ":" + "00";
    this.mins = mins;
    this.setClock(mins,parseInt(00));
 }