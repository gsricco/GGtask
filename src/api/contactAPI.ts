import axios, { AxiosResponse, AxiosError } from 'axios';
import {FormResponse, IFormData} from "../common/types/types";



export async function sendFormData(formData: IFormData): Promise<FormResponse> {
  try {
    const response: AxiosResponse<FormResponse> = await axios.post('https://g-gtask.vercel.app/api/registration', formData);

    if (response.data.status === 'success') {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError<FormResponse> = error;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.message);
      } else {
        throw new Error('Сетевая ошибка. Пожалуйста, попробуйте еще раз.');
      }
    } else {
      throw error;
    }
  }
}