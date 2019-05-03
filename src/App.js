import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import ImageRecognition from './components/ImageRecognition/ImageRecognition'
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';


const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}



const initialState = {
  input: '',
  imgUrl : '', 
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name:'' ,
    email:'' ,
    password:'' ,
    entries:'' ,
    joined: '' 
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then((data)=>{
      console.log(data);
    })
  }


  loadUser = (data) =>{
    console.log("LOAD?",data)
    this.setState({user:{
      id: data.id,
      name: data.name ,
      email:data.email ,
      password:data.password ,
      entries:data.entries ,
      joined:'', 
    }});
    console.log("LOGGED USER:", this.state.user);
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
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
          input: this.state.input,
      })
    }).then(response => response.json())
      .then( (response) => {
        console.log(response)
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.state.user.id,
            })
          }).then(response => response.json())
          .then(data => {
            this.setState(Object.assign(this.state.user, {entries:data}));
             console.log(data);
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceBox(response))
      })
      .catch(err => console.log(err))  
  }

  onRouteChange = (route) => {
    console.log("ROUTE", route);
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home') {
      console.log("IsLogged", route);
      this.setState({route:route});
      this.setState({isSignedIn:true});
    }else {
      this.setState({route:route});
    }

    // 
  }

  render() {
    return (
      
      <div className="App">
                <Particles className='particles'
          params={particlesOptions}
        />

        <div className = "container">
           <Logo/>
           <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange} />
        </div>
        { this.state.route === 'home'?
         <div>
            <Rank name={this.state.user.name}
                entries={this.state.user.entries}/>
            <ImageLinkForm 
                onInputChange ={this.onInputChange}
                onButtonSubmit = {this.onButtonSubmit}
            />
            <ImageRecognition
                box = {this.state.box}
                imgUrl = {this.state.imgUrl}
            /> 
         </div>
        :(this.state.route === 'signin'?
            <Signin loadUser={this.loadUser}  onRouteChange= {this.onRouteChange}/>:
            <Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
