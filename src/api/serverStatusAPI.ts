import axios, { AxiosResponse } from 'axios';

interface PingResponse {
  status: 'success';
  message: 'Server is ready';
}
interface GetDataResponse {
  status: "success",
  message: {
    title: string,
    field_first: string,
    field_second: string,
    field_third: string,
    field_fourth: string,
    field_fifth: string
  },
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

export async function getDataServer(): Promise<GetDataResponse> {
  try {
    const response: AxiosResponse<GetDataResponse> = await axios.get('https://g-gtask.vercel.app/api/request');
    if (response.data.status === 'success') {
      return response.data;
    } else {
      throw new Error( 'Ошибка на сервере');
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