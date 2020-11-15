import React, { useState, useEffect, useCallback } from 'react';
import { Image, Text, View, Keyboard } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { MAPBOX_TOKEN } from '@env';

import Navbar from '../../../components/Navbar';
import HorizontalRow from '../../../components/HorizontalRow';

import packageImage from '../../../assets/images/package.png';

import api from '../../../services/api';

import { useAuth } from '../../../hooks/auth';

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

interface LocationProps {
  latitude: number;
  longitude: number;
}

interface DeliveryProps {
  id: string;
  product: string;
  created_at: Date;
  start_date: Date;
  end_date: Date;
  status: number;
}

const Pending: React.FC = () => {
  const [showNavbar, setShowNavibar] = useState(true);
  const [userPosition, setUserPosition] = useState({} as LocationProps);
  const [userLocation, setUserLocation] = useState();
  const [deliveries, setDeliveries] = useState<DeliveryProps[]>([]);

  const { user, signOut } = useAuth();
  const navigation = useNavigation();

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

  useEffect(() => {
    async function getUserLocation(): Promise<void> {
      if (MAPBOX_TOKEN) {
        const response = await api.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${userPosition.longitude},${userPosition.latitude}.json?access_token=${MAPBOX_TOKEN}&language=pt`,
        );
        setUserLocation(response.data.features[3].context[0].text_pt);
      }
    }

    Geolocation.getCurrentPosition((position) => {
      setUserPosition(position.coords);
    });

    getUserLocation();
  }, [userPosition.latitude, userPosition.longitude]);

  useEffect(() => {
    api.get('/deliveryman').then((response) => {
      const allDeliveries = response.data as DeliveryProps[];

      setDeliveries(allDeliveries);
    });
  }, [deliveries]);

  const handleGoToDetails = useCallback(() => {
    navigation.navigate('DeliveryDetails');
  }, [navigation]);
  const formatDeliveryDate = useCallback((created_date) => {
    return format(new Date(created_date), 'dd/MM/yyyy');
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
              {user.name}
            </WelcomeUserText>
            <TouchableOpacity onPress={signOut}>
              <FeatherIcon name="log-out" size={20} color="#FFC042" />
            </TouchableOpacity>
          </WelcomeContainer>

          <SubHeaderContainer>
            <HeaderTitle>Entregas</HeaderTitle>
            <LocationContainer>
              <FeatherIcon name="map-pin" size={20} color="#ffc042" />
              {userLocation && <LocationText>{userLocation}</LocationText>}
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
              {`${deliveries.length} entregas`}
            </Text>
          </HorizontalRow>
        </View>

        <DeliveryContainer>
          {deliveries &&
            deliveries.map((delivery) => (
              <Delivery key={delivery.id} style={{ elevation: 5 }}>
                <DeliveryHeader>
                  <DeliveryTitleContainer>
                    <Image source={packageImage} />
                    <DeliveryTitle>{delivery.product}</DeliveryTitle>
                  </DeliveryTitleContainer>
                  <DeliveryDate>
                    {formatDeliveryDate(delivery.created_at)}
                  </DeliveryDate>
                </DeliveryHeader>
                <StepContainer>
                  <StepIndicator
                    stepCount={3}
                    currentPosition={delivery.status}
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
                <DeliveryFooter onPress={handleGoToDetails}>
                  <DeliveryFooterText>Detalhes</DeliveryFooterText>
                  <FeatherIcon name="chevron-right" size={20} color="#6f6c80" />
                </DeliveryFooter>
              </Delivery>
            ))}
        </DeliveryContainer>
      </Container>
      {showNavbar && <Navbar pageName="Pending" />}
    </>
  );
};

export default Pending;
