import React, { useState } from 'react'
import { useEffect } from 'react';
import Register from './Register';
import Login from './login';

export default function Auth() {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        console.log('hello');

        setIsActive(false);
    };

    const handleLoginClick = () => {
        setIsActive(true);


    };

    return (
        <div className={isActive ? 'active containers m-5' : ' containers m-5'} id="containers" >
            <div className=' row'>

                <div className=' col-sm-6'>


                    <div className="form-containers sign-up">
                        {/* <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icons"><i className='bx bxl-google'></i></a>
                        <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
                        <a href="#" className="icons"><i className='bx bxl-github'></i></a>
                        <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
                    </div>
                    <span>Register with E-mail</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Enter E-mail" />
                    <input type="password" placeholder="Enter Password" />
                    <button >Sign Up</button>
                </form> */}
                        <Register />
                    </div>


                    <div className="form-containers sign-in">
                        {/* <form>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icons"><i className='bx bxl-google'></i></a>
                        <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
                        <a href="#" className="icons"><i className='bx bxl-github'></i></a>
                        <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
                    </div>
                    <span>Login With Email & Password</span>
                    <input type="email" placeholder="Enter E-mail" />
                    <input type="password" placeholder="Enter Password" />
                    <a href="#">Forget Password?</a>
                    <button >Sign In</button>
                </form> */}
                        <Login />
                    </div>

                </div>
                <div className=' col-sm-6'>



                    <div className="toggle-containers">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome To <br />Code with Patel</h1>
                                <p>Sign in With ID & Passowrd</p>
                                <button className="hidden" id="login" onClick={handleRegisterClick}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hii Coder's</h1>
                                <p>Join "Code With Patel" to Improve Your Coding Skills</p>
                                <button className="hidden" id="register" onClick={handleLoginClick}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )
}
