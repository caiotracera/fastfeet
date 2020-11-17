import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import DeliveriesHeader from '../components/DeliveriesHeader';

import Done from '../pages/Home/Done';
import Pending from '../pages/Home/Pending';
import DeliveryDetails from '../pages/DeliveryDetails';
import DeliveryConfirmation from '../pages/DeliveryConfirmation';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F7F5FA' },
      animationEnabled: false,
    }}
  >
    <App.Screen
      name="Pending"
      component={Pending}
      options={{ headerShown: true, header: () => <DeliveriesHeader /> }}
    />
    <App.Screen
      name="Done"
      component={Done}
      options={{ headerShown: true, header: () => <DeliveriesHeader /> }}
    />
    <App.Screen
      name="DeliveryDetails"
      component={DeliveryDetails}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
      }}
    />
    <App.Screen
      name="DeliveryConfirmation"
      component={DeliveryConfirmation}
      options={{
        ...TransitionPresets.ModalPresentationIOS,
        animationEnabled: true,
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
