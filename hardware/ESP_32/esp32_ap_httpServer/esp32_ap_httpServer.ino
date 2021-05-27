#include <WiFi.h>
#include<EEPROM.h>
#include <WebServer.h>
#include<FirebaseESP32.h>
#include "./webpaged.h";
#include "./sewebpaged.h";
#include "./register.h";
#include "./router.h";
#include "./profile.h";
#include <rom/rtc.h>
/* Put your SSID & Password */
const char* ssid = "ESP32";  // Enter SSID here
const char* password = "12345678";  //Enter Password here
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 19800;
const int   daylightOffset_sec = 0;

//#include "DHT.h"
#define DHTPIN 2    
#define DHTTYPE DHT11
#define FIREBASE_HOST "esp32-82eba-default-rtdb.firebaseio.com"                     //Your Firebase Project URL goes here without "http:" , "\" and "/"
#define FIREBASE_AUTH "VCyvBPExh4qBOfKIefGzCEg8UtTzYlYW5UQMFnAW" //Your Firebase Database Secret goes here
#include "TimeLib.h"

FirebaseData fireStatus;
String rusername;
String rpassword;
String uusername;
String upassword;
//extern "C" {
////#include <user_interface.h>
//}
typedef struct
{
  char* rusername;
  char* rpassword;
}route;
typedef struct
{
  char* uusername;
  char* upassword;
}user;

user usdetails;
route rtdetails;
/* Put IP Address details */
IPAddress local_ip(192,168,1,1);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);

WebServer server(80);

//FirebaseData fireStatus;
void setup()
{
  Serial.begin(74880);
  route users;
  Serial.println("\nRESET REASON:");
  Serial.println(rtc_get_reset_reason(0));
  if(rtc_get_reset_reason(0)==1)
  {
    WiFi.softAP(ssid, password);
    WiFi.softAPConfig(local_ip, gateway, subnet);
    delay(100);
    server.begin();
    server.on("/",change);
    server.on("/changepro",readpro);
    server.on("/changerout",readrout);
    //server.on("/router",readUserData);
    server.on("/profileup",successfulprofile);
    server.on("/routerup",successfulrouter);
  }
  else{
    EEPROM.begin(512);
    EEPROM.get(100,users);
    if(strcmp(users.rusername,"")==0 || strcmp(users.rpassword,"")==0){
      WiFi.softAP(ssid, password);
      WiFi.softAPConfig(local_ip, gateway, subnet);
      delay(100);
      server.begin();
      server.on("/",webpage);
      server.on("/router",readData);
      EEPROM.end();
    }
    else
    {
        station();
        //configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
    }
  }
}
//String printLocalTime()
//{
//    struct tm timeinfo;
//    
//    Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
//    return timeinfo;
//}
void station()
{
  route users;
  EEPROM.begin(512);
  EEPROM.get(100,users);
  WiFi.begin(users.rusername, users.rpassword);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println(" CONNECTED");
  EEPROM.end();
}    
 
void firebase()
{
  user users;
//  String times=printLocalTime();
//  float h = dht.readHumidity();
//  float t = dht.readTemperature();
  EEPROM.begin(512);
  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
  EEPROM.get(100,users);
  String usrnm=users.uusername;
  String pass=users.upassword;
  Firebase.setFloat(fireStatus,"user/usrnm/times/humidity",0.09);
  Firebase.setFloat(fireStatus,"user/usrnm/times/temperature",12.4);
  EEPROM.end();
}

bool successfulrouter()
{
  route rt;
  EEPROM.begin(512);
  Serial.print("SSID: ");
  String st =server.arg("rtusername");
  rtdetails.rusername=(char*)&st;
  Serial.println(server.arg("rtusername"));
  Serial.print("Password:");
  st=server.arg("rtpassword");
  rtdetails.rpassword=(char*)&st;
  Serial.println(server.arg("rtpassword"));
  server.send(200,"text/html",registered);
  EEPROM.put(0,rtdetails);
  EEPROM.get(0,rt);
  Serial.println(rt.rusername);
  Serial.println(rt.rpassword);
  server.send(200,"text/html",registered);
  EEPROM.end();
  return true;
}
bool successfulprofile()
{
 
  user us;
  EEPROM.begin(512);
  Serial.print("Username: ");
  String st=server.arg("rtusername");
  usdetails.uusername=(char*)&st;
  Serial.println(server.arg("username"));

  Serial.print("Password:");
  st=server.arg("rtusername");
  usdetails.upassword=(char*)&st;
  Serial.println(server.arg("password"));
  EEPROM.put(100,usdetails);
  EEPROM.get(100,us);
  Serial.println(us.uusername);
  Serial.println(us.upassword);
  server.send(200,"text/html",registered);
  //firebase();
  EEPROM.end();
  return true;
 
}
void readpro()
{
   server.send(200,"text/html",profile);
}
void readrout()
{
   server.send(200,"text/html",router);
}
void change()
{
  server.send(200,"text/html",changed);
}
void webpage(){
  server.send(200,"text/html",webpaged);
}
bool readData()
{
  user us;
 
  //String str;
  EEPROM.begin(512);
  if (server.args() == 0)
    return false;  // we could do in the caller an error handling on that
    String st=server.arg("rtusername");
  rtdetails.rusername=(char*)&st;
  Serial.print("SSID: ");
  Serial.println(rtdetails.rusername);
  Serial.println(server.arg("rtusername"));
 
  //Serial.print("httffjkggkgyh:");
  //Serial.println(str);  
  Serial.print("Password:");
  String sst = server.arg("rtpassword");
  rtdetails.rpassword=(char*)&sst;
  Serial.println(server.arg("rtpassword"));
  EEPROM.put(0,rtdetails);
  Serial.print("Username: ");
  String ut=server.arg("username");
  usdetails.uusername=(char*)&ut;
  Serial.println(server.arg("username"));
  Serial.print("Password:");
  String upt=server.arg("password");
  usdetails.upassword=(char*)&upt;
  Serial.println(server.arg("password"));
  EEPROM.put(100,usdetails);
  EEPROM.get(100,us);
  //firebase();
  Serial.println(us.uusername);
  Serial.println(us.upassword);
  server.send(200,"text/html",registered);
  EEPROM.end();
  return true;
 
}
void loop() {
 server.handleClient();
  //printLocalTime();
 

 
 
}
