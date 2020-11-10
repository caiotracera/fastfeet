import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import Done from '../pages/Home/Done';
import Pending from '../pages/Home/Pending';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F7F5FA' },
      animationEnabled: false,
    }}
  >
    <App.Screen name="Pending" component={Pending} />
    <App.Screen name="Done" component={Done} />
  </App.Navigator>
);

export default AppRoutes;
