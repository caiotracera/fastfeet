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

  max-width: 225px;

  margin-top: 16px;
`;

export const AddressContainer = styled.View`
  padding: 0 32px;
  margin-top: 64px;
`;

export const AddressTitle = styled.Text`
  font-family: 'Inter-Bold';
  color: #fff;
  font-size: 10px;
  line-height: 12.1px;
`;

export const AddressContent = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 15px;
  line-height: 25px;
  color: #d4ccff;

  margin-top: 8px;
  max-width: 250px;
`;

export const BackContainer = styled.TouchableOpacity`
  margin-top: 135px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`;

export const BackText = styled.Text`
  color: #fff;
  font-family: 'Inter-Medium';
  font-size: 16px;
  line-height: 19.36px;
`;
