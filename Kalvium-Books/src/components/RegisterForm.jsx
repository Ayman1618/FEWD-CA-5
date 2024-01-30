import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../components/RegisterForm.css';

export default function RegisterForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const [alerts, setAlerts] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [focusState, setFocusState] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
    });

    const handleFocus = (name) => {
        setFocusState((prevFocusState) => ({ ...prevFocusState, [name]: true }));
    };

    const onSubmit = (data) => {
        const newAlerts = {};

        if (data.firstName === '') {
            newAlerts.firstName = 'Please enter your first name.';
        } else {
            newAlerts.firstName = '';
        }

        if (data.lastName === '') {
            newAlerts.lastName = 'Please enter your last name.';
        } else {
            newAlerts.lastName = '';
        }

        if (data.phoneNumber === '') {
            newAlerts.phoneNumber = 'Please enter your phone number.';
        } else {
            newAlerts.phoneNumber = '';
        }

        if (data.email === '') {
            newAlerts.email = 'Please enter your email.';
        } else {
            newAlerts.email = '';
        }

        if (data.password === '') {
            newAlerts.password = 'Please enter your password.';
        } else if (data.password.length < 10) {
            newAlerts.password = 'Password must have at least 10 characters.';
        } else {
            newAlerts.password = '';
        }

        if (data.confirmPassword === '') {
            newAlerts.confirmPassword = 'Please confirm your password.';
        } else if (data.confirmPassword !== data.password) {
            newAlerts.confirmPassword = 'Passwords do not match.';
        } else {
            newAlerts.confirmPassword = '';
        }

        setAlerts(newAlerts);

        if (
            newAlerts.firstName === '' &&
            newAlerts.lastName === '' &&
            newAlerts.phoneNumber === '' &&
            newAlerts.email === '' &&
            newAlerts.password === '' &&
            newAlerts.confirmPassword === ''
        ) {
            setRegistrationSuccess(true);
            navigate("/");
            sessionStorage.setItem("registrationSuccess", "true");
        }
    };

    return (
        <div className='all'>

            <h1 className="reg-text">Registration Form</h1>
            <div className="app">
                {registrationSuccess && (
                    <div
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: '10px',
                            marginTop: '10px',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >Registration Successful!!</div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="Name"
                        placeholder="Enter your Name"
                        onFocus={() => handleFocus('Name')}
                        {...register("Name", { required: ' Name is Required!', minLength: { value: 3, message: "Name should be more than 2 characters" }, maxLength: { value: 30, message: "Name should be less than 30 characters" } })}
                        style={{
                            borderColor: focusState.Name ? 'navy' : '#ccc',
                        }}
                    />
                    <div className="alert">{alerts.Name}</div>
                    {errors.Name && <p className='error-text'>{errors.Name.message}</p>}



                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onFocus={() => handleFocus('email')}
                        {...register("email", { required: 'Email is Required!', pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                        style={{
                            borderColor: focusState.email ? 'navy' : '#ccc',
                        }}
                    />
                    <div className="alert">{alerts.email}</div>
                    {errors.email && <p className='error-text'>{errors.email.message}</p>}



                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onFocus={() => handleFocus('password')}
                        {...register("password", {
                            required: 'Password is Required!',
                            pattern: { value: /.*[\W]+.*/, message: "Password must contain at least one special character" },
                            minLength: { value: 10, message: "Password must have at least 10 characters" }
                        })}
                        

                    />
                    <div className="alert">{alerts.password}</div>
                    {errors.password && <p className='error-text'>{errors.password.message}</p>}



                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        onFocus={() => handleFocus('confirmPassword')}
                        {...register('confirmPassword', { required: 'Confirm Your Password', validate: (value) => value === watch('password') || "Passwords don't match" })}
                        style={{
                            borderColor: focusState.confirmPassword ? 'navy' : '#ccc',
                        }}
                    />
                    <div className="alert">{alerts.confirmPassword}</div>
                    {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword.message}</p>}

                    {/*Submit button */}
                    <button
                        className="submit-button"
                        type="submit"
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {' '}
                        Register{' '}
                    </button>
                </form>
            </div>
        </div>
    );
}
