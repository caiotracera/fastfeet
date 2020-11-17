import React, { useCallback, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import leftArrowImg from '../../assets/images/leftarrow.png';
import doneImage from '../../assets/images/feito.png';

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  CameraContainer,
  TextContainer,
  HelpText,
  CameraIconContainer,
  ImageContainer,
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

interface ImageProps {
  uri: string;
}

const DeliveryDetails: React.FC = () => {
  const [confirmationImage, setConfirmationImage] = useState<ImageProps>();
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const { delivery_id } = route.params as DeliveryDetailsRouteParams;

  const handleGoBack = useCallback(() => {
    navigation.navigate('DeliveryDetails');
  }, [navigation]);

  const handleAddImage = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Adicionar confirmação',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert(response.error);
          return;
        }

        const source = { uri: response.uri };
        setConfirmationImage(source);
      },
    );
  }, []);

  const handleSendPhoto = useCallback(async () => {
    const data = new FormData();
    data.append('signature', {
      type: 'image/jpeg',
      name: `${user.id}.jpg`,
      uri: confirmationImage?.uri,
    });

    await api.put(`deliveries/${delivery_id}`, data);
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 2000);
  }, [confirmationImage?.uri, delivery_id, navigation, user.id]);
  return (
    <>
      <HeaderContainer>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={leftArrowImg} />
        </BorderlessButton>

        <HeaderTitle>Confirmar</HeaderTitle>

        <View />
      </HeaderContainer>

      <Container>
        {!confirmationImage?.uri && (
          <CameraContainer style={{ elevation: 5 }}>
            <CameraIconContainer onPress={handleAddImage}>
              <FeatherIcons name="camera" size={32} color="#fff" />
            </CameraIconContainer>
          </CameraContainer>
        )}

        {confirmationImage?.uri && (
          <CameraContainer style={{ elevation: 5 }}>
            <ImageContainer source={{ uri: confirmationImage.uri }} />

            <CameraIconContainer onPress={handleAddImage}>
              <FeatherIcons name="refresh-ccw" size={32} color="#fff" />
            </CameraIconContainer>
          </CameraContainer>
        )}
        <TextContainer>
          <HelpText>
            Tire uma foto do pacote com a assinatura do destinatário.
          </HelpText>
        </TextContainer>
      </Container>

      {!confirmationImage?.uri && (
        <FinishDeliveryContainer>
          <FinishDeliveryButton disabled onPress={() => {}}>
            <FinishDeliveryButtonText>Enviar foto</FinishDeliveryButtonText>
          </FinishDeliveryButton>
        </FinishDeliveryContainer>
      )}

      {confirmationImage?.uri && (
        <FinishDeliveryContainer>
          <FinishDeliveryButton onPress={handleSendPhoto}>
            <FinishDeliveryButtonText>Enviar foto</FinishDeliveryButtonText>
          </FinishDeliveryButton>
        </FinishDeliveryContainer>
      )}

      <View>
        <Modal isVisible={modalVisible}>
          <ModalContainer>
            <Image source={doneImage} />
            <ModalTitle>Foto enviada!</ModalTitle>
            <ModalText>Pacote entregue.</ModalText>
          </ModalContainer>
        </Modal>
      </View>
    </>
  );
};

export default DeliveryDetails;
