const char profile[]=
R"=====(
    <!Doctype html>
    <html>
    <head>
        <style>
       
            .username-two{
                text-align:center;
                position:relative;
                top:70%;
                left:50%;
                display:block;
                
            }
            .password-two{
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
      <form action="/profileup" method="post">
        
        <label for='username'>User's Username</label>
        <input id='username' class="username-two" name="username"></input>
        <label for='password'>User's Password</label>
        <input id='password' class="password-two" name="password"></input>
        <button>Submit</button>

      </form>
  
   


    </body>
    </html>

)=====";
