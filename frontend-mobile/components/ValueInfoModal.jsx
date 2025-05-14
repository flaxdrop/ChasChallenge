import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const ValueInfoModal = ({ visible, onClose, value }) => {
  return (
    <View>
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>Popup modal</Text>
            <MaterialCommunityIcons
              name="window-close"
              size={30}
              style={styles.infoIcon}
              onPress={onClose}
            />
          </View>
          <Text>Information about {value}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ValueInfoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
