import React, { useCallback, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import Modal from 'react-native-modal';

import api from '../../services/api';

import Header from '../../components/Header';
import doneImage from '../../assets/images/feito.png';
import erroImage from '../../assets/images/erro.png';

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
  ModalContainer,
  ModalTitle,
  ModalText,
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
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [erroMessage, setErrorMessage] = useState();

  const navigation = useNavigation();
  const route = useRoute();

  const { delivery_id } = route.params as DeliveryDetailsRouteParams;

  const handleGoToConfirmation = useCallback(() => {
    navigation.navigate('DeliveryConfirmation', { delivery_id });
  }, [delivery_id, navigation]);

  const handleStartDelivery = useCallback(async () => {
    try {
      const response = await api.put(`deliveries/${delivery_id}`);
      setSuccessModalVisible(true);
      setDelivery(response.data);
    } catch (error) {
      setErrorModalVisible(true);
      setErrorMessage(error.response.data.message);
    }
  }, [delivery_id]);

  const handleCloseSuccessModal = useCallback(() => {
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 2000);

    navigation.navigate('DeliveryDetails', { delivery_id });
  }, [delivery_id, navigation]);

  const handleCloseErrorModal = useCallback(() => {
    setTimeout(() => {
      setErrorModalVisible(false);
    }, 2000);
  }, []);

  navigation.addListener('focus', () => {
    api.get(`deliveries/${delivery_id}`).then((response) => {
      setDelivery(response.data);
    });
  });

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

          {!delivery.start_date && (
            <FinishDeliveryContainer>
              <FinishDeliveryButton onPress={handleStartDelivery}>
                <FinishDeliveryButtonText>
                  Iniciar entrega
                </FinishDeliveryButtonText>
              </FinishDeliveryButton>
            </FinishDeliveryContainer>
          )}

          {delivery.start_date && !delivery.end_date && (
            <FinishDeliveryContainer>
              <FinishDeliveryButton onPress={handleGoToConfirmation}>
                <FinishDeliveryButtonText>
                  Confirmar entrega
                </FinishDeliveryButtonText>
              </FinishDeliveryButton>
            </FinishDeliveryContainer>
          )}

          {delivery.end_date && (
            <FinishDeliveryContainer>
              <FinishDeliveryButton disabled onPress={() => {}}>
                <FinishDeliveryButtonText>
                  Pacote entregue
                </FinishDeliveryButtonText>
              </FinishDeliveryButton>
            </FinishDeliveryContainer>
          )}
        </>
      )}

      <View>
        <Modal
          isVisible={successModalVisible}
          onModalShow={handleCloseSuccessModal}
        >
          <ModalContainer>
            <Image source={doneImage} />
            <ModalTitle>Pacote retirado.</ModalTitle>
            <ModalText>Só falta entregar :)</ModalText>
          </ModalContainer>
        </Modal>
      </View>

      <View>
        <Modal
          isVisible={errorModalVisible}
          onModalShow={handleCloseErrorModal}
          animationIn="tada"
          backdropTransitionOutTiming={700}
        >
          <ModalContainer>
            <Image source={erroImage} />
            <ModalTitle>Ooops!</ModalTitle>
            <ModalText>{erroMessage}</ModalText>
          </ModalContainer>
        </Modal>
      </View>
    </>
  );
};

export default DeliveryDetails;
