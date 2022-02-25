import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonSplitPane,
    IonPage,
    IonTitle
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, home, send } from 'ionicons/icons';

import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import InscriptionPage from './pages/Inscription';
import InsertSignilement from './pages/InsertSignilement';

import './vendor';

import Inscription from './pages/Inscription'
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { MainMenu } from './components/MainMenu';
import LeaveDetails from './components/LeaveDetails';
import ApplyLeaveForm from './components/ApplyLeaveForm';
import * as Users from './assets/data/leaves.json';

const App: React.FC = (props) => {
    const { data }: any = Users;

    const login =()=>{
        return(
            <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="MyLogin">
                    <IonPage id="MyLogin">
                        <IonTabs>
                            <IonRouterOutlet>
                              
                                <Route path="/login" component={LoginPage} exact={true} />
                                <Route exact path="/" render={() => <Redirect to="/login" />} />
                            </IonRouterOutlet>

                            <IonTabBar slot="bottom">
                            </IonTabBar>
                        </IonTabs>

                    </IonPage>

                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
        )
    }

    useEffect(() => {
        console.log('Users :', data)
    }, []);
    

    if(!sessionStorage.getItem("Token")){
        return(
            <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="MyLogin">
                    <IonPage id="MyLogin">
                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path="/Inscription" component={Inscription} />
                                <Route path="/login" component={LoginPage} exact={true} />
                                <Route path="/home"component={LoginPage} exact={true}  />
                                <Route path="/tab2" component={LoginPage} exact={true} />
                                <Route path="/details/:leaveType/apply" component={LoginPage} />
                                <Route path="/InsertSignilement" component={LoginPage} exact={true} />
                                <Route path="/details/:leaveType" component={LoginPage} />
                                <Route exact path="/" render={() => <Redirect to="/login" />} />
                            </IonRouterOutlet>

                            <IonTabBar slot="bottom">
                                <IonTabButton tab="InscriptionPage" href="/Inscription">
                                    <IonIcon icon={apps} />
                                    <IonLabel>Inscription</IonLabel>
                                </IonTabButton>
                            </IonTabBar>
                        </IonTabs>

                    </IonPage>

                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
        )
    }


    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="myMenuOutlet">
                    <MainMenu disabled={false} />

                    <IonPage id="myMenuOutlet">
                           
                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path="/" render={(props) => <HomePage users={data} {...props} />} exact={true} />
                                <Route path="/login" component={LoginPage} exact={true} />
                                <Route path="/home" render={(props) => <HomePage users={data} {...props} />} exact={true} />
                                <Route path="/tab2" component={Tab2} exact={true} />
                                <Route path="/details/:leaveType/apply" component={ApplyLeaveForm} />
                                <Route path="/details/:leaveType" component={LeaveDetails} />
                                <Route path="/InsertSignilement" component={InsertSignilement} exact={true} />
                                {/* <Route path="/Inscription" component={Inscription} /> */}
                                {/* <Route path="/tab2/details" component={Details} /> */}
                                <Route path="/tab3" component={Tab3} />
                                <Route exact path="/" render={() => <Redirect to="/InsertSignilement" />} />
                            </IonRouterOutlet>

                            <IonTabBar slot="bottom">
                                {/* <IonTabButton tab="tab1" href="/home">
                                    <IonIcon icon={home} />
                                    <IonLabel>Home</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="tab2" href="/Inscription">
                                    <IonIcon icon={apps} />
                                    <IonLabel>Inscription</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="tab3" href="/tab3">
                                    <IonIcon icon={send} />
                                    <IonLabel>Tab Three</IonLabel>
                                </IonTabButton> */}
                            </IonTabBar>
                        </IonTabs>

                    </IonPage>

                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    )

};

export default App;
