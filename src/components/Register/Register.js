import React from 'react';
import '../Signin/Signin.css';
 
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword:'',
            registerName:''
        }
    }

    onEmailChange = (event)=>{
        
        this.setState({registerEmail:event.target.value});
    }
    onPasswordChange = (event)=>{
        this.setState({registerPassword:event.target.value});
    }
    onNameChange = (event)=>{
        this.setState({registerName:event.target.value});
    }

    onRegisterSubmit = () =>{
        
        fetch('https://serene-reef-87518.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: this.state.registerEmail,
                name:this.state.registerName,
                password: this.state.registerPassword
            })
        }).then(response => response.json())
        .then(user => {
            if (user.id){
                console.log("NEW USER", user);
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        
    }


    render(){
        return (
            <div className = "slide-in-fwd-center">    
            <div className = "sign_form center pa4 br3 shadow-5 ">
            <main className="pa4 white-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                onChange = {this.onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-white w-100 input_label_rounded" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange = {this.onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-white w-100 input_label_rounded" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange = {this.onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent  hover-white w-100 input_label_rounded" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick = {this.onRegisterSubmit}
                            className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib input_label_rounded" type="submit" value="Submit"/>
                        </div>
                    </div>
                </main>
            </div>
            </div>
        )
    }
   
}

export default Register;