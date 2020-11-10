import React, { useState, useEffect } from 'react';
import { Image, Text, View, Keyboard } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import StepIndicator from 'react-native-step-indicator';

import Navbar from '../../../components/Navbar';
import HorizontalRow from '../../../components/HorizontalRow';

import packageImage from '../../../assets/images/package.png';

import {
  Container,
  Header,
  WelcomeContainer,
  WelcomeUserText,
  SubHeaderContainer,
  HeaderTitle,
  LocationContainer,
  LocationText,
  SearchContainer,
  TextInput,
  RightIcon,
  DeliveryContainer,
  Delivery,
  DeliveryHeader,
  DeliveryTitleContainer,
  DeliveryTitle,
  DeliveryDate,
  StepContainer,
  DeliveryFooter,
  DeliveryFooterText,
} from './styles';

const Pending: React.FC = () => {
  const [showNavbar, setShowNavibar] = useState(true);

  useEffect(() => {
    const keyboardShownListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowNavibar(false);
      },
    );

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowNavibar(true);
    });

    return () => {
      keyboardShownListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const labels = ['Aguardando', 'Retirado', 'Entregue'];
  return (
    <>
      <Container keyboardShouldPersistTaps="always">
        <Header>
          <WelcomeContainer>
            <WelcomeUserText>
              Bem vindo,
              {'\n'}
              Caio Tracera
            </WelcomeUserText>
            <FeatherIcon name="log-out" size={20} color="#FFC042" />
          </WelcomeContainer>

          <SubHeaderContainer>
            <HeaderTitle>Entregas</HeaderTitle>
            <LocationContainer>
              <FeatherIcon name="map-pin" size={20} color="#ffc042" />
              <LocationText>São Gonçalo</LocationText>
            </LocationContainer>
          </SubHeaderContainer>

          <SearchContainer style={{ elevation: 5 }}>
            <TextInput
              keyboardAppearance="default"
              placeholder="Filtrar por bairro"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <RightIcon name="search" size={20} color="#ffc042" />
          </SearchContainer>
        </Header>

        <View>
          <HorizontalRow>
            <Text
              style={{
                alignSelf: 'center',
                paddingHorizontal: 16,
                fontSize: 15,
                color: '#BEBCCC',
                lineHeight: 18,
              }}
            >
              8 entregas
            </Text>
          </HorizontalRow>
        </View>

        <DeliveryContainer>
          <Delivery style={{ elevation: 5 }}>
            <DeliveryHeader>
              <DeliveryTitleContainer>
                <Image source={packageImage} />
                <DeliveryTitle>Pacote 01</DeliveryTitle>
              </DeliveryTitleContainer>
              <DeliveryDate>01/07/2020</DeliveryDate>
            </DeliveryHeader>
            <StepContainer>
              <StepIndicator
                stepCount={3}
                currentPosition={1}
                labels={labels}
                customStyles={{
                  stepIndicatorSize: 12,
                  currentStepIndicatorSize: 12,
                  stepStrokeCurrentColor: '#00DA6D',
                  stepStrokeFinishedColor: '#00DA6D',
                  stepStrokeUnFinishedColor: '#DAD7E0',
                  separatorFinishedColor: '#00DA6D',
                  separatorUnFinishedColor: '#DAD7E0',
                  stepIndicatorFinishedColor: '#00DA6D',
                  stepIndicatorUnFinishedColor: '#DAD7E0',
                  stepIndicatorCurrentColor: '#00DA6D',
                  stepIndicatorLabelCurrentColor: '#00DA6D',
                  stepIndicatorLabelFinishedColor: '#00DA6D',
                  stepIndicatorLabelUnFinishedColor: '#DAD7E0',
                  currentStepLabelColor: '#00DA6D',
                  labelColor: '#DAD7E0',
                }}
              />
            </StepContainer>
            <DeliveryFooter>
              <DeliveryFooterText>Detalhes</DeliveryFooterText>
              <FeatherIcon name="chevron-right" size={20} color="#6f6c80" />
            </DeliveryFooter>
          </Delivery>

          <Delivery style={{ elevation: 5 }}>
            <DeliveryHeader>
              <DeliveryTitleContainer>
                <Image source={packageImage} />
                <DeliveryTitle>Pacote 01</DeliveryTitle>
              </DeliveryTitleContainer>
              <DeliveryDate>01/07/2020</DeliveryDate>
            </DeliveryHeader>
            <StepContainer>
              <StepIndicator
                stepCount={3}
                currentPosition={1}
                labels={labels}
                customStyles={{
                  stepIndicatorSize: 12,
                  currentStepIndicatorSize: 12,
                  stepStrokeCurrentColor: '#00DA6D',
                  stepStrokeFinishedColor: '#00DA6D',
                  stepStrokeUnFinishedColor: '#DAD7E0',
                  separatorFinishedColor: '#00DA6D',
                  separatorUnFinishedColor: '#DAD7E0',
                  stepIndicatorFinishedColor: '#00DA6D',
                  stepIndicatorUnFinishedColor: '#DAD7E0',
                  stepIndicatorCurrentColor: '#00DA6D',
                  stepIndicatorLabelCurrentColor: '#00DA6D',
                  stepIndicatorLabelFinishedColor: '#00DA6D',
                  stepIndicatorLabelUnFinishedColor: '#DAD7E0',
                  currentStepLabelColor: '#00DA6D',
                  labelColor: '#DAD7E0',
                }}
              />
            </StepContainer>
            <DeliveryFooter>
              <DeliveryFooterText>Detalhes</DeliveryFooterText>
              <FeatherIcon name="chevron-right" size={20} color="#6f6c80" />
            </DeliveryFooter>
          </Delivery>

          <Delivery style={{ elevation: 5 }}>
            <DeliveryHeader>
              <DeliveryTitleContainer>
                <Image source={packageImage} />
                <DeliveryTitle>Pacote 01</DeliveryTitle>
              </DeliveryTitleContainer>
              <DeliveryDate>01/07/2020</DeliveryDate>
            </DeliveryHeader>
            <StepContainer>
              <StepIndicator
                stepCount={3}
                currentPosition={0}
                labels={labels}
                customStyles={{
                  stepIndicatorSize: 12,
                  currentStepIndicatorSize: 12,
                  stepStrokeCurrentColor: '#00DA6D',
                  stepStrokeFinishedColor: '#00DA6D',
                  stepStrokeUnFinishedColor: '#DAD7E0',
                  separatorFinishedColor: '#00DA6D',
                  separatorUnFinishedColor: '#DAD7E0',
                  stepIndicatorFinishedColor: '#00DA6D',
                  stepIndicatorUnFinishedColor: '#DAD7E0',
                  stepIndicatorCurrentColor: '#00DA6D',
                  stepIndicatorLabelCurrentColor: '#00DA6D',
                  stepIndicatorLabelFinishedColor: '#00DA6D',
                  stepIndicatorLabelUnFinishedColor: '#DAD7E0',
                  currentStepLabelColor: '#00DA6D',
                  labelColor: '#DAD7E0',
                }}
              />
            </StepContainer>
            <DeliveryFooter>
              <DeliveryFooterText>Detalhes</DeliveryFooterText>
              <FeatherIcon name="chevron-right" size={20} color="#6f6c80" />
            </DeliveryFooter>
          </Delivery>
        </DeliveryContainer>
      </Container>
      {showNavbar && <Navbar pageName="Pending" />}
    </>
  );
};

export default Pending;
