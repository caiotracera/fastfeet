import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
  padding: 0 24px;

  background-color: #f7f5fa;
`;

export const DetailsContainer = styled.View`
  position: absolute;
  top: -25px;

  height: 268px;
  width: 100%;
  padding: 24px 16px;

  background-color: #fff;

  border-radius: 4px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerTitle = styled.Text`
  font-family: 'RobotoCondensed-Bold';
  font-size: 22px;
  color: #4c4766;

  margin-left: 15.5px;
`;

export const SituationContainer = styled.View`
  height: 218px;
  width: 100%;
  padding: 24px 16px;

  background-color: #fff;
  border-radius: 4px;
  margin-top: 265px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: left;
`;

export const InfoContent = styled.View`
  flex-direction: column;
  width: 50%;
`;

export const InfoTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 10px;
  line-height: 12.1px;
  color: #4c4766;

  text-transform: uppercase;

  margin-top: 24px;
`;

export const InfoText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 15px;
  line-height: 25px;
  color: #6f6c80;

  margin-top: 8px;
  max-width: 210px;
`;

export const FinishDeliveryContainer = styled.View`
  position: relative;
  bottom: 0;
  height: 81px;
  width: 100%;

  background: #fff;
  padding-bottom: 35px;
`;

export const FinishDeliveryButton = styled.TouchableOpacity`
  background-color: #ffc042;
  align-items: center;
  justify-content: center;

  height: 56px;
  border-radius: 4px;

  margin: 12px 24px;
`;

export const FinishDeliveryButtonText = styled.Text`
  color: #4c4766;
  font-size: 15px;
  line-height: 17.58px;
  font-family: 'Inter-Bold';
`;
