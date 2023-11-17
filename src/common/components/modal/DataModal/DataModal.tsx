import React, {useState} from "react";
import {getDataServer, pingServer} from "../../../../api/serverStatusAPI";
import {Modal} from "../Modal";


export const DataModal = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [err, setErr] = useState(false)
  const handleServer = async () => {
    try {
      const data = await getDataServer();
      setMessage(data.message.field_fifth);
      setErr(false)
    } catch (error) {
      setMessage(String(error));
      setErr(true)
    }
    setOpen(true);
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = 'hidden';
  };
  const handleCloseModal = () => {
    setOpen(false);
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <button onClick={handleServer} disabled={open}>Get DATA</button>
      {open &&<Modal handleCloseModal={handleCloseModal} message={message} err={err} title={"Server ping"}/>}
    </>
  );
};

