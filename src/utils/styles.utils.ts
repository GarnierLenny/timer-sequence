import { StyleSheet } from 'react-native';
import { colors } from './colors.utils';

export const commonStyles = StyleSheet.create({
  viewWrapper: {
    display: 'flex',
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: '#f02',
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