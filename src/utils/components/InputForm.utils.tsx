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
      label={<Text style={{ ...commonStyles.primaryText}}>{props.label}</Text>}
      mode="outlined"
      value={props.value}
      textColor={colors.black}
      onChangeText={text => props.setter(text)} />
  );
};
