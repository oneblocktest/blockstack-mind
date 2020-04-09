import React, { Component } from 'react';
import { Person} from 'blockstack';
import Mindmap from "./component/mindmap";

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
export const ME_FILENAME = 'mychart.json'


export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        }
  	  },
  	};
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
         <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image"   alt=""/>
         <h1> <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>的思维脑图</h1>
        </div>
       
        <div className="mindmap" id="mindmap">
        <Mindmap userSession={userSession} />
        </div>
        <p className="lead">
      
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>
      </div> : null
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }

 
}