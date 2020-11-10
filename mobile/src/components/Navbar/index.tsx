import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Container, NavbarTab, NavbarText } from './styles';

interface ComponentProps {
  pageName: string;
}

const Navbar: React.FC<ComponentProps> = ({ pageName }) => {
  const navigation = useNavigation();

  const handleGoToPending = useCallback(() => {
    navigation.navigate('Pending');
  }, [navigation]);

  const handleGoToDone = useCallback(() => {
    navigation.navigate('Done');
  }, [navigation]);
  return (
    <Container>
      <NavbarTab
        isActive={pageName === 'Pending'}
        onPress={pageName === 'Pending' ? () => {} : handleGoToPending}
        underlayColor={pageName === 'Pending' ? '#fff' : '#f7f5fa'}
      >
        <NavbarText isActive={pageName === 'Pending'}>Pendentes</NavbarText>
      </NavbarTab>

      <NavbarTab
        isActive={pageName === 'Done'}
        onPress={pageName === 'Done' ? () => {} : handleGoToDone}
        underlayColor={pageName === 'Done' ? '#fff' : '#f7f5fa'}
      >
        <NavbarText isActive={pageName === 'Done'}>Feitas</NavbarText>
      </NavbarTab>
    </Container>
  );
};

export default Navbar;
