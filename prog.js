    var paused = false;
    progBar = 
    {
      interId: undefined,
      getTimeForInt: function(val)
      {
         var value = val;
         value = (value * 60) * 1000;
       
        var onePercent = (value / 100) * 1; 
        return onePercent;
      },
      run: function(val,width){
        var width = parseInt(width);
          interId = setInterval(frame,val);
          function frame() 
         {
            
            if (width >= 100) {
                clearInterval(interId);
                 document.querySelector('.progDial').innerHTML = '100%';
            } else {
                width++; 
                console.log(width);
                document.querySelector('.progDial').innerHTML = width + '%';
                document.getElementById('myBar').style.width = width + '%'; 

            }
        }

      },
      pause:function()
      {
        paused = true;
        console.log('paused');
        window.clearInterval(interId);
      },
      reset:function()
      {
        window.clearInterval(interId);
        width:0;
         document.querySelector('.progDial').innerHTML ='0%';
          document.getElementById('myBar').style.width = '0%';
      }

    }
     
     
