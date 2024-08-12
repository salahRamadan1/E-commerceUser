import React, { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';

import { validationAuth } from '../../functions/functionValidation';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../service/auth/actionAuth';
import './auth.css'
import { Alert, Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { PasswordShowAndHide } from '../../functions/showAndHidePassword';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';

export default function Register() {

    // 1. State and Utility Variables:
    const [success, setSuccess] = React.useState(false); // Register success flag
    const [passwordsMatch, setPasswordsMatch] = useState(false); // Password match flag
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserRegister, setFormUserRegister] = useState({
        name: "",
        email: '',
        password: '',
        phone: ''
    }); // Register form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingRegister,
        errorRegister,
        errorRegisterNetWork,
        errorPassword,
        errorName,
        errorEmail,
        errorphone
    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserRegister({ ...formUserRegister, [e.target.name]: e.target.value });
        setErrorList([])
        dispatch(makeStateIsEmpityAuth())
    }
    function handleInputConfirmPassword(e) {
        setConfirmPassword(e.target.value)
        setErrorList([])
        dispatch(makeStateIsEmpityAuth())
        setPasswordsMatch(false)
    }
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleRegister = async (e) => {
        e.preventDefault();
        var valid = validationAuth(formUserRegister) // validation Joi
        console.log(valid);
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        else if (formUserRegister.password !== confirmPassword) // check password confirm
        {
            setPasswordsMatch(true);
            return
        }

        const response = await dispatch(registerUser(formUserRegister));
        if (response.payload?.message === 'Registration successful') {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/digit');
            }, 1000);



        }
    }
    // 5. Cleanup Function (Optional):
    React.useEffect(() => {
        // show('auth') // to show div

        return () => dispatch(makeStateIsEmpityAuth()); // Cleanup function (if needed)
    }, []);
    // // function to navigate 
    // let navigat = useNavigate()

    // //  form data user

    // // error list with Joi

    // // handle inputs
    // function handleInputChange(e) {
    //     setFormUserRegister({ ...formUserRegister, [e.target.name]: e.target.value })
    // }
    // // redux use selector
    // const { error, loading, messageErrorRegister } = useSelector((state) => state.auth)
    // //    redux dispatch

    // // function to handle submint
    // async function handlesubmint(e) {
    //     e.preventDefault();
    //     //   if error with Joi
    //     var valid = validationAuth(formUserRegister)
    //     if (valid.error) {
    //         setErrorList(valid.error.details)
    //     } else {
    //         // redux register 
    //         const { payload } = await dispatch(registerUser(formUserRegister))

    //         if (payload && payload.message == 'success') {
    //             navigat('/confirmemail')
    //         }
    //     }

    // }

    return (
        <div  >
            <div className="  row form mt-5 pt-5 g-2 justify-content-center align-items-center ">



                {/* form */}
                <form onSubmit={handleRegister} className='col-md-6  form rounded-5  text-center shadow-lg pb-2 py-3'>
                    {errorRegisterNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorRegisterNetWork}</Alert>} {/* error joi api */}
                    {errorRegister && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorRegister}</Alert>} {/* error joi api */}
                    {success && <Alert severity='success'>success</Alert>}

                    {/*  input name  */}
                    <div>

                        <TextField
                            label="name" variant="standard"
                            sx={{ width: "90%", borderRadius: "10px", paddingBottom: "10px" }}

                            required
                            name="name"
                            value={formUserRegister.name}
                            onChange={handleInputChange}
                            error={errorList.find((elm) => elm.path[0] === 'name')} // Set error helperText if name error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'name')?.message} // Display name error message


                        />
                        {/* Error handling api for specific Joi validation error errorName */}
                        {errorName && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorName}</Alert>} {/* error joi api */}
                    </div>
                    {/* Email field */}
                    <div className='' >
                        <TextField
                            label="Email" variant="standard"
                            sx={{ width: "90%", borderRadius: "10px", paddingBottom: "10px", color: "transparent" }}
                            required
                            name="email"
                            value={formUserRegister.email}
                            onChange={handleInputChange}
                            error={errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error message
                        />
                        {/* Error handling api for specific Joi validation error errorEmail */}

                        {errorEmail && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorEmail}</Alert>} {/* error joi api */}
                    </div>
                    {/*   phone field */}
                    <div className='' >
                        <TextField
                            label="phone" variant="standard"
                            sx={{ width: "90%", borderRadius: "10px", paddingBottom: "10px" }}
                            required
                            name="phone"
                            value={formUserRegister.phone}
                            onChange={handleInputChange}
                            error={errorList.find((elm) => elm.path[0] === 'phone')} // Set error helperText if phone error exists
                            helperText={errorList.find((elm) => elm.path[0] === 'phone')?.message} // Display phone error message
                        />
                        {errorphone && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorphone}</Alert>} {/* error joi api */}

                    </div>

                    {/* Password field */}
                    <div>
                        <TextField
                            label="Password"
                            variant="standard"
                            margin="normal"
                            sx={{ width: "90%", paddingBottom: "10px" }}
                            required
                            name="password"
                            value={formUserRegister.password}
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

                        {errorPassword && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorPassword}</Alert>} {/* error joi api */}
                        {/* repet Password field */}

                        <TextField
                            id="standard-basic" label="repet password" variant="standard"
                            type={showPassword ? "text" : "password"}
                            required
                            error={passwordsMatch}
                            helperText={passwordsMatch && 'Passwords do not match'}
                            onChange={handleInputConfirmPassword}
                            value={confirmPassword}
                            sx={{ width: '90%', marginBottom: "20px" }}
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
                    </div>

                    <div>
                        <Button variant="contained" type="submit" color="primary" sx={{ mt: 2, width: '80%' }} disabled={loadingRegister}>
                            {loadingRegister ? <CircularProgress /> : 'Login'}
                        </Button>
                    </div>


                    <p className='text-center mt-2'> Alraedy i have Email <NavLink to='/login' className='text-black  fw-bolder fs-6'>LOGIN</NavLink></p>
                </form>
            </div>


























        </div>

    )
}

/*

  e.preventDefault();
        //   function validation  in onther file 
        var valid = validation(formUserRegister)
        //  if  error validation joi
        if (valid.error) {
            setLoading(false)
            setErrorList(valid.error.details)
            console.log(errorList);
        } else {
            //  api 
            //  function auth follew back end this fun in onther file
            let res = await auth("signUp", formUserRegister)
            // if error from back or server
            if (res.data.message != "success") {
                setLoading(false)
                setErrorMessage(res.data.message)
            } else {
                //  if all things go navigat to confirm email
                setLoading(false)
                navigat('/confirmemail')
                localStorage.setItem('email', res.data.email)
            }
        }

*/ 