import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import {connect} from 'react-redux';
import {fetchInvadersData, postShame} from '../../actions/invaders';
import {store} from '../../index.js';
import '../../style/invader-list-style.css';


const cardStyle = {
  fontSize: '1.1rem'
};


//The Invader List component will iterate over the array of objects (Invaders) it gets from the back end and the props of each object will be fed into this Invader Component.
export class Invader extends Component {
  constructor(props){
    super(props);
    this.shameInvader = this.shameInvader.bind(this);
  }

  shameInvader(e) {
    e.preventDefault()
    var state = store.getState();
    if(state.isLoggedIn){
      console.log('here is the current target id ', e.currentTarget.id)
      this.props.postShame(e.currentTarget.id, state.currentUser)
    }
  }

  componentWillUpdate() {
    if (this.props.invaderList) {
        console.log('here is the state', store.getState());
        console.log('here is the invader list', this.props.invaderList);
    }
  }

  componentDidMount() {
    if(this.props.fetchInvaders) {
      this.props.fetchInvaders('https://parking-hos-backend.herokuapp.com/invaders')
    } else {
      console.log('loading invaders');
    }
  }

  render () {
    if(Array.isArray(this.props.invaderList)) {
    return(
        <div className="row mt-5" className="invaderContainer">
          {
            this.props.invaderList.map((invader) => {
              return ( <div key={invader._id} className="singleInvader">
              <Card className="invaderCard">
                <CardImage className="img-fluid" src={invader.img_url}/>
                  <CardBody>
                    <CardTitle>{invader.lic_plate}</CardTitle>
                    <CardText style={cardStyle}>{invader.lic_state}</CardText>
                    <CardText style={cardStyle}>{invader.make}: {invader.model}</CardText>
                    <Button href="#" onClick={this.shameInvader} id={invader._id}>Shame!</Button>
                    <CardText>{invader.shame}</CardText>
                  </CardBody>
              </Card></div>
            )
          })
          }
          </div>
        );
    } else {
      return (
        <h1>Not working</h1>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    invaderList: state.invaderList,
    shameCount: state.shameCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInvaders : (url) => dispatch(fetchInvadersData(url)),
    postShame : (invaderId, userName) => dispatch(postShame(invaderId, userName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invader);
