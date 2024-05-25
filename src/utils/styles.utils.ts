import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  viewWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  primaryText: {
    color: colors.black,
    fontFamily: "Inter",
  },
  secondaryText: {
    color: colors.gray3,
    fontFamily: "Inter-Medium",
  },
});