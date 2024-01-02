import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../services/LocationService';
import {fetchTemperatureData} from '../services/WeatherAPI';
import {useWeatherStore} from '../hooks/DataWeatherStore';
import {WeatherDataType} from '../interfaces/WeatherData';

const {width, height} = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const {weatherData, fetchWeatherData} = useWeatherStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await requestLocationPermission();
        const currentLocation = await getCurrentLocation();
        setLocation(currentLocation);

        if (currentLocation) {
          const latitudeString = currentLocation.latitude.toString();
          const longitudeString = currentLocation.longitude.toString();

          const fetchedData = await fetchTemperatureData(
            latitudeString,
            longitudeString,
          );

          if (fetchedData) {
            fetchWeatherData(fetchedData);
          }
        }
      } catch (error) {
        console.log('Falha ao buscar localização:', error);
      }
    };

    fetchData();
  }, []);
  const [data, setData] = useState<WeatherDataType | null>(null);

  useEffect(() => {
    setData(weatherData);
  }, [weatherData]);

  console.log(weatherData);

  return (
    <View style={styles.container}>
      {data && data.main && (
        <View>
          <Text style={styles.cityText}>{data.name}</Text>
          <Text style={styles.degText}>{data.main.temp.toFixed(1)}°C</Text>
        </View>
      )}
      <StatusBar barStyle={'light-content'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C1F31',
  },
  cityText: {
    fontSize: width * 0.1,
  },
  degText: {
    fontSize: width * 0.27,
  },
});
