#include "Arduino.h"
#include <sps30.h>
#include <SparkFunBME280.h>
#include <SparkFun_ENS160.h>
#include "Wire.h"

BME280 mySensor;

SparkFun_ENS160 myENS; 

int ensStatus; 

// Example arduino sketch, based on 
// https://github.com/Sensirion/embedded-sps/blob/master/sps30-i2c/sps30_example_usage.c


// uncomment the next line to use the serial plotter
// #define PLOTTER_FORMAT

void setup() {
  //delay(3000);
  Serial.begin(115200);
  //while(!Serial);
  Serial.println("Reading basic values from BME280");

  Wire1.begin();

  if (mySensor.beginI2C(Wire1) == false) //Begin communication over I2C
  {
    Serial.println("The sensor did not respond. Please check wiring.");
    while(1); //Freeze
  }

  delay(1000); //end of BME

  if( !myENS.begin(Wire1) )
	{
		Serial.println("Could not communicate with the ENS160, check wiring.");
		while(1);
	}

    Serial.println("Example 1 Basic Example.");

	// Reset the indoor air quality sensor's settings.
	if( myENS.setOperatingMode(SFE_ENS160_RESET) )
		Serial.println("Ready.");

        delay(100);

        // Device needs to be set to idle to apply any settings.
        // myENS.setOperatingMode(SFE_ENS160_IDLE);
    
        // Set to standard operation
        // Others include SFE_ENS160_DEEP_SLEEP and SFE_ENS160_IDLE
        myENS.setOperatingMode(SFE_ENS160_STANDARD);
    
        // There are four values here: 
        // 0 - Operating ok: Standard Operation
        // 1 - Warm-up: occurs for 3 minutes after power-on.
        // 2 - Initial Start-up: Occurs for the first hour of operation.
      //												and only once in sensor's lifetime.
        // 3 - No Valid Output
        ensStatus = myENS.getFlags();
        Serial.print("Gas Sensor Status Flag (0 - Standard, 1 - Warm up, 2 - Initial Start Up): ");
        Serial.println(ensStatus);

  delay(1000); //end of ENS
  
  int16_t ret;
  uint8_t auto_clean_days = 4;
  uint32_t auto_clean;

  sensirion_i2c_init();

  while (sps30_probe() != 0) {
    Serial.print("SPS sensor probing failed\n");
    delay(500);
  }

#ifndef PLOTTER_FORMAT
  Serial.print("SPS sensor probing successful\n");
#endif /* PLOTTER_FORMAT */

  ret = sps30_set_fan_auto_cleaning_interval_days(auto_clean_days);
  if (ret) {
    Serial.print("error setting the auto-clean interval: ");
    Serial.println(ret);
  }

  ret = sps30_start_measurement();
  if (ret < 0) {
    Serial.print("error starting measurement\n");
  }

#ifndef PLOTTER_FORMAT
  Serial.print("measurements started\n");
#endif /* PLOTTER_FORMAT */

#ifdef SPS30_LIMITED_I2C_BUFFER_SIZE
  Serial.print("Your Arduino hardware has a limitation that only\n");
  Serial.print("  allows reading the mass concentrations. For more\n");
  Serial.print("  information, please check\n");
  Serial.print("  https://github.com/Sensirion/arduino-sps#esp8266-partial-legacy-support\n");
  Serial.print("\n");
  delay(2000);
#endif

  delay(1000);
}

void loop() {

  Serial.print("Humidity: ");
  Serial.print(mySensor.readFloatHumidity(), 0);

  Serial.print(" Pressure: ");
  Serial.print(mySensor.readFloatPressure(), 0);

  Serial.print(" Alt: ");
  //Serial.print(mySensor.readFloatAltitudeMeters(), 1);
  Serial.print(mySensor.readFloatAltitudeFeet(), 1);

  Serial.print(" Temp: ");
  //Serial.print(mySensor.readTempC(), 2);
  Serial.print(mySensor.readTempF(), 2);

  Serial.println();

  delay(1000); //end of BME

  if( myENS.checkDataStatus() )
	{
		Serial.print("Air Quality Index (1-5) : ");
		Serial.println(myENS.getAQI());

		Serial.print("Total Volatile Organic Compounds: ");
		Serial.print(myENS.getTVOC());
		Serial.println("ppb");

		Serial.print("CO2 concentration: ");
		Serial.print(myENS.getECO2());
		Serial.println("ppm");

	Serial.print("Gas Sensor Status Flag (0 - Standard, 1 - Warm up, 2 - Initial Start Up): ");
    Serial.println(myENS.getFlags());

		Serial.println();
    Serial.println();

  delay(1000); //end of ENS

  struct sps30_measurement m;
  char serial[SPS30_MAX_SERIAL_LEN];
  uint16_t data_ready;
  int16_t ret;

  do {
    ret = sps30_read_data_ready(&data_ready);
    if (ret < 0) {
      Serial.print("error reading data-ready flag: ");
      Serial.println(ret);
    } else if (!data_ready)
      Serial.print("data not ready, no new measurement available\n");
    else
      break;
    delay(100); /* retry in 100ms */
  } while (1);

  ret = sps30_read_measurement(&m);
  if (ret < 0) {
    Serial.print("error reading measurement\n");
  } else {

#ifndef PLOTTER_FORMAT
    Serial.print("PM  1.0: ");
    Serial.println(m.mc_1p0);
    Serial.print("PM  2.5: ");
    Serial.println(m.mc_2p5);
    Serial.print("PM  4.0: ");
    Serial.println(m.mc_4p0);
    Serial.print("PM 10.0: ");
    Serial.println(m.mc_10p0);

#ifndef SPS30_LIMITED_I2C_BUFFER_SIZE
    Serial.print("NC  0.5: ");
    Serial.println(m.nc_0p5);
    Serial.print("NC  1.0: ");
    Serial.println(m.nc_1p0);
    Serial.print("NC  2.5: ");
    Serial.println(m.nc_2p5);
    Serial.print("NC  4.0: ");
    Serial.println(m.nc_4p0);
    Serial.print("NC 10.0: ");
    Serial.println(m.nc_10p0);

    Serial.print("Typical particle size: ");
    Serial.println(m.typical_particle_size);
#endif

    Serial.println();

#else
    // since all values include particles smaller than X, if we want to create buckets we 
    // need to subtract the smaller particle count. 
    // This will create buckets (all values in micro meters):
    // - particles        <= 0,5
    // - particles > 0.5, <= 1
    // - particles > 1,   <= 2.5
    // - particles > 2.5, <= 4
    // - particles > 4,   <= 10

    Serial.print(m.nc_0p5);
    Serial.print(" ");
    Serial.print(m.nc_1p0  - m.nc_0p5);
    Serial.print(" ");
    Serial.print(m.nc_2p5  - m.nc_1p0);
    Serial.print(" ");
    Serial.print(m.nc_4p0  - m.nc_2p5);
    Serial.print(" ");
    Serial.print(m.nc_10p0 - m.nc_4p0);
    Serial.println();


#endif /* PLOTTER_FORMAT */

  }

  delay(1000);
}
}
