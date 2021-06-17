#include <WiFi.h>
#include<EEPROM.h>
#include <WebServer.h>
#include<FirebaseESP32.h>
#include "MAX30100_PulseOximeter.h"
#include "time.h"
#include "./webpaged.h";
#include "./sewebpaged.h";
#include "./register.h";
#include "./router.h";
#include "./profile.h";
#include <rom/rtc.h>
/* Put your SSID & Password */
const char* ssid = "ESP32_21221245";  // Enter SSID here
const char* password = "12345678";  //Enter Password here
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 19800;
const int   daylightOffset_sec = 0;
//PulseOximeter pox;

#define FIREBASE_HOST "https://esp32-82eba-default-rtdb.firebaseio.com/"                     //Your Firebase Project URL goes here without "http:" , "\" and "/"
#define FIREBASE_AUTH "VCyvBPExh4qBOfKIefGzCEg8UtTzYlYW5UQMFnAW" //Your Firebase Database Secret goes here
#include "TimeLib.h"

FirebaseData fireStatus;

typedef struct
{
  String rpassword;
  String rusername;
  
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

//float BPM, SpO2;
void setup()
{
  Serial.begin(74880);
  Serial.print("\nRESET REASON: ");
  Serial.println(rtc_get_reset_reason(0));
    route users;
    
  if(rtc_get_reset_reason(0)==1)
  {
    WiFi.softAP(ssid, password);
    WiFi.softAPConfig(local_ip, gateway, subnet);
    delay(100);
    Serial.println("Reset DONE");
    server.on("/",change);
    server.on("/changepro",readpro);
    server.on("/changerout",readrout);
    //server.on("/router",readUserData);
    server.on("/profileup",successfulprofile);
    server.on("/routerup",successfulrouter);
    server.begin();
  }
  else{
    route users;
    EEPROM.begin(512);
    EEPROM.get(0,users);
    EEPROM.end();
    Serial.print("Username: ");
    Serial.println(users.rusername);
    Serial.print("Password: ");
    Serial.println(users.rpassword);
    char* user = (char*)users.rusername.c_str();
    char* password = (char*)users.rpassword.c_str();
    if(strcmp(user,"")==0 || strcmp(password,"")==0){
      WiFi.softAP(ssid, password);
      WiFi.softAPConfig(local_ip, gateway, subnet);
      delay(100);
      server.begin();
      server.on("/",webpage);
      server.on("/router",readData);
      
    }
    else
    {
        station(user, password);
        configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
//        firebase();
        
    }
  }
//  if (!pox.begin())
//    {
//         Serial.println("FAILED");
//         for(;;);
//    }
//    else
//    {
//         Serial.println("SUCCESS");
//         //pox.setOnBeatDetectedCallback(onBeatDetected);
//    }
}
String printLocalTime()
{
    struct tm timeinfo;
//    if(!getLocalTime(&timeinfo)){
//    Serial.println("Failed to obtain time");
//    return;
//  }
    String day = String(timeinfo.tm_mday); 
    String month =String( timeinfo.tm_mon + 1); 
    String year = String(timeinfo.tm_year +1900);
    Serial.println(day+':'+month+':'+year);
    return (day+':'+month+':'+year);
   
}
void station(char* user, char* password)
{
  WiFi.begin(user, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println(" CONNECTED");
}    
 
//void firebase()
//{
//  String times=printLocalTime();
//  user users;
//  pox.update();
//  BPM = pox.getHeartRate();
//  SpO2 = pox.getSpO2();
//  Serial.print("BPM:");
//  Serial.println(BPM);
//  Serial.print("SpO2:");
//  Serial.println(SpO2);
//  EEPROM.begin(512);
//  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
//  EEPROM.get(100,users);
//  String usrnm=users.uusername;
//  String pass=users.upassword;
//  Firebase.setFloat(fireStatus,"user/usrnm/times/humidity",BPM);
//  Firebase.setFloat(fireStatus,"user/usrnm/times/temperature",BPM);
//  EEPROM.end();
//}

bool successfulrouter()
{
  route rt;
  route r;
  String user, password;
  EEPROM.begin(512);
  Serial.print("SSID: ");
  user=server.arg("rtusername");
  rt.rusername=user;//(char*)(user.c_str());
  Serial.println(rt.rusername);
  password=server.arg("rtpassword");
  Serial.print("Password: ");
  rt.rpassword=password;//(char*)(password.c_str());
  Serial.println(rt.rpassword);
  EEPROM.put(0,rt);
  EEPROM.get(0,r);
  EEPROM.end();
  Serial.print("User: ");
  Serial.println(r.rusername);
  Serial.print("Password: ");
  Serial.println(r.rpassword);
  server.send(200,"text/html",registered);
  delay(3000);
  ESP.restart();
  return true;
}
bool successfulprofile()
{
 
  user us;
  EEPROM.begin(512);
  Serial.print("Username: ");
  String st=server.arg("username");
  usdetails.uusername=st;
  Serial.println(server.arg("username"));

  Serial.print("Password:");
  String stp=server.arg("password");
  usdetails.upassword=stp;
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
 
  
  delay(1000);
 
 
}
