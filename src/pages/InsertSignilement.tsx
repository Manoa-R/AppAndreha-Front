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
  IonMenuButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { IUrlOptions } from "../models/rest-api.model";
import { RemoteService } from "../services/remote.service";
import { type } from "os";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { setupMaster } from "cluster";
import axios  from 'axios';
import { Geolocation } from '@capacitor/geolocation';
import {usePhotoGallery, UserPhoto} from '../hooks/usePhotoGallery';
import {camera, trash, close} from 'ionicons/icons'
import { Session } from "inspector";


// console.log('Current', coordinates);
const InsertSignilement: React.FC = ({ history }: any) => {
  const remoteService = new RemoteService();
  const [error, setError] = useState({ error: false });
  const loginForm = useRef<HTMLFormElement>(null);
  const [lType,setLType] = useState([]);
  const [lon,setLon]=useState(Number);
  const [lat,setLat]=useState(Number);
  const geolocation  = Geolocation;
  const { photos, takePhoto } = usePhotoGallery();
  const { deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [tabProblem, setTabProblem] = useState([]);
  let id="";


  
  const [region,setRegion]= useState("null");
  const [utilisateur,setUtilisateur] = useState(sessionStorage.getItem("id"));
  const [tokenn,settoken] = useState(sessionStorage.getItem("Token"));
  const [objet,setObjet] = useState("");
  const current = new Date();
  const [datesignalement,setDateSignalement] = useState("2022-02-25");
  const [type,setTypee] = useState("PRO1");
  const [protocole,setProtocole] = useState("PRO1");
  const [description,setDescription] = useState("");
  const [longitude,setLongitude] = useState(lon);
  const [latitude,setLatitude] = useState(lat);
  
  

  // console.log(sessionStorage.getItem("id"));
  const sendGetRequest = async () => {
    return axios({
      url: 'https://appandreha-ws.herokuapp.com/types',
      method: 'GET'
    }).then(Response =>{
      return Response.data;
    }).catch((error) => {
      console.log('Error get type', error)
    })
  };
  useEffect(() => {
    sendGetRequest().then(data => setLType(data));
    
  })

  const getLocation = () => {
    geolocation.getCurrentPosition().then((Resp) => {
      setLon(Resp.coords.longitude);
      setLat(Resp.coords.latitude);
      console.log(`${Resp.coords.latitude},${Resp.coords.longitude}`);
    }).catch((error) => {
      console.log('No connection default location',error)
      setLon(-18.9860485);
      setLat(47.5324514);
      setLongitude(-18.9860485);
      setLatitude(47.5324514);
    });
    console.log(`${lat},${lon}`);
  }


  const Valider = async() => {
    getLocation();
    setLatitude(lat);
    setLongitude(lon);
    // id ="SIG" +207; //(Math.floor(Math.random() * (5000 - 101 + 1)) + 101).toString();
    id =(Math.floor(Math.random() * (5000 - 101 + 1)) + 101).toString();

    console.log(id+"-"+
      type+"-"+
      region+"-"+
      utilisateur+"-"+
      objet+"-"+
      datesignalement+"-"+
      protocole+"-"+
      description+"-"+
      longitude+"-"+
      latitude);
      axios
      .post("https://appandreha-ws.herokuapp.com/signalements/objet/"+tokenn, {
        id,
        type,
        region,
        utilisateur,
        objet,
        datesignalement,
        protocole,
        description,
        longitude,
        latitude
      })
      .then((res) => {
        // console.log("UT"+(Math.floor(Math.random()*(11 -0 +1))+10).toString())
        // setSuccess("inscription terminée");
        //window.location.href = "/login";
      })
      .catch((error) => console.log(error));
      var cp=[];
      for(var i=0;i<photos.length;i++){
        var b=await (await fetch(photos[i].webviewPath!)).blob();
        cp.push(b);
      }
      var formData = new FormData()
      for(var i=0;i<cp.length;i++){
        formData.append('image', cp[i], "photo.jpeg");
      }
      formData.append('signalement', id);
      formData.append('token', ""+tokenn);
      var url = "https://appandreha-ws.herokuapp.com/upload/image"
        fetch(url, {
          method: 'POST',
          body: formData,
      });

  }
  const envoyer =async () => {
  //   var cp=[];
  //   for(var i=0;i<photos.length;i++){
  //     var b=await (await fetch(photos[i].webviewPath!)).blob();
  //     cp.push(b);
  //   }
  //   var formData = new FormData()
  //   for(var i=0;i<cp.length;i++){
  //   formData.append('files',cp[i],"photo.jpeg");
  //  }
  //   formData.append('problem', prob)
  //   formData.append('description', descri)
  //   formData.append('coordonneX', "" + lat)
  //   formData.append('coordonneY', "" + long)

  //   var url = "http://localhost:6565/api/ajout/signalement/photos/"+localStorage.getItem('token')
  //   fetch(url, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setMessage("Envoye du signalement réussie");
  //     })
  //     .catch((error) => {
  //       setErreur("Echec de l'envoye");
  //     });
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start"></IonMenuButton>
          <IonTitle>Nouveau signilement</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        
          <IonItem>
            <IonLabel position="floating">Object</IonLabel>
            <IonInput
              placeholder=""
              type="text"
              name="Object"
              id="Object"
              onIonChange={(e) => setObjet(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonGrid>
            <IonRow>
              {photos.map((photo,index) => (
                <IonCol size="6" key={index}>
                  <IonImg   onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                </IonCol>
              ))}
              
            </IonRow>
          </IonGrid>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />

          <IonItem>
            <IonLabel position="floating">Type</IonLabel>

            <IonSelect 
              placeholder="Choisissez le type d'incidents" 
              name="type" 
              id="type"  
              onIonChange={(e) => setTypee(e.detail.value!)}
            >
              {
                lType.map((el, index) => {
                  return (<IonSelectOption value={el['id']} key={index} >{el['nom']}</IonSelectOption>);
                })
              }
            </IonSelect>

          </IonItem>
         
          <IonItem>
            <IonLabel position="floating">description</IonLabel>
            <IonTextarea
              name="description"
              id="description"
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          
          <div className="button-wrapper">
          <IonButton expand="block" 
            onClick={() => Valider()}
          >
            Valider
          </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};

// export default Details;
export default InsertSignilement;
