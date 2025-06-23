import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { infoData } from "../data/infoData";
import { useTheme } from "../theme/ThemeContext";

const ValueInfoModal = ({ visible, onClose, value }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const info = infoData[value];
  const title = info.title;
  const description = info.info;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={styles.backdrop}
        accessible={false}
        importantForAccessibility="no"
      >
        <View
          style={styles.container}
          accessible={true}
          accessibilityViewIsModal={true}
          accessibilityLabel={`${title}. ${description}. Press the close button to go back.`}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close information popup"
              android_ripple={{color: theme.tabBarIcon, radius: 15}}
            >
              <MaterialCommunityIcons
                name="window-close"
                size={25}
                style={styles.icon}
              />
            </Pressable>
          </View>

          <Text style={styles.infoText}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ValueInfoModal;

const createStyles = (theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      backgroundColor: theme.modalBackground,
      margin: 25,
      borderRadius: 10,
      padding: 20,
      paddingBottom: 50,
      opacity: 0.94,
      elevation: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      width: "100%"
    },
    headerText: {
      color: theme.textPrimary,
      fontSize: 20
    },
    infoText: {
      color: theme.textPrimary,
      lineHeight: 20,
      fontSize: 16
    },
    icon: {
      color: theme.tabBarIcon,
    },
  });
