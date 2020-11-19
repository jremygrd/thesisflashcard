import React,{ useState } from 'react';
import styles from '../styles/Home.module.css'
import { auth, signInWithGoogle } from "./services/firebase";

export default function Mylog(){
  
  const [afficherlogin, setafficherlogin] = useState(true);

  const [newUser,setUSer] = useState<{displayName:string,email:string,password:string}>({displayName:"",email:"",password:""});

  const {displayName,email,password}=newUser;

  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<EventTarget>) => {
    console.log("test");
    e.preventDefault();
    const { email, password } = user;
    await auth.signInWithEmailAndPassword(email, password);
    console.log(email,user);
    setUser({
      email: "",
      password: "",
    });
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log("connecté",email,user.uid);
        } else {
            console.log("not connected");
        }
      });
    
  };

  const onChange2 =(e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUSer({ ...newUser,[name]:value });
  };

  const onSubmit2 = async (e:React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const {user} =  await auth.createUserWithEmailAndPassword(newUser?.email,newUser.password);
    
  };

    return (

    <div className={styles.bodylogin} >
  <div className={styles.containerlogin} >
    <div className={styles.logologin}>
      <i className="fab fa-wolf-pack-battalion"></i>
    </div>

    {afficherlogin?<div className={styles.tabbody} data-id="connexion">
      <form id="connection" onSubmit={onSubmit}>
        <div className={styles.rowlogin}>
          <i className="far fa-envelope"></i>
          <input autoComplete="on" name="email" onChange={onChange} type="email" className={styles.input} placeholder="Adresse Mail"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input autoComplete="on" name="password" onChange={onChange} placeholder="Mot de Passe" type="password" className={styles.input}/>
        </div>
        <a href="#" className="link">Mot de passe oublié ?</a>
        <button className={styles.btnlogin} type="submit">Connexion</button>
      </form>
    </div>
:
    <div className={styles.tabbody} data-id="inscription">
      <form id="inscription" onSubmit={onSubmit2}>
        <div className={styles.rowlogin}>
          <i className="far fa-user"></i>
          <input autoComplete="on" onChange={onChange2} type="text" className={styles.input} placeholder="First Name" id="firstName"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="far fa-user"></i>
          <input autoComplete="on" onChange={onChange2} type="text" className={styles.input} placeholder="Last Name" id="lastName"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="far fa-envelope"></i>
          <input autoComplete="on" name="email" onChange={onChange2} type="email" className={styles.input} placeholder="Adresse Mail" id="emailDeCreation"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input autoComplete="on" name="password" onChange={onChange2} type="password" className={styles.input} placeholder="Mot de Passe" id="mdp"/>
        </div>
        <div className={styles.rowlogin}>
          <i className="fas fa-lock"></i>
          <input autoComplete="on" name="password2" onChange={onChange2} type="password" className={styles.input} placeholder="Confirmer Mot de Passe" id="comfirmationmdp"/>
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
    )
}