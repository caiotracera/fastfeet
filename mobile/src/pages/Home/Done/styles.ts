import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.ScrollView`
  flex: 1;

  position: relative;
  height: ${Dimensions.get('screen').height}px;
`;

export const Header = styled.View`
  padding: 0 24px;
  height: 228px;
  margin-bottom: 40px;

  background-color: #4c33cc;
`;

export const WelcomeContainer = styled.View`
  margin: 32px 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WelcomeUserText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 15px;
  color: #d4ccff;

  line-height: 20px;
`;

export const SubHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoCondensed-Bold';
  font-size: 32px;
  line-height: 36px;
  color: #fff;

  width: 113px;
`;

export const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LocationText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 15px;
  color: #d4ccff;

  margin-left: 13px;
`;

export const SearchContainer = styled.View`
  position: absolute;
  border-radius: 4px;

  height: 56px;

  left: 6.4%;
  right: 6.4%;
  top: 87%;

  background-color: #fff;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Inter-Regular';
  padding-left: 20px;
  color: #6f6c80;
`;

export const RightIcon = styled(FeatherIcon)`
  margin-right: 20px;
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
