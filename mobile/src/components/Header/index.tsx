import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';

import leftArrowImg from '../../assets/images/leftarrow.png';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  hasCloseAll?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, hasCloseAll = false }) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    hasCloseAll ? navigation.goBack() : navigation.navigate('OrphanagesMap');
  }, [hasCloseAll, navigation]);

  const handleCloseAll = useCallback(() => {
    navigation.navigate('OrphanagesMap');
  }, [navigation]);

  return (
    <Container>
      <BorderlessButton onPress={handleGoBack}>
        <Image source={leftArrowImg} />
      </BorderlessButton>

      <Title>{title}</Title>

      {hasCloseAll ? (
        <BorderlessButton onPress={handleCloseAll}>
          <FeatherIcons name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
