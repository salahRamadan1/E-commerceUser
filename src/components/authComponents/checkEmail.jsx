import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { validationAuth } from '../../functions/functionValidation';
import { useSelector, useDispatch } from 'react-redux';
import { chekEmail_SendNumberVerfiy } from '../../service/auth/actionAuth';
import './auth.css'
import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';
export default function CheckEmail() {
    // 1. State and Utility Variables:
    const [email, setEmail] = useState(''); // LogIn email flag
    const [errorList, setErrorList] = useState([]); // Error list state
    const [success, setSuccess] = React.useState(false); // Register success flag
    let navigate = useNavigate(); // Navigation function
    /*****************************************************************************************************************************/
    // 2. Data Fetching and Error Handling:
    const {
        errorSendNumberverfiy,
        errorSendNumberverfiyApi,
        errorSendNumberverfiyNetWork,
        loadingSendNumberverfiy
    } = useSelector((state) => state.auth)
    /*****************************************************************************************************************************/
    // 3. Define dispatch function (assuming it's from a Redux store)
    const dispatch = useDispatch();
    //4. Helper Function
    const handleInputChange = (e) => {
        setEmail(e.target.value)
        setErrorList([])
        dispatch(makeStateIsEmpityAuth())
    }
    /*****************************************************************************************************************************/
    // 5. Handle sending verification code (click handler)
    const handleClick = async (e) => {
        e.preventDefault();
        var valid = validationAuth({ email: email }) // validation Joi
        console.log(valid);
        if (valid.error)  // if error found
        {
            setErrorList(valid.error.details)
            return
        }
        const response = await dispatch(chekEmail_SendNumberVerfiy({ email: email }))

        if (response.payload?.message === 'success') {
            setSuccess(true)
            setErrorList([])
            setTimeout(() => {
                setSuccess(false)
                navigate('/digit')
            }, 2000);

        }
    };
    React.useEffect(() => {

        return () => dispatch(makeStateIsEmpityAuth()); // Cleanup function (if needed)
    }, []);
    // //  form data user
    // const [formUserChekEmail, setFormUserChekEmail] = useState({
    //     email: '',
    // })
    // //   function to set data to checkEmail


    // // redux use selector
    // const { error, loading, messageErrorCheckEmail } = useSelector((state) => state.auth)
    // //    redux dispatch

    // // function to handle submint
    // async function handlesubmint(e) {
    //     //   if error with Joi

    //     var valid = validationAuth(formUserChekEmail)
    //     e.preventDefault();
    //     if (valid.error) {
    //         setErrorList(valid.error.details)
    //     } else {
    //         // redux checkEmail 
    //         const { payload } = await dispatch(chekEmail_SendNumberVerfiy(formUserChekEmail))
    //         if (payload && payload.message == 'success') {
    //             navigate('/digit')
    //             console.log(payload);
    //         }
    //     }
    // }
    return (
        <div className="d-flex justify-content-center  form rounded-5  text-center shadow-lg pb-2 mt-5 pt-5">
            <div className=' col-md-12 w-50'>
                {/* Conditional rendering of error messages based on specific error states:
                        - If `errorSendNumberverfiy` exists, display an Alert with "error" severity and the error message
                        - Repeat for `errorSendNumberverfiyApi` and `errorSendNumberverfiyNetWork` as well */}

                {errorSendNumberverfiy && <Alert sx={{ width: "100%", marginX: "auto" }} severity='error'>{errorSendNumberverfiy}</Alert>}
                {errorSendNumberverfiyApi && <Alert sx={{ width: "100%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyApi}</Alert>}
                {errorSendNumberverfiyNetWork && <Alert sx={{ width: "100%", marginX: "auto" }} severity='error'>{errorSendNumberverfiyNetWork}</Alert>}


                <form onSubmit={handleClick}>
                    {success && <Alert severity='success'>success</Alert>}

                    <TextField
                        name="email"
                        id="standard-basic" label="Email" variant="standard"

                        type="email"
                        sx={{ width: "100%", marginBottom: "20px" }}
                        required

                        onChange={handleInputChange}
                        value={email}
                        error={!!errorList.find((elm) => elm.path[0] === 'email')} // Set error helperText if email error exists
                        helperText={errorList.find((elm) => elm.path[0] === 'email')?.message} // Display email error messag

                    />
                    {errorList.map((elm, i) => { if (elm.path[0] == 'email') return <p key={i}>{elm.message}</p> })}
                    <Stack direction="row" spacing={2}>
                        <Button type="submit" sx={{ width: "100%" }} variant="contained" disabled={loadingSendNumberverfiy}>
                            {loadingSendNumberverfiy ? (
                                <CircularProgress />
                            ) : (
                                'Continue -->'
                            )}
                        </Button>
                    </Stack>
                </form>

                {/* Forget password */}
                <NavLink to="/login" className='float-end mt-1'>
                    Login
                </NavLink>

            </div>

        </div>
    )
}
