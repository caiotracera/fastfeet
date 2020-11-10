import styled, { css } from 'styled-components/native';

interface TabProps {
  isActive?: boolean;
}

export const Container = styled.View`
  position: absolute;
  bottom: 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const NavbarTab = styled.TouchableHighlight<TabProps>`
  height: 70px;
  width: 50%;

  align-items: center;
  justify-content: space-around;
  background-color: #f7f5fa;

  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.isActive &&
    css`
      background-color: #fff;
      border-top-width: 4px;
      border-top-color: #ffc042;
    `};
`;

export const NavbarText = styled.Text<TabProps>`
  color: #6f6c80;
  font-family: 'Inter-Regular';
  font-size: 15px;
  line-height: 18.15px;

  ${(props) =>
    props.isActive &&
    css`
      font-family: 'Inter-Medium';
      color: #4c33cc;
    `};
`;
