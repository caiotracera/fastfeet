import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #fff;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ffc042;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Inter-Regular';
`;

export const LeftIcon = styled(FeatherIcon)`
  margin-right: 16px;
  padding-right: 20px;

  border-right-color: #dad7e0;
  border-right-width: 1px;
`;

export const RightIcon = styled(FeatherIcon)`
  padding-right: 20px;
`;
