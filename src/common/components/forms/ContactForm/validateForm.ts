import {IFormData} from "../../../types/types";
const isEmpty = (value: string): boolean => {
  return value.trim() === "";
};

const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phonePattern = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
  return phonePattern.test(phone);
};


export const validateForm = (formData: IFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (isEmpty(formData.name)) {
    errors.name = "Поле Имя обязательно для заполнения";
  }

  if (isEmpty(formData.email)) {
    errors.email = "Поле E-mail обязательно для заполнения";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Пожалуйста, введите корректный адрес электронной почты";
  }

  if (isEmpty(formData.phone)) {
    errors.phone = "Поле Телефон обязательно для заполнения";
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = "Пожалуйста, введите телефон в формате +375 ХХ ХХХ ХХ ХХ";
  }

  if (isEmpty(formData.message)) {
    errors.message = "Поле Сообщение обязательно для заполнения";
  }

  return errors;
};