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
  IonText,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
} from "@ionic/react";
import { IUrlOptions } from "../models/rest-api.model";
import { RemoteService } from "../services/remote.service";
import axios from "axios";
import { Console } from "console";
import "./Style.css";
const InscriptionPage: React.FC = ({ history }: any) => {
  // const remoteService = new RemoteService();
  // const [error, setError] = useState({ error: false });
  // const loginForm = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   let token = sessionStorage.getItem("userToken");
  //   console.log("loginForm :", loginForm);
  //   if (loginForm && loginForm.current) {
  //     loginForm.current.reset();
  //   }
  //   if (token) {
  //     history.push("/home");
  //   } else {
  //     history.push("/login");
  //   }
  // }, []);

  const [nom, setNom] = useState("");
  // const [id, setId] = useState("");
  let id  ="";
  const [prenom, setPrenom] = useState("");
  const [datenaissance, setdatenaissance] = useState("");
  const [mail, setmail] = useState("");
  const [avatar, setavatar] = useState("");
  const [mdp, setmdp] = useState("");
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  function getRand(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // setId("UT" + (Math.floor(Math.random() * (5000 - 1 + 1)) + 1).toString());
  // setId("UT" + getRand(500,1).toString());
  // setavatar("king");
  const Ajouter = () => {
    id ="UT" + (Math.floor(Math.random() * (5000 - 1 + 1)) + 1).toString();
    console.log(id);
    axios
      .post("https://appandreha-ws.herokuapp.com/utilisateurs/user", {
        id,
        nom,
        prenom,
        datenaissance,
        mail,
        mdp,
        avatar,
      })
      .then((res) => {
        // console.log("UT"+(Math.floor(Math.random()*(11 -0 +1))+10).toString())
        setSuccess("inscription terminée");
        //window.location.href = "/login";
      })
      .catch((error) => console.log(error));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle className="Titre">App-Andreha</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="carde">
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Nom</IonLabel>
              <IonInput
                required
                type="text"
                value={nom}
                onIonChange={(e) => setNom(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Prenom</IonLabel>
              <IonInput
                required
                type="text"
                value={prenom}
                onIonChange={(e) => setPrenom(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Date de naissance</IonLabel>
              <IonInput
                required
                type="date"
                value={datenaissance}
                onIonChange={(e) => setdatenaissance(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">E-mail</IonLabel>
              <IonInput
                required
                type="email"
                value={mail}
                onIonChange={(e) => setmail(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">mot de passe</IonLabel>
              <IonInput
                required
                type="password"
                value={mdp}
                onIonChange={(e) => setmdp(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {/* <IonItem>
          <IonLabel position="floating">mot de passe</IonLabel>
          <IonInput type="mdp" name="mdp" id="mdp"></IonInput>
        </IonItem> */}
            <div className="button-wrapper">
              <IonButton expand="block" onClick={() =>
                Ajouter()
              }>
                valider
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
        {success && (
        <div className="Success">
          
            <IonText >
              <i>{success}</i>
            </IonText>
          
        </div>
        )}
      </IonContent>
    </IonPage>
  );
};

// export default Details;
export default InscriptionPage;
