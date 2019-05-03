import React from 'react';
import './Signin.css'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword:''
        }
    }

    onEmailChange = (event)=>{
        this.setState({signInEmail:event.target.value});
    }
    onPasswordChange = (event)=>{
        this.setState({signInPassword:event.target.value});
    }

    onSubmitSignIn = () =>{
        console.log("SIGN IN SUBMIT");
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => {
            if (response.status>= 400 && response.status <=600){
                
                throw "Unable to SignIn";
            }else {
                return response.json()

            }
        })
        .then(user => {
            console.log(user);
            if (user){
                // console.log("NEW USER", user);
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err));
        // // .then(response => response.json)
        // .then(data => {
        //     console.log("AFTER SIGN IN ", data);
        //     if (data.status === 200){
                 
        //          this.props.onRouteChange('home')
        //     }
        //     // this.props.onRouteChange('home')

        // })
        
    }

    render(){
        const {onRouteChange} = this.props;
    return (
    <div className = "slide-in-fwd-center">    
    <div className = "sign_form center pa4 br3 shadow-5 ">
    <main className="pa4 white-80">
            <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange= {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-white w-100 input_label_rounded" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange = {this.onPasswordChange} 
                    className="b pa2 input-reset ba bg-transparent  hover-white w-100 input_label_rounded" 
                    type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input
                    onClick = {this.onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib input_label_rounded" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p
                      onClick = {() =>onRouteChange('register')}
                     className="f6 link dim white db pointer">Register</p>
                </div>
            </div>
        </main>
    </div>
    </div>
    )
    }
}

export default Signin;