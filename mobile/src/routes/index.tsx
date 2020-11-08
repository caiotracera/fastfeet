import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';

import AuthRoutes from './auth.routes';
// import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffc042" />
      </View>
    );
  }

  return <AuthRoutes />;
};

export default Routes;
