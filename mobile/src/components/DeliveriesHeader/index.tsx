import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MAPBOX_TOKEN } from '@env';

import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
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
  SearchInputContainer,
  SugestContainer,
  SugestText,
  TextInput,
  RightIcon,
} from './styles';
import { ScrollView } from '../../pages/SignIn/styles';

interface LocationProps {
  latitude: number;
  longitude: number;
}

const DeliveriesHeader: React.FC = () => {
  const [userPosition, setUserPosition] = useState({} as LocationProps);
  const [userLocation, setUserLocation] = useState();
  const [searchedTerm, setSearchedTerm] = useState<String>();
  const [hasSearchTerm, setHasSearchedTerm] = useState(false);
  const [cities, setCities] = useState<string[]>();

  const { user, signOut } = useAuth();

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

  const handleOnChangeText = useCallback(async (text) => {
    if (text) {
      setHasSearchedTerm(true);
      setSearchedTerm(text);

      const response = await api.get(`cities?term=${text}`);
      setCities(response.data);
    } else {
      setHasSearchedTerm(false);
    }
  }, []);

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
        <SearchInputContainer>
          <TextInput
            keyboardAppearance="default"
            placeholder="Filtrar por bairro"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => handleOnChangeText(text)}
          />
          <RightIcon name="search" size={20} color="#ffc042" />
        </SearchInputContainer>

        {cities && hasSearchTerm && (
          <FlatList
            data={cities}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log(item);
                }}
                style={{ width: 350 }}
              >
                <SugestContainer key={item}>
                  <SugestText>{item}</SugestText>
                  <FeatherIcon name="map-pin" size={20} color="#ffc042" />
                </SugestContainer>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item}
          />
        )}
      </SearchContainer>
    </Header>
  );
};

export default DeliveriesHeader;
