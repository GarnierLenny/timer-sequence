import { TextInput, Text } from "react-native-paper";
import { colors } from "../colors.utils";
import { commonStyles } from "../styles.utils";
import { KeyboardTypeOptions } from "react-native";

interface InputFormProps {
  value: any;
  setter: any;
  label: any;
  secure?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  type?: KeyboardTypeOptions;
  capitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export const InputForm = ({
  value,
  setter,
  label,
  secure = false,
  left = undefined,
  right = undefined,
  type = "default",
  capitalize = 'none',
}: InputFormProps) => {
  return (
    <TextInput
      keyboardType={type}
      autoCapitalize={capitalize}
      secureTextEntry={secure}
      label={<Text style={{ ...commonStyles.primaryText }}>{label}</Text>}
      mode="outlined"
      value={value}
      textColor={colors.black}
      onChangeText={(text) => setter(text)}
      left={left}
      right={right}
    />
  );
};
