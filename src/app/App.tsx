import styles from "./App.module.scss"
import {ContactForm} from "../common/components/forms/ContactForm/ContactForm";
import {ServerModal} from "../common/components/modal/ServerModal/ServerModal";

function App() {
    return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Georgii Gavrysh test</h1>
         <ServerModal/>
      </header>
      <ContactForm/>
    </div>
  );
}

export default App;
