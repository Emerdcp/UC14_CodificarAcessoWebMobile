import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import Login from '@/screens/Login'
import AppRoutes from '@/navigation/AppRoutes';
import { configurarGoogle } from "@/services/googleAuth";


export default function App() {

  useEffect(() => {
    configurarGoogle();
  }, []);

  return <AppRoutes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
