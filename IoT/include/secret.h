#ifndef SECRET_H
#define SECRET_H

/**
 * @brief SSID (name of the wireless network) that the microcontroller will attempt to connect to.
 * 
 * This value is used by the WiFi.begin() function in main.cpp to initiate the network connection.
 * It should be kept private and excluded from version control (e.g., via .gitignore) to protect sensitive information.
 */
const char* hidden_ssid = "";

/**
 * @brief Password for the specified WiFi network.
 * 
 * Required together with the SSID to authenticate and establish a secure connection to the network.
 * This value should be handled confidentially and not included in public codebases.
 */
const char* hidden_password = "";

#endif
