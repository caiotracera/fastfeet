import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;

  position: relative;
  height: ${Dimensions.get('screen').height}px;
`;

export const DeliveryContainer = styled.View`
  padding: 0 24px;
  margin: 16px 0 80px;
`;

export const Delivery = styled.View`
  margin-bottom: 16px;
  border-radius: 4px;

  background-color: #fff;
`;

export const DeliveryHeader = styled.View`
  padding: 24px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
`;

export const DeliveryTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DeliveryTitle = styled.Text`
  font-family: 'RobotoCondensed-Bold';
  font-size: 22px;
  line-height: 24px;

  margin-left: 12px;
`;

export const DeliveryDate = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 10px;
  line-height: 12px;
  color: #6f6c80;
`;

export const StepContainer = styled.View`
  margin-bottom: 24px;
`;

export const DeliveryFooter = styled.TouchableOpacity`
  height: 48px;
  background-color: #fff1d6;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 15px 16px;
`;

export const DeliveryFooterText = styled.Text`
  font-family: 'Inter-Medium';
  line-height: 18px;
  font-size: 15px;
  color: #4c4766;
`;
