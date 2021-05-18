const char webpaged[]=
R"=====(
    <!Doctype html>
    <html>
    <head>
        <style>
            .rtusername-one{
                text-align:center;
                position:relative;
                top:50%;
                left:50%;
                display:block;
                
            }
            .rtpassword-one{
                text-align:center;
                position:relative;
                top:60%;
                left:50%;
                display:block;
                
            }
            .username-one{
                text-align:center;
                position:relative;
                top:70%;
                left:50%;
                display:block;
                
            }
            .password-one{
                text-align:center;
                position:relative;
                top:80%;
                left:50%;
                display:block;
                
            }
           
            img{
                background-size:cover;
            }
        </style>
    </head>
    <body>
        <img src="/"></img>
 
 
    <h1>Router Signin</h1>
      <form action="/router" method="post">
        <label for="rtusername">Router Username</label>
        <input id="rtusername" class="rtusername-one" name="rtusername"></input>
        <label for="rtpassword">Router Password</label>
        <input id="rtpassword" class="rtpassword-one" name="rtpassword"></input>
        <label for='username'>User's Username</label>
        <input id='username' class="username-one" name="username"></input>
        <label for='password'>User's Password</label>
        <input id='password' class="password-one" name="password"></input>
        <button>Submit</button>

      </form>
  
   


    </body>
    </html>

)=====";
