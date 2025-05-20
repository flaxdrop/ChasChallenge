import { StyleSheet, Pressable, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RefreshButton = ({ onRefresh }) => {
  return (
    <View>
      <Pressable onPress={onRefresh}>
        <MaterialCommunityIcons name={"refresh"} size={30} />
      </Pressable>
    </View>
  );
};

export default RefreshButton;

const styles = StyleSheet.create({});
