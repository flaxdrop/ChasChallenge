import { StyleSheet, Text, View, Modal, Button } from "react-native";
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
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <MaterialCommunityIcons
              name="window-close"
              size={20}
              style={styles.icon}
              onPress={onClose}
            />
          </View>

          <Text style={styles.infoText}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ValueInfoModal;

const createStyles = (theme) => StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: theme.modalBackground,
    margin: 25,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    color: theme.textPrimary
  },
  infoText: {
    color: theme.textPrimary,
    lineHeight: 20
  },
  icon: {
    color: theme.infoIcon
  }
});
