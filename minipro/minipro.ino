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

String ssid = "NodeMCU";  // Enter SSID here
String password = "12345678";  //Enter Password here


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
  server.on("/",webpage);
  server.on("/router",readData);
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
  
  
}
bool successfulrouter()
{ 
  int j=0,k=0,r=0,s=100;
  EEPROM.begin(512);
  Serial.print("SSID: ");
  rusername=server.arg("rtusername");
  Serial.println(server.arg("rtusername"));
//  while(j!=rusername.length())
//  {
//    EEPROM.write(k,rusername[j]);
//    j++;
//    k++;
//  }  
  Serial.print("Password:");
  rpassword=server.arg("rtpassword");
  Serial.println(server.arg("rtpassword"));
//  while(r!=rpassword.length())
//  {
//    EEPROM.write(s,rpassword[r]);
//    r++;
//    s++;
//  }  
  server.send(200,"text/html",registered);
//  EEPROM.end();
  return true;
}
bool successfulprofile()
{
  int j=0,k=300,r=0,s=400;

  EEPROM.begin(512);
  Serial.print("Username: ");
  uusername=server.arg("username");
  Serial.println(server.arg("username"));
//  while(j!=uusername.length())
//  {
//    EEPROM.write(k,uusername[j]);
//    j++;
//    k++;
//  }  
  Serial.print("Password:");
  upassword=server.arg("password");
  Serial.println(server.arg("password"));
//  while(r!=upassword.length())
//  {
//    EEPROM.write(s,upassword[r]);
//    r++;
//    s++;
//  }  
  
//  EEPROM.end();
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
  int j=0,k=0,r=0,s=100;
  EEPROM.begin(512);
  if (server.args() == 0)
    return false;  // we could do in the caller an error handling on that
  Serial.print("SSID: ");
  rusername=server.arg("rtusername");
  Serial.println(server.arg("rtusername"));
  while(j!=rusername.length())
  {
    EEPROM.write(k,rusername[j]);
    j++;
    k++;
  }
    
  Serial.print("Password:");
  rpassword=server.arg("rtpassword");
  Serial.println(server.arg("rtpassword"));
  while(r!=rpassword.length())
  {
    EEPROM.write(s,rpassword[r]);
    r++;
    s++;
  }  
  j=0;
  k=200;
  Serial.print("Username: ");
  uusername=server.arg("username");
  Serial.println(server.arg("username"));
  while(j!=uusername.length())
  {
    EEPROM.write(k,uusername[j]);
    j++;
    k++;
  }
  r=0;
  s=300;  
  Serial.print("Password:");
  upassword=server.arg("password");
  Serial.println(server.arg("password"));
  while(r!=upassword.length())
  {
    EEPROM.write(s,upassword[r]);
    r++;
    s++;
  }  
  
  server.send(200,"text/html",registered);
  return true;
  EEPROM.end();
}
