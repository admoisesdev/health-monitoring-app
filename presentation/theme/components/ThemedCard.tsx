import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper";


interface ThemedCardProps {
  children: React.ReactNode;
  mode?: "contained" | "outlined" | "elevated";
  style?: StyleProp<ViewStyle>;
}

export const ThemedCard = ({
  children,
  mode = "contained",
  style,
}: ThemedCardProps) => {
  return (
    <Card style={[styles.card, style]} mode={mode} testID="card-container">
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    marginHorizontal: "auto",
  },
});
