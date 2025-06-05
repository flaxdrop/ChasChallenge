import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

const CustomSwitch = ({onToggle, isOn, onIcon, offIcon, accessibilityLabel, accessibilityHint }) => {
      const { theme, isDark } = useTheme();
      const styles = createStyles(theme);
  return (
    <Pressable
    onPress={onToggle}
    style={styles.container}
    accessible={true}
    accessibilityRole='switch'
    accessibilityState={{checked: isOn}}
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    >
        <View style={[ styles.track, isOn && styles.trackOn ]}>
            <View style={[ styles.thumb, isOn && styles.thumbOn ]}>
                <MaterialCommunityIcons
                name={isOn ? onIcon : offIcon}
                size={20}
                color={isDark ? theme.primary : theme.secondary}/>
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
        justifyContent: "center",
        borderColor: theme.accent

    },
    trackOn: {
        backgroundColor: theme.secondary
    },
    thumb: {
        width: 30,
        height: 30,
        backgroundColor: theme.iconAccent,
        borderRadius: 30,
        justifyContent: "center",
        alignSelf: "flex-start",
        alignItems: "center"
    },
    thumbOn: {
        alignSelf: "flex-end",
        backgroundColor: theme.tabBarIconActive
    }
})