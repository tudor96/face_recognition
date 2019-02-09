import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import ImageRecognition from './components/ImageRecognition/ImageRecognition'
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'

const particlesOptions = {
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
  apiKey: '78097d6ed5804ccd82902320eb1e5dfb'
 });


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl : '', 
      box: {}
    }
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
    console.log(event.target.value);
  }

  calculateFaceBox = (boxBounderies) => {
    const box = boxBounderies.outputs[0].data.regions[0].region_info.bounding_box;
    const image =  document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: box.left_col * width,
      topRow: box.top_row * height,
      rightCol: width - (box.right_col * width),
      bottomRow: height - (box.bottom_row * height)
    }
  }

  displayFaceBox = (boxInfo) => {
    this.setState({box: boxInfo});
    console.log(boxInfo)
  }

  onButtonSubmit = () =>{
    console.log("Pressed Button");
    this.setState({imgUrl:this.state.input});
    
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then( (response) => 
        this.displayFaceBox(this.calculateFaceBox(response)))
      .catch(err => console.log(err))  
  }

  render() {
    return (
      <div className="App">
        {/* <Signin/> */}
        <Particles className='particles'
          params={particlesOptions}
        />
        <div className = "container">
           <Logo/>
           <Navigation></Navigation>
        </div>

        <Rank/>

        {/* reupdate function onInputChange */}
        <ImageLinkForm 
          onInputChange ={this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}
        />
        <ImageRecognition
          box = {this.state.box}
          imgUrl = {this.state.imgUrl}
        />
      </div>
    );
  }
}

export default App;
