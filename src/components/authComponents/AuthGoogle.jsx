import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { googleLogIn } from '../../service/auth/actionAuth';
import { makeStateIsEmpityAuth } from '../../service/auth/authSlice';
export default function AuthGoogle() {
  // 1. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const {
      loadingGoogleLogIn,
      errorGoogleLogIn,
      errorGoogleLogInNetWork,
  } = useSelector((state) => state.auth);
  /*****************************************************************************************************************************/
  let navigate = useNavigate();// Navigation function
  /*****************************************************************************************************************************/
  // 4. Main Google Function:
  const handleSuccess = async (response) => {
    dispatch(makeStateIsEmpityAuth())
      // Extract the credential from the Google sign-in response
      const { credential } = response;
      // Dispatch a Redux action to perform Google login with the credential
      const responseFromApi = await dispatch(googleLogIn({ credential }))
      // Check if the login was successful
      if (responseFromApi.payload?.message === 'success') {
          // Navigate to the main home page if login successful
          navigate('/home');
      }
  };
  return (
      <div className=' text-center     justify-content-center mt-2'>
        <div className=' d-flex justify-content-center'>

          {loadingGoogleLogIn ? <CircularProgress /> : <GoogleLogin onSuccess={handleSuccess} />}
        </div>
      
          {errorGoogleLogIn && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorGoogleLogIn}</Alert>} {/* error joi api */}
          {errorGoogleLogInNetWork && <Alert severity='error' sx={{ width: "90%", alignItems: "center", margin: "auto", marginY: "5px" }}  >{errorGoogleLogInNetWork}</Alert>} {/* error joi api */}
      </div>

  )
}
