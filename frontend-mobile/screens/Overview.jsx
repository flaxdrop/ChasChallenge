import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableCurrentValue from "../components/ReusableCurrentValue";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";
import BoxGradient from "../components/BoxGradient";
import { useTheme } from "../theme/ThemeContext";

const Overview = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Background>
      <ContainerGradient>
        <Text>Overview of latest sensor data</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 15 }}
        >
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/aqi"}
              value={"aqi"}
              title={"AQI"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/humidity"}
              value={"humidity"}
              title={"Humidity"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/temperature"}
              value={"temperature"}
              title={"Temperature"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/pressure"}
              value={"pressure"}
              title={"Air Pressure"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/tvoc"}
              value={"tvoc"}
              title={"TVOC"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/eco2"}
              value={"eco2"}
              title={"ECO2"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/pm1"}
              value={"pm1"}
              title={"PM1"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/pm1"}
              value={"pm1"}
              title={"PM1"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/pm2_5"}
              value={"pm2_5"}
              title={"PM2.5"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/pm4"}
              value={"pm4"}
              title={"PM4"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/pm10"}
              value={"pm10"}
              title={"PM10"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/nc_0_5"}
              value={"nc_0_5"}
              title={"NC 0.5"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/nc_1_0"}
              value={"nc_1_0"}
              title={"NC 1.0"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/nc_2_5"}
              value={"nc_2_5"}
              title={"NC 2.5"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/nc_4_0"}
              value={"nc_4_0"}
              title={"NC 4.0"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/nc_10_0"}
              value={"nc_10_0"}
              title={"NC 10.0"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
          <BoxGradient>
            <ReusableCurrentValue
              valuePath={"measurements/typical_particle_size"}
              value={"typical_particle_size"}
              title={"Typical Particle Size"}
              valueSize={16}
              textSize={16}
            />
          </BoxGradient>
        </ScrollView>
      </ContainerGradient>
    </Background>
  );
};

export default Overview;

const createStyles = (theme) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
      width: "100%",
      padding: 10,
      marginBottom: 10,
    },
  });
