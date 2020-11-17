import styled, { css } from 'styled-components/native';

interface ButtonProps {
  disabled?: boolean;
}

export const Container = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
  padding: 0 24px;

  background-color: #f7f5fa;
`;

export const HeaderContainer = styled.View`
  padding: 11px 24px;
  height: 134px;
  background-color: #4c33cc;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoCondensed-Bold';
  color: #fff;
  font-size: 26px;
`;

export const CameraContainer = styled.View`
  position: absolute;
  top: -30px;

  height: 90%;
  width: 100%;

  background-color: #fff;
  border-radius: 4px;

  align-items: center;
  justify-content: flex-end;
`;

export const ImageContainer = styled.Image`
  position: absolute;

  height: 100%;
  width: 100%;

  background-color: #fff;
  border-radius: 4px;

  align-items: center;
  justify-content: flex-end;
`;

export const CameraIconContainer = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  border-radius: ${64 / 2}px;
  background-color: rgba(0, 0, 0, 0.4);

  align-items: center;
  justify-content: center;

  margin-bottom: 24px;
`;

export const TextContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;

  bottom: 25px;
`;

export const HelpText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 10px;
  line-height: 15px;
  color: #6f6c80;
  text-align: center;

  max-width: 150px;
`;

export const FinishDeliveryContainer = styled.View`
  position: relative;
  bottom: 0;
  height: 81px;
  width: 100%;

  background: #fff;
  padding-bottom: 35px;
`;

export const FinishDeliveryButton = styled.TouchableOpacity<ButtonProps>`
  background-color: #ffc042;
  align-items: center;
  justify-content: center;

  height: 56px;
  border-radius: 4px;

  margin: 12px 24px;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

export const FinishDeliveryButtonText = styled.Text`
  color: #4c4766;
  font-size: 15px;
  line-height: 17.58px;
  font-family: 'Inter-Bold';
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
