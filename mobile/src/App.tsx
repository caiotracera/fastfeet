import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#ffc042' }}>
          <StatusBar
            networkActivityIndicatorVisible
            backgroundColor="#4c33cc"
          />

          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
