#ifndef SECRET_H
#define SECRET_H

/**
 * @brief SSID (nätverksnamn) för det WiFi-nätverk som enheten ska ansluta till.
 * 
 * Används av WiFi.begin() i main.cpp. Ska hållas privat och inte laddas upp till Git.
 */
const char* hidden_ssid = "";
/**
 * @brief Lösenord för det WiFi-nätverk som enheten ska ansluta till.
 * 
 * Används tillsammans med SSID för att etablera WiFi-anslutning. Ska hållas hemligt.
 */
const char* hidden_password = ""; 

#endif