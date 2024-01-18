import 'react-native-gesture-handler';
import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { AppNavigation } from './src/navigation';
import { apiCall } from './src/api/openAI';

export default function App() {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await apiCall('what is quantum computing');
  //     // Agregar un retraso de, por ejemplo, 5 segundos
  //     setTimeout(() => {
  //       // Realizar la siguiente llamada aquí
  //     }, 5000);
  //   };

  //   fetchData();
  // }, []);


  return (
    <AppNavigation />
  )
}