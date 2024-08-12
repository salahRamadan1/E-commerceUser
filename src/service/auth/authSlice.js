import { createSlice } from '@reduxjs/toolkit';
import { chekEmail_SendNumberVerfiy, googleLogIn, logInUser, registerUser, resetPassWord, SendNumberVerfiy, verfiy } from './actionAuth';
import { jwtDecode } from 'jwt-decode';

const initialStateAuth = {
    // google log in 
    loadingGoogleLogIn: false,
    errorGoogleLogIn: null,
    errorGoogleLogInNetWork: null,
    // register
    loadingRegister: false,
    errorRegister: null,
    errorRegisterNetWork: null,
    errorPassword: null,
    errorName: null,
    errorEmail: null,
    errorphone: null,
    // Verfiy
    loadingVerfiy: false,
    errorVerfiy: null,
    errorVerfiyApi: null,
    errorVerfiyNetWork: null,
    // SendNumberverfiy
    loadingSendNumberverfiy: false,
    errorSendNumberverfiy: null,
    errorSendNumberverfiyApi: null,
    errorSendNumberverfiyNetWork: null,
    // login
    loadingLogIn: false,
    errorLogIn: null,
    errorLogInNetWork: null,
    errorLogInPassword: null,
    errorLogInEmail: null,
    // resetPassword
    loadingResetPassWord: false,
    errorResetPassWord: null,
    errorResetPassWordApi: null,
    errorResetPassWordNetWork: null,
    // change profile image
    loadingProfileImage: false,
    errorProfileImageApi: null,
    errorProfileImageNetWork: null,
    // change Name
    loadingChangeName: false,
    errorChangeNameApi: null,
    errorChangeNameNetWork: null,
    // change Password
    loadingChangePassword: false,
    errorChangePasswordApi: null,
    errorChangePasswordNetWork: null,
    errorCurrentPasswordChange: null,
    errorNewPasswordChange: null,


    emailUser: null,
    userData: null,
    isLoggedIn: false,
}

var userToken = localStorage.getItem("userToken")
const authSlice = createSlice({

    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        logIn: (state) => {
            if (userToken) {
                state.isLoggedIn = true
                state.userData = jwtDecode(localStorage.getItem('userToken'))
            }

        },
        logout: (state) => {
            localStorage.removeItem('userToken')
            state.isLoggedIn = false

        },
        makeStateIsEmpityAuth: (state) => {
            const fields = [
                // google log in 
                'loadingGoogleLogIn', 'errorGoogleLogIn', 'errorGoogleLogInNetWork',
                // register
                'loadingRegister', 'errorRegister', 'errorRegisterNetWork', 'errorPassword', 'errorName', 'errorEmail',
                // Verfiy
                'loadingVerfiy', 'errorVerfiy', 'errorVerfiyApi', 'errorVerfiyNetWork',
                // SendNumberverfiy
                'loadingSendNumberverfiy', 'errorSendNumberverfiy', 'errorSendNumberverfiyApi', 'errorSendNumberverfiyNetWork',
                // login
                'loadingLogIn', 'errorLogIn', 'errorLogInNetWork', 'errorLogInPassword', 'errorLogInEmail',
                // resetPassWord
                'loadingResetPassWord', 'errorResetPassWord', 'errorResetPassWordNetWork', 'errorResetPassWordApi',
                // change profile image
                'loadingProfileImage', 'errorProfileImage', 'errorProfileImageNetWork', 'errorProfileImageApi',
                // change name
                'loadingChangeName', 'errorChangeName', 'errorChangeNameNetWork', 'errorChangeNameApi',
                // change Password
                'loadingChangePassword', 'errorChangePassword', 'errorChangePasswordNetWork', 'errorChangePasswordApi', 'errorCurrentPasswordChange', 'errorNewPasswordChange'

            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // google log in and register
            .addCase(googleLogIn.pending, (state) => {
                state.loadingGoogleLogIn = true;
                state.errorGoogleLogIn = null;
                state.errorGoogleLogInNetWork = null;

            })
            .addCase(googleLogIn.fulfilled, (state, action) => {
                state.loadingGoogleLogIn = false;
                console.log(action);
                if (action.payload.message === 'success') {
                    localStorage.setItem('userToken', action.payload.token)
                    state.isLoggedIn = true
                    state.userData = jwtDecode(localStorage.getItem('userToken'))
                  
                } else {
                    state.errorGoogleLogIn = action.payload.message;
                }
            })
            .addCase(googleLogIn.rejected, (state, action) => {
                state.loadingGoogleLogIn = false;
                state.errorGoogleLogInNetWork = !action.payload ? action.error.message : null;
            })
            // Login
            .addCase(logInUser.pending, (state) => {
                // Set loading state to true, clear all error states
                state.loadingLogIn = true;
                state.errorLogIn = null;
                state.errorLogInNetWork = null;
                state.errorLogInPassword = null;
                state.errorLogInEmail = null;
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                // Set loading state to false
                state.loadingLogIn = false;

                // Handle potential validation errors
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'email') state.errorLogInEmail = elm.message;
                        if (elm.path === 'password') state.errorLogInPassword = elm.message;
                    });
                    return; // Exit early if there are validation errors
                }

                // Clear validation errors
                state.errorLogInEmail = null;
                state.errorLogInPassword = null;

                // Handle successful login
                if (action.payload.message === 'logged in successfully') {
                    localStorage.setItem('userToken', action.payload.token);
                    state.isLoggedIn = true;
                    state.userData = jwtDecode(localStorage.getItem('userToken'));
                } else {
                    // Handle other login errors
                    state.errorLogIn = action.payload.message;
                }
            })
            .addCase(logInUser.rejected, (state, action) => {
                // Set loading state to false, handle network error
                state.loadingLogIn = false;
                state.errorLogInNetWork = !action.payload ? action.error.message : null;
            })


            // Send Number Verify
            .addCase(chekEmail_SendNumberVerfiy.pending, (state) => {
                // Set loading state to true and clear all error states
                state.loadingSendNumberverfiy = true;
                state.errorSendNumberverfiy = null;
                state.errorSendNumberverfiyApi = null;
                state.errorSendNumberverfiyNetWork = null;
            })
            .addCase(chekEmail_SendNumberVerfiy.fulfilled, (state, action) => {
                // Set loading state to false and handle response
                state.loadingSendNumberverfiy = false;
                if (action.payload.message === 'success') {
                    // Successful response - update email
                    state.emailUser = action.payload.email;
                } else {
                    // Failed response - set API error
                    state.errorSendNumberverfiyApi = action.payload.message;
                }
            })
            .addCase(chekEmail_SendNumberVerfiy.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingSendNumberverfiy = false
                state.errorSendNumberverfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Confirm Email
            .addCase(verfiy.pending, (state) => {
                // Set loading state to true and clear all error states
                state.loadingVerfiy = true;
                state.errorVerfiy = null;
                state.errorVerfiyApi = null;
                state.errorVerfiyNetWork = null;
            })
            .addCase(verfiy.fulfilled, (state, action) => {
                // Set loading state to false and handle response
                state.loadingVerfiy = false;
                // Check for validation errors
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'email') state.errorEmail = elm.message;
                        if (elm.path === 'ConfirmEmailNum') state.errorVerfiy = elm.message;
                    });
                    return;// Exit early if there are validation errors
                }
                // Clear validation errors
                state.errorVerfiy = null;
                // Handle successful verification
                if (action.payload.message === 'success') {
                    console.log('hello');
                } else {
                    // Handle API error
                    state.errorVerfiyApi = action.payload.message;
                }
            })
            .addCase(verfiy.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingVerfiy = false;
                state.errorVerfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Send Number Verify
            .addCase(SendNumberVerfiy.pending, (state) => {
                // Set loading state to true and clear all error states

                state.loadingSendNumberverfiy = true;
                state.errorSendNumberverfiy = null;
                state.errorSendNumberverfiyApi = null;
                state.errorSendNumberverfiyNetWork = null;
            })
            .addCase(SendNumberVerfiy.fulfilled, (state, action) => {

                // Set loading state to false
                state.loadingSendNumberverfiy = false;
                // Handle successful response
                if (action.payload.message === 'success') {
                    // Update email state (assuming email is used for verification)
                    state.emailUser = action.payload.email;
                } else {
                    // Set API error state
                    state.errorSendNumberverfiyApi = action.payload.message;
                }
            })
            .addCase(SendNumberVerfiy.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingSendNumberverfiy = false;
                state.errorSendNumberverfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Reset Password
            .addCase(resetPassWord.pending, (state) => {
                // Set loading state to true and clear all error states

                state.loadingResetPassWord = true;
                state.errorResetPassWord = null;
                state.errorResetPassWordNetWork = null;
                state.errorResetPassWordApi = null;
            })
            .addCase(resetPassWord.fulfilled, (state, action) => {

                // Set loading state to false
                state.loadingResetPassWord = false;
                // Check for validation error
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'password') state.errorResetPassWord = elm.message;
                    });
                    return;// Exit early if there are validation errors
                }
                // Clear password error
                state.errorResetPassWord = null;
                if (action.payload.message === 'success') {
                    state.emailUser = null;// Clear emailUser state
                } else {
                    // Set API error
                    state.errorResetPassWordApi = action.payload.message;
                }
            })
            .addCase(resetPassWord.rejected, (state, action) => {
                state.loadingResetPassWord = false;
                state.errorResetPassWordNetWork = !action.payload ? action.error.message : null;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                // Set loading state to true and clear all error states

                state.loadingRegister = true;
                state.errorRegister = null;
                state.errorRegisterNetWork = null;
                state.errorPassword = null;
                state.errorName = null;
                state.errorEmail = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {

                // Set loading state to false - registration process finished
                state.loadingRegister = false;
                // Check for validation errors in the response payload
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        // Set corresponding error state based on error path
                        if (elm.path === 'name') state.errorName = elm.message;
                        if (elm.path === 'email') state.errorEmail = elm.message;
                        if (elm.path === 'password') state.errorPassword = elm.message;
                        if (elm.path === 'phone') state.errorphone = elm.message;
                    });
                    return;// Exit early if validation errors exist
                }
                // Clear any previous validation errors
                state.errorName = null;
                state.errorEmail = null;
                state.errorPassword = null;
                state.errorphone = null;
                // Handle successful registration
                if (action.payload.message === 'Registration successful') {
                    // Update email state with email from payload (assuming relevant)
                    state.emailUser = action.payload.email;
                } else {
                    // Set registration error state with message from API
                    state.errorRegister = action.payload.message;
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingRegister = false;
                state.errorRegisterNetWork = !action.payload ? action.error.message : null;
            })


    }
})

export const { logout, logIn, currentUser, makeStateIsEmpityAuth } = authSlice.actions;
export default authSlice.reducer;