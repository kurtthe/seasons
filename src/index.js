import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './loader';

class App extends React.Component{

  state = {lati:null, long:null, errorMessage:''};

  componentDidMount () {

  window.navigator.geolocation.getCurrentPosition((position)=>console.log(position), (err)=>console.log(err));

  window.navigator.geolocation.getCurrentPosition(
    position =>{
      this.setState({lati:position.coords.latitude, long:position.coords.longitude});
    }, 
    
    err => {
      this.setState({errorMessage:err.message})
    }
  );
}

    



render() {
  if (this.state.errorMessage && !this.state.lati) {
    return <div>Error: {this.state.errorMessage}</div>;
  }

  if (!this.state.errorMessage && this.state.lati) {
    return <div>
      <SeasonDisplay lati={this.state.lati}/>
    <p>Latitude; {this.state.lati} </p>
    <p>Longitude;{this.state.long}</p>
  </div>;
  }

  return <Spinner message='Please accept location request'/>
}
}

ReactDOM.render(<App />, document.querySelector('#root'));