import { TextInput, Text } from "react-native-paper";
import { colors } from "../colors";
import { commonStyles } from "../styles.utils";

type InputFormProps = {
  value: any;
  setter: any;
  label: any;
  secure?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const InputForm = ({
  value,
  setter,
  label,
  secure = false,
  left = undefined,
  right = undefined,
}: InputFormProps) => {
  return (
    <TextInput
      autoCapitalize="none"
      secureTextEntry={secure}
      label={<Text style={{ ...commonStyles.primaryText}}>{label}</Text>}
      mode="outlined"
      value={value}
      textColor={colors.black}
      onChangeText={text => setter(text)}
      left={left}
      right={right}
    />
  );
};
