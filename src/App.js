import React, { Component } from 'react';

//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

import {UserSession, AppConfig } from 'blockstack';
import Signin from './Signin.js';
import Profile from './Profile.js';

const appConfig = new AppConfig()  //app基本信息
export const userSession = new UserSession({ appConfig: appConfig })  //建立用户的session信息

class App extends Component{


handleSignIn(e) {                //登录改变userSession属性
    e.preventDefault();
    userSession.redirectToSignIn();
  }
  handleSignOut(e) {          //退出
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }



  render() {
    return (
        <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !userSession.isUserSignedIn() ?
            <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
            : <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
          }
        </div>
      </div>
    );

  }
  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}




export default App;