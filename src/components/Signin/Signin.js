import React from 'react';
import './Signin.css'

const Signin = () => {
    return (
    <div className = "slide-in-fwd-center">    
    <div className = "sign_form center pa4 br3 shadow-5 ">
    <main className="pa4 white-80">
            <form className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-white w-100 input_label_rounded" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent  hover-white w-100 input_label_rounded" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib input_label_rounded" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <a href="#0" className="f6 link dim white db">Sign up</a>
                </div>
            </form>
        </main>
    </div>
    </div>
    )
}

export default Signin;