import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native';

export const Header = styled.View`
  padding: 0 24px;
  height: 200px;
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

  left: 6.4%;
  right: 6.4%;
  top: 87%;

  background-color: #fff;
  flex-direction: column;
  align-items: center;
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Inter-Regular';
  padding-left: 20px;
  color: #000;
  height: 56px;
  width: 100%;
`;

export const RightIcon = styled(FeatherIcon)`
  margin-right: 20px;
`;

export const SugestContainer = styled.View`
  height: 32px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 20px 20px 0;
  margin-bottom: 20px;

  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.1);
`;

export const SugestText = styled.Text`
  font-size: 16px;
  font-family: 'Inter-Regular';
  color: #000;

  align-items: center;
  justify-content: flex-start;
`;
