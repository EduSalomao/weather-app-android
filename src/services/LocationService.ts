import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "WeatherX",
        message: "O app precisa de acesso à localização.",
        buttonNeutral: "Pergunte-me depois!",
        buttonNegative: "Cancelar",
        buttonPositive: "Permitir",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permissão de localização concedida");
    } else {
      console.log("Permissão de localização negada");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
} | null> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        console.log('Error getting location:', error);
        reject(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};
