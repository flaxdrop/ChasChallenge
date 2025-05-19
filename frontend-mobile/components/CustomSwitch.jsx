import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

//Två värden, på eller av
//Vad händer vid toggle

const CustomSwitch = ({onToggle, isOn}) => {
      const { theme, isDark, toggleTheme } = useTheme();
      const styles = createStyles(theme);
  return (
    <Pressable
    onPress={onToggle}
    style={styles.container}
    >
        <View style={[ styles.track, isOn && styles.trackOn ]}>
            <View style={[ styles.thumb, isOn && styles.thumbOn ]}>
                <MaterialCommunityIcons
                name={isOn ? "bell" : "bell-off"}
                size={20}
                color={theme.textPrimary}/>
            </View>

        </View>
    </Pressable>

        
    
  )
}

export default CustomSwitch

const createStyles = (theme) => StyleSheet.create({
    container: {
        alignSelf: "flex-start",
    },
    track: {
        width: 60,
        height: 35,
        backgroundColor: theme.secondary,
        borderRadius: 30,
        borderWidth: 1,
        padding: 2,
        justifyContent: "center"

    },
    trackOn: {
        backgroundColor: theme.secondary
    },
    thumb: {
        width: 30,
        height: 30,
        backgroundColor: theme.secondary,
        borderRadius: 30,
        justifyContent: "center",
        alignSelf: "flex-start",
        alignItems: "center"
    },
    thumbOn: {
        alignSelf: "flex-end",
        backgroundColor: theme.primary
    }
})