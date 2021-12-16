import React, { useState, createContext, useMemo } from 'react';
import Tabs from './navigation/Tabs'
import { NavigationContainer } from '@react-navigation/native'


export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}


