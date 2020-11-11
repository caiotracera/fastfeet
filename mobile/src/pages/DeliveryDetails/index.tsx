import React, { useCallback } from 'react';
import { View, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

import leftArrowImg from '../../assets/images/leftarrow.png';

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  DetailsContainer,
  ContainerHeader,
  ContainerTitle,
  SituationContainer,
  InfoContainer,
  InfoContent,
  InfoTitle,
  InfoText,
  FinishDeliveryContainer,
  FinishDeliveryButton,
  FinishDeliveryButtonText,
} from './styles';

const DeliveryDetails: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGoToConfirmation = useCallback(() => {
    navigation.navigate('DeliveryConfirmation');
  }, [navigation]);
  return (
    <>
      <HeaderContainer>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={leftArrowImg} />
        </BorderlessButton>

        <HeaderTitle>Detalhes</HeaderTitle>

        <View />
      </HeaderContainer>

      <Container>
        <DetailsContainer style={{ elevation: 5 }}>
          <ContainerHeader>
            <FeatherIcons name="clipboard" size={20} color="#FFC042" />
            <ContainerTitle>Dados</ContainerTitle>
          </ContainerHeader>

          <InfoTitle>Destinatário</InfoTitle>
          <InfoText>Caio Tracera</InfoText>

          <InfoTitle>Endereço</InfoTitle>
          <InfoText>
            Rua Guilherme Gemballa, 260 Jardim América, SC
            {'\n'}
            89 168-000
          </InfoText>
        </DetailsContainer>

        <SituationContainer style={{ elevation: 5 }}>
          <ContainerHeader>
            <FeatherIcons name="info" size={20} color="#FFC042" />
            <ContainerTitle>Situação</ContainerTitle>
          </ContainerHeader>

          <InfoContainer>
            <InfoContent>
              <InfoTitle>Status</InfoTitle>
              <InfoText>Retirado</InfoText>
            </InfoContent>

            <InfoContent>
              <InfoTitle>Postado em</InfoTitle>
              <InfoText>01/07/2020</InfoText>
            </InfoContent>
            <InfoContent>
              <InfoTitle>Data de Retirada</InfoTitle>
              <InfoText>06/07/2020</InfoText>
            </InfoContent>

            <InfoContent>
              <InfoTitle>Data de entrega</InfoTitle>
              <InfoText>--/--/----</InfoText>
            </InfoContent>
          </InfoContainer>
        </SituationContainer>
      </Container>

      <FinishDeliveryContainer>
        <FinishDeliveryButton onPress={handleGoToConfirmation}>
          <FinishDeliveryButtonText>Confirmar entrega</FinishDeliveryButtonText>
        </FinishDeliveryButton>
      </FinishDeliveryContainer>
    </>
  );
};

export default DeliveryDetails;
