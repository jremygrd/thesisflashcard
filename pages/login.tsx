import React,{ useState } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { firebaseClient } from './services/firebaseClient';
import next, { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from './services/firebaseAdmin';

const createUser=async (firstName:any,email:any) => {
  var user2 = firebaseClient.auth().currentUser;
  var myuser = {myid: user2?.uid, name: firstName.firstName, email: email.email}
  const user = await fetch(
  `http://localhost:3000/api/users/create`,
  {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(myuser),
  })
}

export default (_props: any) => {
  
  const [afficherlogin, setafficherlogin] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  

    return (

    <div className={styles.bodylogin} >
  <div className={styles.containerlogin} >
    <div className={styles.logologin}>
      <i className="fab fa-wolf-pack-battalion"></i>
    </div>

    {afficherlogin?<div className={styles.tabbody} data-id="connexion">
        <div className={styles.rowlogin}>
          <i className="far fa-envelope"></i>
          <input 
            autoComplete="on"  
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className={styles.input} 
            placeholder="Adresse Mail"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input
            autoComplete="on" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            placeholder="Mot de Passe" 
            type="password" 
            className={styles.input}/>
        </div>
        <a href="#" className="link">Mot de passe oublié ?</a>
        <button 
          className={styles.btnlogin} 
          onClick={async () => {
            await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
            window.location.href = '/';
            }}>
          Connexion
        </button>
    </div>
:
    <div className={styles.tabbody} data-id="inscription">
      <div className={styles.rowlogin}>
        <i className="far fa-user"></i>
        <input 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="on" 
          type="text" 
          className={styles.input} 
          placeholder="First Name" id="firstName"/>
      </div>
      <div className={styles.rowlogin}>
        <i className="far fa-user"></i>
        <input 
          value={lastName} 
          autoComplete="on" 
          onChange={(e) => setLastName(e.target.value)}
          type="text" 
          className={styles.input} 
          placeholder="Last Name" 
          id="lastName"/>
      </div>
      <div className={styles.rowlogin}>
        <i className="far fa-envelope"></i>
        {/* input email inscription */}
        <input 
          autoComplete="on"  
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          className={styles.input} 
          placeholder="Adresse Mail"/>
      </div>
      <div className={styles.rowlogin}>
        <i className="fas fa-lock"></i>
        {/* input password inscription */}
        <input 
          autoComplete="on" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)}
          type="password" 
          className={styles.input} 
          placeholder="Mot de Passe"/>
      </div>
      <div className={styles.rowlogin}>
        <i className="fas fa-lock"></i>
        {/* input confirm password inscription */}
        <input 
          autoComplete="on" 
          name="password2" 
          type="password" 
          className={styles.input} 
          placeholder="Confirmer Mot de Passe" 
          id="comfirmationmdp"/>
      </div>
      <input 
      onClick={async () => {
        
        await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(email, pass);
        createUser({firstName},{email});
        window.location.href = '/';

      }} 
      className={styles.btnlogin} 
      value="Inscription"/>  
    </div>}

    <div className={styles.tabfooter}>
      <a className={styles.tablinkConnexion}  onClick={()=>setafficherlogin(true)}>Connexion</a>
      <a className={styles.tablinkInscription}  onClick={()=>setafficherlogin(false)}>Inscription</a>
    </div>
  </div>
</div>
    )
}