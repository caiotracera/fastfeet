import React, { useCallback, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import leftArrowImg from '../../assets/images/leftarrow.png';

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
} from './styles';

interface ImageProps {
  uri: string;
}

const DeliveryDetails: React.FC = () => {
  const [confirmationImage, setConfirmationImage] = useState<ImageProps>();

  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
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
          <FinishDeliveryButton onPress={() => {}}>
            <FinishDeliveryButtonText>Enviar foto</FinishDeliveryButtonText>
          </FinishDeliveryButton>
        </FinishDeliveryContainer>
      )}
    </>
  );
};

export default DeliveryDetails;
