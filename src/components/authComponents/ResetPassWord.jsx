import React, { useEffect, useState } from 'react'
import { Alert, CircularProgress, IconButton, TextField } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';
import { resetPassWord } from '../../service/auth/actionAuth';
import { PasswordShowAndHide } from '../../functions/showAndHidePassword';
import { validationAuth } from '../../functions/functionValidation';


export default function ResetPassWord() {
    // 1. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingResetPassWord,
        errorResetPassWord,
        errorResetPassWordNetWork,
        errorResetPassWordApi,
        emailUser,

    } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:

    const [passwordsMatch, setPasswordsMatch] = useState(false); // Password match flag
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    let { showPassword, toggle } = PasswordShowAndHide(); // Password visibility functions
    let navigate = useNavigate(); // Navigation function
    const [formUserResetPassWord, setFormUserResetPassWord] = useState({
        email: emailUser,
        password: ''
    }); // ResetPassWord form data state
    const [errorList, setErrorList] = useState([]); // Error list state
    /*****************************************************************************************************************************/

    // 3. Helper Functions:
    function handleInputChange(e) {
        setFormUserResetPassWord({ ...formUserResetPassWord, [e.target.name]: e.target.value });
        setErrorList([])
        dispatch(makeStateIsEmpityAuth())
        setPasswordsMatch(false)
    }
    function handleInputConfirmPassword(e) {
        setConfirmPassword(e.target.value)
        setErrorList([])
        dispatch(makeStateIsEmpityAuth())
        setPasswordsMatch(false)
    }
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleResetPassWord = async (e) => {
        e.preventDefault();

        var valid = validationAuth(formUserResetPassWord) // validation Joi
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        else if (formUserResetPassWord.password !== confirmPassword) // check password confirm
        {
            setPasswordsMatch(true);
            return
        }
        const response = await dispatch(resetPassWord(formUserResetPassWord));
        if (response.payload?.message === 'success') {

            navigate('/login');




        }
    }
    /*****************************************************************************************************************************/
    // 5. Cleanup Function (Optional):
    useEffect(() => {

        if (!emailUser) navigate('/login')

        return () => dispatch(makeStateIsEmpityAuth()); // Cleanup function (if needed)
    }, []);
    return (
        <div className=' container'>
            {/* Conditionally render SuccessComponent if `success` is true */}


            <div className='  form  w-50 border border-1 p-5 rounded-3 shadow mt-5  mx-auto text-center' >

                {/* Error handling for network and Joi validation (errorResetPassWordNetWork and errorResetPassWord) */}

                {errorResetPassWordNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorResetPassWordNetWork}</Alert>} {/* error joi api */}
                {errorResetPassWordApi && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorResetPassWordApi}</Alert>}   {/* error joi api */}

                <form onSubmit={handleResetPassWord}>

                    {/* Text field for password with error handling based on errorList and password visibility toggle */}

                    <TextField
                        label="Password"
                        variant="standard"

                        sx={{ width: "90%" }}
                        required
                        name="password"
                        value={formUserResetPassWord.password}
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

                    {errorResetPassWord && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorResetPassWord}</Alert>}   {/* error joi api */}
                    <br />
                    {/* Text field for confirming password with error handling based on passwords matching */}

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
                    <button type='submit' className=' btn btn-primary' >
                        {loadingResetPassWord ? <CircularProgress /> : 'continue >>'}
                    </button>
                </form>
                <br />


            </div>
        </div>

    )
}
