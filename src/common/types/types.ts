export type ModalPropsType ={
  handleCloseModal:()=>void
  message:string
  err: boolean
  title:string
}

export interface FormResponse {
  status: 'success' | 'error';
  message: string;
}

export interface FormError {
  field: string;
  message: string;
}

export interface IFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
