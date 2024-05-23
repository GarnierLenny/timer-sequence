import { TextInput, Text } from "react-native-paper";
import { colors } from "../colors";
import { commonStyles } from "../styles.utils";

type InputFormProps = {
  value: any;
  setter: any;
  label: any;
};

export const InputForm = (props: InputFormProps) => {
  return (
    <TextInput
      label={<Text style={{ ...commonStyles.primaryText, color: colors.white }}>{props.label}</Text>}
      placeholderTextColor="#fff"
      activeUnderlineColor="#fff"
      cursorColor="#fff"
      mode="flat"
      underlineColor="#fff"
      selectionColor="#fff"
      value={props.value}
      textColor={colors.white}
      style={{ backgroundColor: colors.gray1 }}
      onChangeText={text => props.setter(text)} />
  );
};
