#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include<EEPROM.h>
#include "webpaged.h";
#include "sewebpaged.h";
#include "register.h";
#include "router.h";
#include "profile.h";
#include <Arduino.h>
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



void setup() {
  Serial.begin(74880);
  
  rst_info *resetInfo;
  resetInfo=ESP.getResetInfoPtr();
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
  Serial.println(us.uusername);
  Serial.println(us.upassword);
  server.send(200,"text/html",registered);
  EEPROM.end();
  return true;
  
}
