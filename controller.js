function Controller(val,interface)
{
  this.interface = interface;
  this.input = this.interface.getElementsByTagName('input')[0];
  this.input.value = parseInt(val); 

}

Controller.prototype.increment = function()
{
  
 this.input.value = parseInt(this.input.value) + 1;
}

Controller.prototype.decrement = function()
{
  if(parseInt(this.input.value) == 1)
    {
      this.input.value = 1;
    }
  else
    {
      this.input.value = parseInt(this.input.value) - 1;
    }
}

Controller.prototype.getTime = function()
{
  return this.input.value;
}