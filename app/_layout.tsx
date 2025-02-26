import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Aclonica-Regular': require('../assets/fonts/Aclonica-Regular.ttf'),
    'Inter': require('../assets/fonts/Inter-Regular.ttf'),
    'PublicSans': require('../assets/fonts/PublicSans.ttf'),
    'Monomakh': require('../assets/fonts/Monomakh.ttf'),
    'SpaceMono': require('../assets/fonts/SpaceMono.ttf'),
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
