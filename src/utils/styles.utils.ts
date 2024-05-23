import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.black1,
  },
  viewWrapper: {
    width: '95%',
    alignSelf: 'center',
  },
  primaryText: {
    color: colors.white,
    fontFamily: "Inter",
  },
  secondaryText: {
    color: colors.gray3,
    fontFamily: "Inter-Medium",
  },
});