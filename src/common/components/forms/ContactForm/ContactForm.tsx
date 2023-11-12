import React, {useEffect, useState} from "react";
import styles from "./ContactForm.module.scss";
import {validateForm} from "./validateForm";
import {sendFormData} from "../../../../api/contactAPI";
import InputMask from "react-input-mask";
import {Modal} from "../../modal/Modal";
import {IFormData} from "../../../types/types";


export const ContactForm = () => {

  const formItems = [
    {type: "text", id: "name", placeholder: "Введите ваше имя", label: "Имя"},
    {type: "email", id: "email", placeholder: "Введите ваш E-mail", label: "E-mail"},
    {type: "text", id: "phone", placeholder: "Введите номер в формате +375 ХХ ХХХ ХХ ХХ", label: "Телефон"},
    {type: "message", id: "message", placeholder: "Введите ваше сообщение", label: "Сообщение"},
  ]
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [err, setErr] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };


  const handleOfflineSubmit = () => {
    localStorage.setItem('queuedFormData', JSON.stringify(formData));
    setMessage('Отправка формы в ожидание. Данные будут отправлены, когда сервер снова станет доступен.');
  };


  const sendQueuedData = async (text?:string) => {
    try {
      const queuedData = localStorage.getItem('queuedFormData');
      if (queuedData) {
        const formData = JSON.parse(queuedData);
        await sendFormData(formData);
        localStorage.removeItem('queuedFormData');
        setMessage(`Отправка отложенных данных. ${text}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке отложенных данных:', error);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await sendFormData(formData);
        setMessage(data.message);
        setOpen(true);
        setErr(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        sendQueuedData(data.message)
      } catch (error) {
        setOpen(true);
        setMessage(String(error));
        setErr(true)
        handleOfflineSubmit()
      }
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = 'hidden';
      setErrors({})
    } else {
      setErrors(validationErrors);
    }
  };
  const handleCloseModal = () => {
    setOpen(false);
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';

  };
  useEffect(() => {

   if ( localStorage.getItem('queuedFormData')) sendQueuedData();
  }, []);

  return (
    <div className={styles.formContainer}>
      <h2>Форма обратной связи</h2>
      <form onSubmit={handleSubmit}>
        {
          formItems.map((item) => (
            <div key={item.id} className={errors[item.id] ? styles.formItemError : styles.formItem}>
              <label htmlFor={item.id}>{item.label}</label>
              {item.type === "message" ?
                <textarea id={item.id} name={item.id} placeholder={item.placeholder} rows={4} onChange={handleChange}
                          value={formData[item.id as keyof IFormData]} required></textarea>
                :
                item.id === "phone" ?
                  <InputMask mask="+375 (99) 999-99-99" type={item.type} id={item.id} name={item.id}
                             placeholder={item.placeholder}
                             onChange={handleChange}
                             value={formData[item.id as keyof IFormData]} required/>
                  :
                  <input type={item.type} id={item.id} name={item.id} placeholder={item.placeholder}
                         onChange={handleChange}
                         value={formData[item.id as keyof IFormData]} required/>}

              {errors[item.id] && <div className={styles.error}>{errors[item.id]}</div>}
            </div>
          ))
        }
        {open && <Modal handleCloseModal={handleCloseModal} message={message} err={err} title={"Server response"}/>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

