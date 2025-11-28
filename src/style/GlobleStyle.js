import {StyleSheet, Dimensions} from 'react-native';
import fonts from '../utils/fonts';
import color from '../utils/color';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {Width, Height} from './Responsive';

const GlobalStyle = StyleSheet.create({
  MainContaioner: {
    flex: 1,
    backgroundColor: color.background,
  },
  ScrollContent: {
    flexGrow: 1,
  },
  HeaderContaioner: {
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Height * 0.2,
    paddingHorizontal: scale(24),
  },
  HeaderText: {
    fontSize: scale(24),
    fontFamily: fonts[700],
    color: color.accentPrimary,
    textAlign: 'center',
  },
  FormContaioner: {
    flex: 1,
  },
  Form: {
    backgroundColor: color.accentPrimary,
    marginTop: verticalScale(-32),
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(20),
    marginHorizontal: scale(24),
    elevation: 6,
    shadowColor: color.shadowcolor,
    height: Height * 0.7,
  },
  LableText: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    color: color.textPrimary,
    marginTop: verticalScale(24),
  },
  Text: {
    fontSize: scale(12),
    fontFamily: fonts[400],
    color: color.textPrimary,
    textAlign: 'center',
    marginTop: verticalScale(48),
  },
  HighlightText: {
    fontFamily: fonts[700],
    color: color.primary,
  },
  button: {
    width: scale(32),
    height: scale(32),
    borderRadius: 24,
    backgroundColor: color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  RadioButton: {
    borderRadius: scale(24),
    width: scale(18),
    height: scale(18),
    borderWidth: scale(2),
    borderColor: color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RadioInsideButton: {
    borderRadius: scale(16),
    width: scale(10),
    height: scale(10),
    backgroundColor: color.secondary,
  },
  RadioContaioner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
    justifyContent: 'space-between',
  },
  RadioText: {
    fontSize: scale(12),
    fontFamily: fonts[400],
    color: color.textPrimary,
    marginLeft: scale(10),
  },
  DatePickerContaioner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  },
  DatePickerText: {
    fontSize: scale(14),
    fontFamily: fonts[400],
    color: color.textPrimary,
  },
  DatePickerButton: {
    backgroundColor: color.secondary,
    borderRadius: scale(8),
    padding: moderateScale(12),
  },
  DatePickerButtonText: {
    fontSize: scale(12),
    fontFamily: fonts[700],
    color: color.textSecondary,
  },
});

export default GlobalStyle;
