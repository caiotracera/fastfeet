import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

import Header from '../../components/Header';

import api from '../../services/api';

import {
  Container,
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

interface DeliveryDetailsRouteParams {
  delivery_id: string;
}

interface IDelivery {
  id: string;
  product: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  status: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}

const DeliveryDetails: React.FC = () => {
  const [delivery, setDelivery] = useState<IDelivery>();

  const navigation = useNavigation();
  const route = useRoute();

  const { delivery_id } = route.params as DeliveryDetailsRouteParams;

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGoToConfirmation = useCallback(() => {
    navigation.navigate('DeliveryConfirmation');
  }, [navigation]);

  useEffect(() => {
    api.get(`deliveries/${delivery_id}`).then((response) => {
      setDelivery(response.data);
    });
  }, [delivery_id]);

  const formatDate = useCallback((date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }, []);

  return (
    <>
      <Header title="Detalhes" />
      {delivery && (
        <>
          <Container>
            <DetailsContainer style={{ elevation: 5 }}>
              <ContainerHeader>
                <FeatherIcons name="clipboard" size={20} color="#FFC042" />
                <ContainerTitle>Dados</ContainerTitle>
              </ContainerHeader>

              <InfoTitle>Produto</InfoTitle>
              <InfoText>{delivery.product}</InfoText>

              <InfoTitle>Endereço</InfoTitle>
              <InfoText>
                {delivery.address}
                {'\n'}
                {`${delivery.city}, ${delivery.state}`}
                {'\n'}
                {delivery.postal_code}
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
                  {delivery.status === 0 && <InfoText>Aguardando</InfoText>}
                  {delivery.status === 1 && <InfoText>Retirado</InfoText>}
                  {delivery.status === 2 && <InfoText>Entregue</InfoText>}
                </InfoContent>

                <InfoContent>
                  <InfoTitle>Postado em</InfoTitle>
                  <InfoText>{formatDate(delivery.created_at)}</InfoText>
                </InfoContent>
                <InfoContent>
                  <InfoTitle>Data de Retirada</InfoTitle>
                  {delivery.start_date ? (
                    <InfoText>{formatDate(delivery.start_date)}</InfoText>
                  ) : (
                    <InfoText>--/--/----</InfoText>
                  )}
                </InfoContent>

                <InfoContent>
                  <InfoTitle>Data de entrega</InfoTitle>
                  {delivery.end_date ? (
                    <InfoText>{formatDate(delivery.end_date)}</InfoText>
                  ) : (
                    <InfoText>--/--/----</InfoText>
                  )}
                </InfoContent>
              </InfoContainer>
            </SituationContainer>
          </Container>

          <FinishDeliveryContainer>
            <FinishDeliveryButton onPress={handleGoToConfirmation}>
              <FinishDeliveryButtonText>
                Confirmar entrega
              </FinishDeliveryButtonText>
            </FinishDeliveryButton>
          </FinishDeliveryContainer>
        </>
      )}
    </>
  );
};

export default DeliveryDetails;
