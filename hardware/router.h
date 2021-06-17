const char router[]=
R"=====(
    <!Doctype html>
    <html>
    <head>
        <style>
            .rtusername-two{
                text-align:center;
                position:relative;
                top:50%;
                left:50%;
                display:block;
                
            }
            .rtpassword-two{
                text-align:center;
                position:relative;
                top:60%;
                left:50%;
                display:block;
                
            }
            .rtpassword-two1{
              display:none;
            }
      
        </style>
    </head>
    <body>
        <img src="/"></img>
 
 
    <h1>Router Signin</h1>
      <form action="/routerup" method="post">
        <label for="rtusername">Router Username</label>
        <input id="rtusername" class="rtusername-two" name="rtusername"></input>
        <label for="rtpassword">Router Password</label>
        <input id="rtpassword" type="text" class="rtpassword-two" name="rtpassword"></input>
        <button>Submit</button>

      </form>
  
   


    </body>
    </html>

)=====";
