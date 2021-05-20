import './App.css';
import tachyons from 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImagelinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import React from 'react';
import Rank from './components/Rank/Rank';
 import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesEffect = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
  }
}
}

const app = new Clarifai.App({
  apiKey: 'e4fd3b8db88443adb5f58e6cd3234e4a'
 });




class App extends React.Component {
  constructor(){
    super();
    this.state={
      input: "",
      imageUrl : "",
      box : {}
    }
  }
onInputChange = (event) =>{
  console.log( event.target.value);
  this.setState({input : event.target.value});
}

// only for face recognition 
claculateFaceloacation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  // console.log(clarifaiFace);
  const image =document.getElementById("inputImage");
  const width = Number(image.width);
  const height = Number(image.height);
  // console.log(width,height);
  let mainData = {
    leftCol : clarifaiFace.left_col*width,
    topRow : clarifaiFace.top_row*height,
    rightCol : width- (clarifaiFace.right_col *width),
    bottomRow : height - (clarifaiFace.bottom_row * height)
  }
  return mainData
}

displayfacebox= (box) => {
  this.setState({box : box })
}

onSubmit = () => {
  this.setState({imageUrl : this.state.input});
console.log("raghu");
app.models
  .predict(
    // 'MoDEL_ID','IMAGE_URL'
    'a403429f2ddf4b49b307e318f00e528b', this.state.input
  ).then(response => {
    this.displayfacebox(this.claculateFaceloacation(response));
  })
  .catch(err => console.log(err));
}


  render(){
    return (
      <div className="App">
        <Particles params={particlesEffect} className="particles" />
         <Navigation/>
          <Logo />
          <Rank/>
          <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  }

}

export default App;
