import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function (){
  
  const [afficherlogin, setafficherlogin] = useState(true);

    return (
        <div>
            <head>
                <title>Mon site - Connexion</title>
  
            </head>



    <div className={styles.bodylogin} >
  <div className={styles.containerlogin} >
    <div className={styles.logologin}>
      <i className="fab fa-wolf-pack-battalion"></i>
    </div>

    {afficherlogin?<div className={styles.tabbody} data-id="connexion">
      <form id="connection">
        <div className={styles.rowlogin}>
          <i className="far fa-envelope"></i>
          <input type="email" className={styles.input} placeholder="Adresse Mail"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input placeholder="Mot de Passe" type="password" className={styles.input}/>
        </div>
        <a href="#" className="link">Mot de passe oublié ?</a>
        <button className={styles.btnlogin} type="button">Connexion</button>
      </form>
    </div>
:
    <div className={styles.tabbody} data-id="inscription">
      <form id="inscription">
        <div className={styles.rowlogin}>
          <i className="far fa-user"></i>
          <input type="text" className={styles.input} placeholder="First Name" id="firstName"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="far fa-user"></i>
          <input type="text" className={styles.input} placeholder="Last Name" id="lastName"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="far fa-envelope"></i>
          <input type="email" className={styles.input} placeholder="Adresse Mail" id="emailDeCreation"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input type="password" className={styles.input} placeholder="Mot de Passe" id="mdp"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input type="password" className={styles.input} placeholder="Confirmer Mot de Passe" id="comfirmationmdp"/>
        </div>
        <input type="submit" className={styles.btnlogin} value="Inscription"/>
      </form>    
    </div>}

    <div className={styles.tabfooter}>
      <a className={styles.tablink} data-ref="connexion" onClick={()=>setafficherlogin(true)}>Connexion</a>
      <a className={styles.tablink} data-ref="inscription" onClick={()=>setafficherlogin(false)}>Inscription</a>
    </div>
  </div>
</div>
    
    
    
            
        </div>
    )
}