import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { infoData } from "../data/infoData";

const ValueInfoModal = ({ visible, onClose, value }) => {
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
            <Text>Information about {title}</Text>
            <MaterialCommunityIcons
              name="window-close"
              size={30}
              style={styles.infoIcon}
              onPress={onClose}
            />
          </View>

          <Text>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ValueInfoModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
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
});
