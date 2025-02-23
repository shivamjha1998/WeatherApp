import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Aclonica-Regular': require('../assets/fonts/Aclonica-Regular.ttf'),
    'Inter': require('../assets/fonts/Inter.ttf'),
    'Monomakh-Regular': require('../assets/fonts/Monomakh-Regular.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack screenOptions={{headerShown: false}}/>;
}
