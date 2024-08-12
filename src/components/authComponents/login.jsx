import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { validationAuth } from '../../functions/functionValidation'
import { PasswordShowAndHide } from '../../functions/showAndHidePassword'
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Alert, Link, Typography, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './auth.css'
import { logInUser } from '../../service/auth/actionAuth'
import { makeStateIsEmpity, makeStateIsEmpityAuth } from '../../service/auth/authSlice';
import AuthGoogle from './AuthGoogle';
export default function Login() {
    // 1. State and Utility Variables:
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserLogIn, setFormUserLogIn] = useState({
        email: '',
        password: ''
    }); // LogIn form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingLogIn,
        errorLogIn,
        errorLogInNetWork,
        errorLogInPassword,
        errorLogInEmail,
    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserLogIn({ ...formUserLogIn, [e.target.name]: e.target.value });
        setErrorList([])
        dispatch(makeStateIsEmpityAuth())
    }
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleLogIn = async (e) => {
        e.preventDefault();
        var valid = validationAuth(formUserLogIn) // validation Joi
        if (valid.error)  // if error found
        {
            console.log(valid);
            setErrorList(valid.error.details)
            return
        }

        const response = await dispatch(logInUser(formUserLogIn));

        if (response.payload?.message === 'logged in successfully') {

            setErrorList([])

            navigate('/home');

        }
    }

 
    return (
        <div className=' row mt-5 pt-5 g-2 justify-content-center align-items-center'>
            <div className=' col-md-6  form rounded-5  text-center shadow-lg pb-2'>
                <div className=' itemAuth  '>

                    <form onSubmit={handleLogIn} className=" py-2  ">

                        {/* Email field */}
                        <div className='' >
                            <TextField
                                label="Email" variant="standard"
                                sx={{ width: "90%", borderRadius: "10px" }}
                                required
                                name="email"
                                value={formUserLogIn.email}
                                onChange={handleInputChange}
                                error={errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                                helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error message
                            />
                            {/* Error handling api for specific Joi validation error errorEmail */}

                            {errorLogInEmail && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInEmail}</Alert>} {/* error joi api */}

                        </div>

                        {/* Password field */}
                        <div>
                            <TextField


                                label="Password"
                                variant="standard"

                                margin="normal"
                                sx={{ width: "90%" }}
                                required
                                name="password"
                                value={formUserLogIn.password}
                                onChange={handleInputChange}
                                type={showPassword ? 'text' : 'password'}
                                error={!!errorList.find((elm) => elm.path[0] === 'password')} // Set error helperText if password error exists
                                helperText={errorList.find((elm) => elm.path[0] === 'password')?.message} // Display password error message
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={toggle}

                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            {/* Error handling api for specific Joi validation error errorPassword */}

                            {errorLogInPassword && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorLogInPassword}</Alert>} {/* error joi api */}

                        </div>

                        {/* Submit button */}
                        <div>
                            <Button variant="contained" type="submit" color="primary" sx={{ mt: 2, width: '80%' }} disabled={loadingLogIn}>
                                {loadingLogIn ? <CircularProgress /> : 'Login'}
                            </Button>
                        </div>
                        <AuthGoogle/>
                        {/* Display error message if provided */}
                        {errorLogIn && <Alert sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }} severity="error">{errorLogIn}</Alert>}
                        {errorLogInNetWork && <Alert severity="error" sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}>{errorLogInNetWork}</Alert>}

                    </form>
                    {/* Forget password */}
                    <NavLink to="/checkemail"  >
                        Forgotten password?
                    </NavLink>
                    <div>
                        <NavLink to='/register' className='btn btn-success w-75'>Create Email</NavLink>
                    </div>
                </div>


            </div>
            <div className=' col-sm-6 text-center '>
                <h3 className=' text-primary'>E-Commerce</h3>
                <Typography variant='h5' color={'white'}>Shop now & get inspired , <br /> Elevate your everyday style , <br /> Start exploring our collections. <br />  Upgrade your space (or wardrobe)</Typography>
                {/* <h5>Shop now & get inspired , <br /> Elevate your everyday style , <br /> Start exploring our collections. <br />  Upgrade your space (or wardrobe)</h5> */}
                <Typography variant='p' color={'white'}>Find what makes you shine.
                    Discover your next obsession.
                    Shop curated collections. <br />
                    Quality essentials delivered.</Typography>

            </div>


        </div>


        // <div className="auth">

        //     {/*  out put if error from api  */}
        //     {messageErrorLogin && <p className='error'>{messageErrorLogin}</p>}

        //     {error ? <div className='alert alert-danger '> {error}</div> : ""}
        //     {/* form */}
        //     <form onSubmit={handlesubmint} className='border border-secondary shadow-lg'>
        //         {/*  button email  */}
        //         <label htmlFor="email" className='fw-bold fs-6'>Email Address</label>
        //         <input
        //             type="email"
        //             id="email"
        //             name='email'
        //             onChange={handleInputChange}
        //             value={formUserLogin.name}
        //             required
        //         />
        //         {/* if error from joi */}
        //         {errorList.map((elm, i) => { if (elm.path[0] == 'email') return <p key={i}>{elm.message}</p> })}
        //         {/*  button password  */}
        //         <label htmlFor="password" className='fw-bold fs-6'>Password</label>
        //         <input
        //             className=''
        //             type={showPassword ? "text" : "password"}
        //             id="password"
        //             value={formUserLogin.password}
        //             name='password'
        //             onChange={handleInputChange}
        //             required
        //         />
        //         <p className='showPassword   text-end ' onClick={toggle}>{
        //             showPassword ?
        //                 <>
        //                     <span>
        //                         hide password
        //                         <i className="fa-solid fa-lock-open ms-2"> <span></span></i>
        //                     </span>

        //                 </>
        //                 :
        //                 <>
        //                     <span>
        //                         show password
        //                         <i className="fa-solid fa-lock ms-2"> </i>
        //                     </span>

        //                 </>

        //         }

        //         </p>
        //         {/* if error from joi */}
        //         {errorList.map((elm, i) => { if (elm.path[0] == 'password') return <p> password must be more 6 and less 16</p> })}
        //         <NavLink to='/checkemail'>Forgot password?</NavLink>
        //         <button type="submit" className='mt-2'>
        //             {loading ? <i className='spinner-border text-light'></i> : "Login"}
        //         </button>
        //         <p className='text-center'>   I Do not  have Email <NavLink to='/register' className='text-black fw-bolder fs-6'>REGISTER</NavLink></p>
        //     </form>

        // </div>
    )
}
