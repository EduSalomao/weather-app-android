import axios from 'axios';
import { WeatherDataType } from '../interfaces/WeatherData';

const token = "8d4e7035b71d431f30fa5e23125b3a91"

export const fetchTemperatureData = async (latitude: string, longitude: string): Promise<WeatherDataType | null> => {

  try {
    const response = await axios.get(`https://weather.contrateumdev.com.br/api/weather?lat=${latitude}&lon=${longitude}`);

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar temperatura:', error);
    return null;
  }
};
