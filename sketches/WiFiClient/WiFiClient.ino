#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#ifndef STASSID
#define STASSID "SSID"
#define STAPSK "PASSWORD"
#endif

#ifndef SEC
#define SEC 6000
#define MIN 60 * SEC
#endif

const char *ssid = STASSID;
const char *password = STAPSK;

const String host = "http://192.168.1.131:3000";

int analogReadValue = 0;
String postParams = "";

void setup()
{
  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop()
{
  analogReadValue = analogRead(A0);

  HTTPClient http;

  Serial.print("connecting to ");
  Serial.println(host);

  postParams = (String) "{\"analogReadValue\":" + (String)analogReadValue + "}";

  Serial.print("postParams: ");
  Serial.println(postParams);
  http.begin(host);

  http.addHeader("Content-type", "application/json");
  int httpCode = http.POST(postParams);

  Serial.print("httpCode: ");
  Serial.println(httpCode);

  Serial.println();
  Serial.println("ending http request");
  http.end();

  delay(5 * MIN);
}
