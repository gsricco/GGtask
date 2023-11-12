import styles from "./Modal.module.scss";
import close from "../../styles/assets/images/close.png";
import React from "react";
import {ModalPropsType} from "../../types/types";

export const Modal = ({handleCloseModal, message, err, title}:ModalPropsType) =>{
  return(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.modal} id="server">
          <div onClick={handleCloseModal}><img src={close} alt={"close"}/></div>
          <h1>{title}</h1>
          <div className={err ? styles.error : styles.message}>{message}</div>
          <button className={styles.button} onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </>
  )
}