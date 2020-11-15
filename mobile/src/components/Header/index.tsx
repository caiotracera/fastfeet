import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';

import leftArrowImg from '../../assets/images/leftarrow.png';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <BorderlessButton onPress={handleGoBack}>
        <Image source={leftArrowImg} />
      </BorderlessButton>

      <Title>{title}</Title>

      <View />
    </Container>
  );
};

export default Header;
