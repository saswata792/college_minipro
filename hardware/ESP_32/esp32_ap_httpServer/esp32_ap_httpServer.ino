#include <WiFi.h>
#include<EEPROM.h>
#include <WebServer.h>
#include<FirebaseESP32.h>
#include "webpaged.h";
#include "sewebpaged.h";
#include "register.h";
#include "router.h";
#include "profile.h";
//#include <rom/rtc.h>
/* Put your SSID & Password */
const char* ssid = "ESP32";  // Enter SSID here
const char* password = "12345678";  //Enter Password here
#include "DHT.h"
#define DHTPIN 2     
#define DHTTYPE DHT11
WiFiUDP ntpUDP;
//NTPClient timeClient(ntpUDP, "pool.ntp.org");
#define FIREBASE_HOST "esp32-82eba-default-rtdb.firebaseio.com"                     //Your Firebase Project URL goes here without "http:" , "\" and "/"
#define FIREBASE_AUTH "VCyvBPExh4qBOfKIefGzCEg8UtTzYlYW5UQMFnAW" //Your Firebase Database Secret goes here
#include "TimeLib.h"
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 19800;
const int   daylightOffset_sec = 0;
DHT dht(DHTPIN, DHTTYPE);
//#define WIFI_SSID "Xiaomi_A40B"                                               //WiFi SSID to which you want NodeMCU to connect
//#define WIFI_PASSWORD "sps9804814979"                                      //Password of your wifi network 
FirebaseData fireStatus;
String rusername;
String rpassword;
String uusername;
String upassword;
//extern "C" {
//#include <user_interface.h>
//}
typedef struct
{
  const char* rusername;
  const char* rpassword;
}route;
typedef struct
{
  String uusername;
  String upassword;
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
  //  timeClient.begin();
  //String time=printLocalTime();
  //timeClient.setTimeOffset(19800);
//  rst_info *resetInfo;
//  resetInfo=ESP.getResetInfoPtr();
  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  delay(100);
  server.begin();
  
  
  //init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
//  Serial.println(get_reset_reason(0));
//  if(get_reset_reason(0)==6)
//  {
//    server.on("/",change);
//    server.on("/changepro",readpro);
//    server.on("/changerout",readrout);
//    //server.on("/router",readUserData);
//    server.on("/profileup",successfulprofile);
//    server.on("/routerup",successfulrouter);
//  }
 
  server.on("/",webpage);
  server.on("/router",readData);
  route rout;
  EEPROM.get(0,rout);
  if(rout.rusername!="" && rout.rpassword!="")
  {
    station();
  }
}
void printLocalTime()
{
    struct tm timeinfo;
    
    Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
    
}
void station()
{
  route rout;
  EEPROM.get(0,rout);
  WiFi.begin(rout.rusername, rout.rpassword);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println(" CONNECTED");
}    
 
//void firebase()
//{
//  user users;
//  String times=printLocalTime();
//  float h = dht.readHumidity();
//  float t = dht.readTemperature();
////  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
//  EEPROM.get(100,users);
//  String usrnm=users.uusername;
//  String pass=users.upassword;
//  Firebase.setFloat(fireStatus,"user/usrnm/times/humidity",h);
//  Firebase.setFloat(fireStatus,"user/usrnm/times/temperature",t);
// 
//}

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
void loop() {
  server.handleClient();
  printLocalTime();
  

  
  
}
