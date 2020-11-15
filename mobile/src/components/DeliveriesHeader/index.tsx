import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MAPBOX_TOKEN } from '@env';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
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
} from './styles';

interface LocationProps {
  latitude: number;
  longitude: number;
}

const DeliveriesHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  const [userPosition, setUserPosition] = useState({} as LocationProps);
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (location) => {
        setUserPosition(location.coords);
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    if (userPosition.latitude) {
      api
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${userPosition.longitude},${userPosition.latitude}.json?access_token=${MAPBOX_TOKEN}&language=pt`,
        )
        .then((response) => {
          setUserLocation(response.data.features[3].context[0].text_pt);
        });
    }
  }, [userPosition.latitude, userPosition.longitude]);

  return (
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
  );
};

export default DeliveriesHeader;
