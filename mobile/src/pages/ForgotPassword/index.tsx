import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/images/logo.png';
import logotipoImg from '../../assets/images/logotipo.png';
import backgroundImg from '../../assets/images/backgroundImage.png';
import backArrow from '../../assets/images/backarrow.png';

import {
  ScrollView,
  Container,
  BackgroundImage,
  Header,
  WelcomeContainer,
  Title,
  Highlighted,
  Description,
  AddressContainer,
  AddressTitle,
  AddressContent,
  BackContainer,
  BackText,
} from './styles';

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <BackgroundImage source={backgroundImg} />

      <Header>
        <Image source={logotipoImg} />
        <Image source={logoImg} />
      </Header>

      <WelcomeContainer>
        <Title>
          <Highlighted>Esqueceu, </Highlighted>
          sua senha?
        </Title>

        <Description>
          Por motivos de segurança, para recurá-la, vá até a central da
          distribuidora Fastfeet.
        </Description>
      </WelcomeContainer>

      <AddressContainer>
        <AddressTitle>ENDEREÇO</AddressTitle>
        <AddressContent>
          Rua Guilherme Gemballa, 260 Jardim América, SC
          {'\n'}
          89 168-000
        </AddressContent>
      </AddressContainer>

      <BackContainer onPress={handleGoBack}>
        <Image source={backArrow} />
        <BackText>Voltar para o login</BackText>
      </BackContainer>
    </Container>
  );
};

export default ForgotPassword;
