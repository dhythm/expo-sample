import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
  onPress: React.ComponentProps<typeof TouchableOpacity>["onPress"];
  text: string;
}

export const Button = ({ onPress, text }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
