import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),

});

export const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});