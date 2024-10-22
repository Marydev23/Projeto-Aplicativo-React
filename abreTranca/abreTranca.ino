#include <ESP8266WiFi.h> // INCLUSÃO CONEXÃO WEB
#include "arduino_secrets.h" // INCLUSÃO USUÁRIO E SENHA

// DEFINIÇÃO DE PADRÕES PARA A CONEXÃO WIFI
IPAddress ip(192,168,0,144); //IP de acesso
IPAddress gateway(192,168,0,1); // Gateway
IPAddress subnet(255,255,255,0); // Mascara de rede

WiFiServer server(80); // CASO OCORRA PROBLEMAS COM A PORTA 80, UTILIZAR OUTRA (EX.: 8082, 8089) E A CHAMADA DA URL FICARÁ IP: PORTA (EX.: 192.168.0.15.8082) - (o padrão WEB é a porta 80)

#define D0 16
#define D1 5
#define D2 4
#define D3 0
#define D4 2
#define D5 14
#define D6 12
#define D7 13
#define D8 15

#define PAGINA_PORTARIA 0


#define PAGINA_ERROR_404 -1


// DEFINE OS PINOS A SEREM UTILIZADOS
const int tranca = D4;

// ESTADO INICIAL DA TRANCA
bool trancaStatus = false;

void requisicao(String);


//-----------------------------------------------------------------------------------------
void setup()
{         
    Serial.begin(115200); // INICIALIZA SERIAL
    delay(1);

    //Configura o modo dos pinos
    pinMode(tranca, OUTPUT);
    digitalWrite(tranca, !trancaStatus);

    //Conexão na rede WiFi
    Serial.println();
    Serial.print("Conectando a ");
    Serial.println(ssid);

    WiFi.begin(ssid, password); // PASSA PARAMETROS PARA FUNÇÃO QUE VAI FAZER CONEXÃO COM WIFI
    WiFi.config(ip, gateway, subnet); // PASSA PARAMETROS PARA FUNÇÃO QUE VAI SETAR IP FIXO NO NODEMCU

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.print("WiFi conectado a rede sem fio ");
    Serial.println(ssid);

    // Inicia o servidor WEB
    server.begin();
    Serial.println("Server iniciado");

    // Mostra o endereco IP
    Serial.print("IP para se conectar: http://");
    Serial.println(WiFi.localIP());
}


//-----------------------------------------------------------------------------------------
void loop()
{
    WiFiClient  client = server.available(); // VERIFICA SE ALGUM CLIENTE ESTÁ CONECTADO NO SERVIDOR
    if (!client) {
      return;
    }
    Serial.println("Novo cliente");
    while(!client.available()) {
      delay(1);
    }
    String request2 = "\r";
    String request = client.readStringUntil('\r'); // FAZ LEITURA DA PRIMEIRA LINHA DA REQUISIÇÃO 
    requisicao(request); // TRATA O REQUEST
    Serial.println(request);

    int pag_id = 0;
    if (request.indexOf("GET") == 0) {  // check if request method is GET
        Serial.println("Abre porta corretamente");
    } else {  // 405 Method Not Allowed
      Serial.println("404 Not Found");
      pag_id = PAGINA_ERROR_404;
      
    }
    // send the HTTP response
    // send the HTTP response header
    if (pag_id == PAGINA_ERROR_404)
      client.println("HTTP/1.1 404 Not Found");
    else
      client.println("HTTP/1.1 200 OK");

    client.println("Content-Type: text/html");
    client.println("Connection: close");  // the connection will be closed after completion of the response
    client.println();                     // the separator between HTTP header and body

    String html;
    switch (pag_id) {
      case PAGINA_ERROR_404:
        client.println("Page Not Found");
        break;
    }

    delay(1);
  //  Serial.println("Cliente desconectado");
  //  Serial.println("");
    client.flush(); 

    client.flush();

  // give the web browser time to receive the data
    delay(1);
}

// FUNÇAO REQUISIÇÃO
void requisicao(String request2){
  if(request2.indexOf("GET") == 0)
  {
    trancaStatus = true; // ALTERA STATUS 
    digitalWrite(tranca, !trancaStatus); // ON
    delay(5000);
    digitalWrite(tranca, trancaStatus);
  }
  
}