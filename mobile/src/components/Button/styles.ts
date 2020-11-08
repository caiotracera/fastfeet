import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 56px;
  background: #ffc042;
  border-radius: 4px;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Inter-Medium';
  color: #4c4766;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;
