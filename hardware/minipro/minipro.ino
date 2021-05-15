#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFi.h>
#include<EEPROM.h>
#include "time.h"
#include "webpaged.h";
#include "sewebpaged.h";
#include "register.h";
#include "router.h";
#include "profile.h";
#include <Arduino.h>
#include <FirebaseArduino.h>
#include "DHT.h"
#define DHTPIN 2     
#define DHTTYPE DHT11
#define FIREBASE_HOST "esp32-82eba-default-rtdb.firebaseio.com"                     //Your Firebase Project URL goes here without "http:" , "\" and "/"
#define FIREBASE_AUTH "VCyvBPExh4qBOfKIefGzCEg8UtTzYlYW5UQMFnAW" //Your Firebase Database Secret goes here
#include "TimeLib.h"
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 19800;
const int   daylightOffset_sec = 0;
DHT dht(DHTPIN, DHTTYPE);
#define WIFI_SSID "Xiaomi_A40B"                                               //WiFi SSID to which you want NodeMCU to connect
#define WIFI_PASSWORD "sps9804814979"                                      //Password of your wifi network 

String rusername;
String rpassword;
String uusername;
String upassword;
extern "C" {
#include <user_interface.h>
}
typedef struct
{
  String rusername;
  String rpassword;
}route;
typedef struct
{
  String uusername;
  String upassword;
}user;
String ssid = "NodeMCU";  // Enter SSID here
String password = "12345678";  //Enter Password here

user usdetails;
route rtdetails;
IPAddress local_ip(192,168,1,1);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);


ESP8266WebServer server(80);

//String time()
//{
//  //time_t t = now(); // store the current time in time variable t
//  String hr=String(hour());          // returns the hour for the given time t
//  String minu=String(minute());        // returns the minute for the given time t
//  String sec=String(second());        // returns the second for the given time t
//  String date=String(day());           // the day for the given time t
//  String mon=String(month());         // the month for the given time t
//  String yer=String(year());          // the year for the given time t
//  return(date+':'+mon+':'+yer+':'+hr+':'+minu+':'+sec);
//}
void printLocalTime()
{
  struct tm timeinfo;
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
//  if(!getLocalTime(&timeinfo)){
//    Serial.println("Failed to obtain time");
//    return;
// }
  
}

void setup() {
//  String myTime;
  Serial.begin(74880);
  //dht.begin();
//  float h = dht.readHumidity();
//  float t = dht.readTemperature();
//  Serial.print("Humidity:");
//  Serial.println(h);
//  Serial.print("Temperature:");
//  Serial.println(t);
  rst_info *resetInfo;
  resetInfo=ESP.getResetInfoPtr();
//  myTime=time();
//  Serial.print("Milis:");
//  Serial.println(myTime);
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  printLocalTime();
  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  
  delay(100);
  server.begin();
  Serial.println(resetInfo ->reason);
  if(resetInfo->reason==6)
  {
    server.on("/",change);
    server.on("/changepro",readpro);
    server.on("/changerout",readrout);
    //server.on("/router",readUserData);
    server.on("/profileup",successfulprofile);
    server.on("/routerup",successfulrouter);
  }
  else
  {
    server.on("/",webpage);
    server.on("/router",readData);
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
  
}

bool successfulrouter()
{ 
  route rt;
  EEPROM.begin(512);
  Serial.print("SSID: ");
  rtdetails.rusername=server.arg("rtusername");
  Serial.println(server.arg("rtusername"));
  Serial.print("Password:");
  rtdetails.rpassword=server.arg("rtpassword");
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
  usdetails.uusername=server.arg("username");
  Serial.println(server.arg("username"));

  Serial.print("Password:");
  usdetails.upassword=server.arg("password");
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
void loop() {
  server.handleClient();
  
}
void change()
{
  server.send(200,"text/html",changed);
}
void webpage(){
  server.send(200,"text/html",webpaged);
}
//bool readUserData()
//{
//   if (server.args() == 0)
//    return false;  // we could do in the caller an error handling on that
//   Serial.print("Username: ");
//   Serial.println(server.arg("username"));
//   Serial.print("Password:");
//   Serial.println(server.arg("password"));
//   server.send(200,"text/html",registered);
//}
//void firebase()
//{
//  float h = dht.readHumidity();
//  float t = dht.readTemperature();
//  Serial.println(h);
//  Serial.println(t);
//  user us;
//  us=EEPROM.get(100,us);
//  String usrnm=us.uusername;
//  if (Firebase.failed())
//  { delay(500);
//    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
//    Serial.println(Firebase.error());
//    Serial.println("Connection to firebase failed. Reconnecting...");
//    delay(500);
//  }
//  
//  else { 
//      
//
//        Firebase.setString("saswata@user/username",usrnm);
//        Firebase.setInt("saswata@user/usrnm/humidity",h);
//        Firebase.setInt("saswata@user/usrnm/temperature",t);
//        
//        Serial.println(usrnm);
////      delay(300); Serial.println("uploaded val to firebase \n \n \n");
//
////      Firebase.setInt("/test/val3",val3);
////      Serial.println(val3);
////      delay(300); Serial.println("uploaded val3 to firebase \n \n \n");
//  }
//}
bool readData()
{
  user us;
  
  //String str;
  EEPROM.begin(512);
  if (server.args() == 0)
    return false;  // we could do in the caller an error handling on that
  rtdetails.rusername=server.arg("rtusername");
  Serial.print("SSID: ");
  Serial.println(rtdetails.rusername);
  Serial.println(server.arg("rtusername"));
  
  //Serial.print("httffjkggkgyh:");
  //Serial.println(str);  
  Serial.print("Password:");
  rtdetails.rpassword=server.arg("rtpassword");
  Serial.println(server.arg("rtpassword"));
  EEPROM.put(0,rtdetails);
  Serial.print("Username: ");
  usdetails.uusername=server.arg("username");
  Serial.println(server.arg("username"));
  Serial.print("Password:");
  usdetails.upassword=server.arg("password");
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
