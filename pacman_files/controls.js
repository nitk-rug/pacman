  preload=setTimeout(function(){  },10000);

//=========================sOCKET VARIABLES ================================
var address = "ws:10.42.0.1:5000"
var webSocket;
if (typeof MozWebSocket === "undefined") 
ws = new WebSocket(address);
else
{
  if ( $.browser.mozilla )
 {
    ws = new MozWebSocket(address);
  }
 else 
 {
  ws = new WebSocket(address);
  }
}
ws.onopen = function() { }
ws.onclose = function() { } 
ws.onmessage = function(msg)  {
  var component=msg.data.split(" ");
  if (component[1] == "l")
    (window[component[0]]).moveleft();
  else if (component[1] == "r")
    (window[component[0]]).moveright();
  else if(component[1] == "d")
    (window[component[0]]).movedown();
  else
    (window[component[0]]).moveup();
} 
//=========================sOCKET VARIABLES ================================


    //====================Initial variables ========================//

      var pacman = ["pacman1"];
      var ghost = ["ghost21","ghost22"];
      var x=0;
      var y=0;var counter=0;var counter1=1;
      // var cellX=1,cellY=1;
      var myVar;
      var stop=0;
      var walls_row1 = new Array(5,11,21,27,37);
      var walls=[
      [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37],
      [0,6,13,24,31,37]
      ,[0,2,3,4,8,9,10,11,15,16,17,20,21,22,26,27,28,29,33,34,35,37]
      ,[0, 6, 13, 24, 31, 37]
      ,[0, 2, 4, 6, 8, 9, 10, 11, 13, 15, 17, 20, 22, 24, 26, 27, 28, 29, 31, 33, 35, 37]
,[0, 2, 4, 6, 8, 9, 10, 11, 13, 15, 17, 20, 22, 24, 26, 27, 28, 29, 31, 33, 35, 37]
,[2, 6, 8, 11, 13, 17, 20, 24, 26, 29, 31, 35]
,[0, 2, 3, 4, 6, 8, 9, 10, 11, 13, 15, 16, 17, 20, 21, 22, 24, 26, 27, 28, 29, 31, 33, 34, 35, 37]
,[0, 37]
,[0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37]
,[0, 4, 6, 13, 15, 22, 24, 31, 33, 37]
,[0, 2, 4, 6, 8, 9, 10, 11, 13, 15, 17, 20, 22, 24, 26, 27, 28, 29, 31, 33, 35, 37]
,[0, 37]
,[0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37]]
    //====================Initial variables ========================//

//Combination of Pacman and Ghost
Pacost = Backbone.Model.extend({ 
      //Global variables 
      cellX: 1,
      cellY: 1,
      myVar: 0,
      send_msg: 0,
      dir: 0,
      //flag contains the details of weather it is pacman or ghost !!
      //if flag = 1 => Pacman

      initialize: function(){       
        //Nothing for now !!
        if (name == this.get('id'))
          this.send_msg = 1;
        if (this.get('team') == 2)
        {
          if (this.get('flag') == 0)
            if((this.get('id')[this.get('id').length-1])=="1")
            this.moveTo(35,6);
            else
              this.moveTo(35,11);
          else
            this.moveTo(35,0);
          // alert(this.get('id'));
        }
        else
        {
          if (this.get('flag') == 0)
            if((this.get('id')[this.get('id').length-1])=="1")
            this.moveTo(0,6);
            else
              this.moveTo(0,11);
            // this.moveTo(0,6);

        }
          
      },

      moveleft: function(got_msg){
        this.dir = 'l';
        clearInterval(this.myVar);
        // if (this.send_msg == 1)
        //    ws.send(this.get("id")+" l");
        this.myVar=setInterval(function(){
          if (this.get('flag') == 1)
            $("#"+this.get("id")).html("<img name='pac_i' src='./pacman_files/l1.gif'>")
            this.moveTo(-1,0);

        }.bind(this),200);
      },

      moveright: function(got_msg){
        this.dir = 'r';
        //console.log('right')
        clearInterval(this.myVar);
        // if (this.send_msg == 1)
        //  ws.send(this.get("id")+" r");
        this.myVar=setInterval(function(){
          if (this.get('flag') == 1)
            $("#"+this.get('id')).html("<img name='pac_i' src='./pacman_files/r1.gif'>")
          this.moveTo(1,0);
        }.bind(this),200);
      },

      moveup: function(got_msg){
        this.dir = 'u';
        clearInterval(this.myVar);
        // if (this.send_msg == 1)
        //  ws.send(this.get("id")+" u");
        this.myVar=setInterval(function(){
          if (this.get('flag') == 1)
            $("#"+this.get('id')).html("<img name='pac_i' src='./pacman_files/b1.gif'>")
          this.moveTo(0,-1);
        }.bind(this),200);
      },

      movedown: function(got_msg){
        this.dir = 'd';
        // alert('movedown');
        clearInterval(this.myVar);
        // if (this.send_msg == 1)
        //  ws.send(this.get("id")+" d");
        //Point to remember is that you need to bind the setInterval with this to get this object !!
        this.myVar=setInterval(function(){
          if (this.get('flag') == 1)
            $("#"+this.get('id')).html("<img name='pac_i' src='./pacman_files/f1.gif'>")
          this.moveTo(0,1);
        }.bind(this),200);
      }, 

      moveTo: function(xincr,yincr){
        var number=0;
        var column=0;
        number = walls[this.cellY+yincr].indexOf(this.cellX+xincr);
        if(number == -1)
        {
          this.cellX+=xincr;
          this.cellY+=yincr;
            move(this.get('id'))
            .x((this.cellX-1)*27)
            .y((this.cellY-1)*27)
            .end();
          if (this.get('flag') == 1)
          {
             if($('[name="r'+ (this.cellY+1)+'c'+(this.cellX+1)+'"]').attr("src")=="./pacman_files/pnt.gif")
              {
              $('[name="r'+ (this.cellY+1)+'c'+(this.cellX+1)+'"]').attr("src","./pacman_files/tile0.gif");
              if(this.get('team')==1)
              {
                ++counter1;
              //$('.counter').text(function(i,txt){ return parseInt(txt,10) + 1; })
             // $('.counter').text(function(i,txt){ return parseInt(txt,10) + 1; })
             
              }
              console.log(counter1);
              document.getElementById('counter1').innerHTML=counter1;
              if(this.get('team')==2)
              {
                ++counter;
                //$('.counter1').text(function(i,txt){ return parseInt(txt,10) + 1; })
              }
              console.log(counter1);
                document.getElementById('counter').innerHTML=counter;
          }
              }
        }   
      },

      reverse: function(){
        //console.log(this.dir);
        switch(this.dir)
        {
          case 'l':
            this.moveTo(1,0);
            this.moveright();
            break;
          case 'r':
            this.moveTo(-1,0);
            this.moveleft();
            break;
          case 'd':
          this.moveTo(0,-1);
            this.moveup();
            break
          case 'u':
            this.moveTo(0,1);
            this.movedown();
            break;
        }
      }
      

    });
    //=============================Server ========================================//
  Server = Backbone.Model.extend({

      websrv: 0,
      // address: "ws:127.0.0.1:4000",
      // webSocket: 0,

    initialize: function(){
      
    },

    run: function(){
      setInterval(function(){
        //8 combinations of match to end !!
        var i=0,j=0;
        while(i<pacman.length)
        {
          while(j<ghost.length)
          {
            if (window[(pacman[i])].cellX == window[(ghost[j])].cellX && window[(pacman[i])].cellY == window[(ghost[j])].cellY)
            {
              $('img[src="./pacman_files/pnt.gif"]').attr('src','./pacman_files/tile0.gif');
              alert('END!!');
            }
              // console.log('oiadh');
            j++;
          }
          j=0;
          i++;
        }
      },100);
      //ghost to ghost coliision !!!!
      setInterval(function(){
        //ghost to ghost coliision !!!!
        var i=0,j=0;
        while(i<ghost.length)
        {
          while(j<ghost.length && i != j)
          {
            if (window[(ghost[i])].cellX == window[(ghost[j])].cellX && window[(ghost[i])].cellY == window[(ghost[j])].cellY)
            {
                window[ghost[i]].reverse(); 
                window[ghost[j]].reverse();
            }
              // console.log('oiadh');
            j++;
          }
          j=0;
          i++;
        }
      },100);





    },

    start: function(){
      var tmp = prompt("Please enter your type","pacman1");
      return tmp
    },

    stop: function(){

    },

    msg: function(){
    
    }

  });

  var server = new Server();
  var name = server.start();
  server.run();
  // server.send();

//=============================Server ========================================//




    addEventListener('keydown', function(e){
      switch (e.keyCode) {
        //down
        case 40:
          // create_interval('d');
          ws.send(name+" d");
          window[name].movedown(); //global variables
          break;
        // up
        case 38:
          // create_interval('u');
          ws.send(name+" u");
          window[name].moveup();
          break;
        // left
        case 37:
          // create_interval('l');
          ws.send(name+" l");
          window[name].moveleft();
          break;
        // right
        case 39:
        // create_interval('r');
        ws.send(name+" r");
          window[name].moveright();
          break;
      }
    });
