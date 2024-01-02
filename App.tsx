import React from 'react';
import {MainRoute} from './src/routes/MainRoute';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>
  );
}

export default App;
