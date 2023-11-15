import axios, { AxiosResponse } from 'axios';

interface PingResponse {
  status: 'success';
  message: 'Server is ready';
}

export async function pingServer(): Promise<PingResponse> {
  try {
    const response: AxiosResponse<PingResponse> = await axios.get('https://g-gtask.vercel.app/api/ping');
    if (response.data.status === 'success') {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Ошибка на сервере');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      throw new Error(`Сетевая ошибка: ${axiosError.message}`);
    } else {
      throw error;
    }
  }
}