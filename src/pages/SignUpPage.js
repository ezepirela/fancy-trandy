import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import {useHttpClient} from '../hooks/http-request';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from '../context/ContextProvider';
import Modal from '../components/shared/Modal'; 
import GoogleLogin from '../components/GoogleLogin';
import './SignUpPage.css';
const SignUpPage = () => {
	const [loginMode, setLoginMode] = useState(false)
	let validationSchema;
	const history = useHistory();
	const {sendRequest, isLoading} = useHttpClient();
	const [errorMessage, setErrorMessage] = useState(null);
	const auth = useContext(UserContext);
	const clearError = ()  =>{
		setErrorMessage(null);
	}
	const switchModeHandler = () => {
        setLoginMode(prevMode => !prevMode);
    }
    if(loginMode) {
        validationSchema = yup.object({
            username: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Required'),
            password: yup
            .string('Enter your password')
            .min(8,'Must be at lest 8 characters')
            .required('Required')
        });
    }else {
        validationSchema = yup.object({
            username: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Required'),
            firstName: yup
            .string('Enter your email')
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
            lastName: yup
            .string('Enter your email')
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
            password: yup
            .string('Enter your password')
            .min(8,'Must be at lest 8 characters')
            .required('Required')
        });
    }
    let initialValues = loginMode === true ? {
            username: '',
            password: ''
    } : {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
    }
    const formik = useFormik({
        initialValues, 
        validationSchema,
        onSubmit: async (values) => {
            let response; 
            if(!loginMode){
                const {username, lastName, firstName, password} = values;
                try {
                    response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}login/registrate`,
                       'POST', 
                       JSON.stringify({username: username, password: password, firstName: firstName, lastName: lastName}),
                       {'Content-Type': 'application/json'});
               }catch(e){
               	setErrorMessage('Sign In Failed. Try again')
               };
	            history.push('/home');
	            auth.login(response.user._id, response.token, response.user.username, response.user.firstName, response.user.lastName);
               	console.log(response);
            }else {
                const {username, password} = values;
                try {
                    response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}login/inicio`,
                       'POST', 
                       JSON.stringify({username: username, password: password}),
                       {'Content-Type': 'application/json'});
               }catch(e){
              	setErrorMessage('Login Failed. Try again')
               };
              	auth.login(response.user._id, response.token, response.user.username, response.user.firstName, response.user.lastName);
                console.log(response);
               	history.push('/home');
            }
        } 
    });
    return (
        <div >
            <div className='signUpPage__loadingSpinner'>
                {isLoading && <CircularProgress />}
            </div>
            <div className='signUpPage__googleLogin'>
                <GoogleLogin/>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Modal showModal={errorMessage} clearError={clearError} authMessage={errorMessage}/>
                <TextField 
                variant='outlined'
                margin='normal'
                id='email'
                name='username'
                label='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
                {!loginMode && <TextField 
                variant='outlined'
                margin='normal'
                id='firstName'
                name='firstName'
                label='firstName'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                />}
                {!loginMode && <TextField 
                variant='outlined'
                margin='normal'
                id='lastName'
                name='lastName'
                label='lastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                />}
                <TextField 
                variant='outlined'
                margin='normal'
                id='password'
                name='password'
                label='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                type='password'
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
                <Button type='submit' variant='contained' fullwidth='true' color='primary'>
                    Submit
                </Button>
            </form>
            <div className='signup__button'>
	            <Button onClick={switchModeHandler}  variant='outline-info'>
	            {loginMode === true? "I don't have an account" : "I've already an account"}
	            </Button>
            </div>
        </div>
    );
};
export default SignUpPage;