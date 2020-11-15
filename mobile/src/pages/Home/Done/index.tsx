import React, { useState, useEffect, useCallback } from 'react';
import { Image, Text, View, Keyboard, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import FeatherIcon from 'react-native-vector-icons/Feather';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';

import Navbar from '../../../components/Navbar';
import HorizontalRow from '../../../components/HorizontalRow';

import packageImage from '../../../assets/images/package.png';

import api from '../../../services/api';

import {
  Container,
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
import { useAuth } from '../../../hooks/auth';

interface DeliveryProps {
  id: string;
  product: string;
  created_at: Date;
  start_date: Date;
  end_date: Date;
  status: number;
}

const Done: React.FC = () => {
  const [showNavbar, setShowNavibar] = useState(true);
  const [deliveries, setDeliveries] = useState<DeliveryProps[]>([]);

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
    let unmounted = false;

    async function getData(): Promise<void> {
      const response = await api.get('/deliveryman?done=true');
      const allDeliveries = response.data;
      if (!unmounted) {
        setDeliveries(allDeliveries);
      }
    }

    getData();

    return () => {
      unmounted = true;
    };
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
      {showNavbar && <Navbar pageName="Done" />}
    </>
  );
};

export default Done;
