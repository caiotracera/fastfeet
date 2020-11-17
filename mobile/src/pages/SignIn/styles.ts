import styled from 'styled-components/native';
import { Form as UnformForm } from '@unform/mobile';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const ScrollView = styled(KeyboardAwareScrollView)`
  position: relative;
  margin: 0 0 -24px;
`;

export const Container = styled.ScrollView`
  position: relative;

  background-color: #4c33cc;
  height: ${Dimensions.get('window').height}px;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 40px;
  padding: 0 32px;
  height: 44px;
`;

export const WelcomeContainer = styled.View`
  margin-top: 88px;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 48px;
  line-height: 48px;
  font-family: 'RobotoCondensed-BoldItalic';

  max-width: 246px;

  color: #fff;
`;

export const Highlighted = styled.Text`
  color: #ffc042;
`;

export const Description = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 15px;
  line-height: 25px;
  color: #d4ccff;

  max-width: 180px;

  margin-top: 16px;
`;

export const Form = styled(UnformForm)`
  margin: 64px 0 0;
  padding: 0 32px;
`;

export const LoginOptions = styled.View`
  margin-top: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckboxLogin = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LoginOptionsText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 13px;
  line-height: 15px;
  color: #d4ccff;
`;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 24px;
  line-height: 28.13px;
  text-align: center;
  color: #fff;

  margin-top: 24px;
  margin-bottom: 8px;
`;

export const ModalText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 12px;
  line-height: 14.06px;
  text-align: center;
  color: #f7f5fa;
`;
