import React, { useState, useEffect, useRef } from "react";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import { IUrlOptions } from "../models/rest-api.model";
import { RemoteService } from "../services/remote.service";
import { useHistory } from "react-router-dom";
import { personCircle,man ,logIn} from "ionicons/icons";
import "./Style.css"

const LoginPage: React.FC = ({ history }: any) => {
  const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [erreur, setErreur] = useState('');

    const verifAuthentif = () => {
        var formData = new FormData()
        formData.append('mail', email)
        formData.append('mdp', password)
        var url = 'https://appandreha-ws.herokuapp.com/login/utilisateurs'
        // console.log(email)
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                window.location.href = '/InsertSignilement'
                console.log("toto =",result['token'])
                sessionStorage.setItem("Token",result['token'])
                sessionStorage.setItem("id",result['utilisateur'])
                sessionStorage.setItem("dateinsertion",result['dateinsertion'])
                localStorage.setItem('Token', result['token'])

            })
            .catch((error) => {
              // console.log(error);
                setErreur("Impossible de se connecter,Veuillez réessayer");
            });
    }

    // const verifAuthentif = () => {
    //     var formData = new FormData()
    //     formData.append('email', email)
    //     formData.append('mdp', password)
    //     var url = 'https://wsagency.herokuapp.com/api/user/login'
    //     console.log(email)
    //     fetch(url, {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             window.location.href = '/accueil'
    //             localStorage.setItem('token', result['refToken'])

    //         })
    //         .catch((error) => {
    //             setErreur("Echec Auth ! Veuillez réessayer");
    //         });
    // }
    return (
        <IonPage  >
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="Titre">App-Andreha</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent  >
            <IonCard className="carde">
            
                <IonRow>
                    <IonCol>
                        
                        <IonItem>
                        <IonIcon className="icon"
                            style={{ fontSize: "60px", color: "#0040ff" }}
                            icon={logIn}
                        />
                            <IonLabel style={{fontSize: "25px"}}>Login</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonCardHeader>
                
                </IonCardHeader>
                <IonCardContent>
                <br></br>
                {erreur && <IonText color="danger"><i>{erreur}</i></IonText>}

    

                <IonRow >
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput required
                                type="text"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)} //
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Mot de passe</IonLabel>
                            <IonInput required
                                type="password"
                                value={password}
                                onIonChange={(e) => setPwd(e.detail.value!)} //
                            >
                            </IonInput >
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonButton className="buttonLogin" expand="block" onClick={() => verifAuthentif()}>
                            Login
                        </IonButton>
                    </IonCol>
                </IonRow>

                </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

// export default Details;
export default LoginPage;
