import React from 'react';
import { View, Text } from 'react-native';

const HorizontalRow: React.FC = ({ children }) => {
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 24 }}>
      <View
        style={{
          backgroundColor: '#BEBCCC',
          height: 1,
          flex: 1,
          alignSelf: 'center',
        }}
      />
      {children}
      <View
        style={{
          backgroundColor: '#BEBCCC',
          height: 1,
          flex: 1,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default HorizontalRow;
