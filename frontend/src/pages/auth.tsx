import { useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import { useRouter } from "next/router";
import {signUp, login} from '../utils/api';
import Layout from "@/components/Layout";
import { signupSchema } from "@/utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

interface SignUpFormInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
type LoginFormInputs = {
  username: string;
  password: string;
};

const AuthPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signupSchema),
  });
  const {register: register2, handleSubmit: handleSubmit2, formState: {errors: errors2}} = useForm<LoginFormInputs>();
  const  [ isLogin, setIsLogin ] = useState(true);
  const [ errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSignUpSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try{
       
      await signUp(data);
      const response = await login(data);
      localStorage.setItem('token', response.data.access_token);
      router.push('/dashboard');
    } catch (err){
      setErrorMessage('User already exists.');
    }
  };
  const onLoginSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try{
      const response = await login(data);
      localStorage.setItem('token', response.data.access_token);
      router.push('/dashboard');
    }catch (err) {
      setErrorMessage('Invalid Credentials');
    }
  }

  return(
    <Layout title={isLogin ? 'Login' : 'Sign Up'}>
      <div className="min-h-parent flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2x1 font-bold md-4"> {isLogin ? 'Login' : 'Sign Up'}</h1>
          {!isLogin ?
            <form onSubmit={handleSubmit(onSignUpSubmit)}>
            <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input 
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              {...register('email', {required: true})}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required.</p>}
            </div>
            <div className="mb-4">
            <label htmlFor="username" className="block mb-1">Username</label>
            <input 
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              {...register('username', {required: true})} 
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">Username is required.</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input 
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              {...register('password', {required:true})}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required.</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg"
              {...register('confirmPassword', {required:true})}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Sign Up
            </button>
          </form>
            :
            <form onSubmit={handleSubmit2(onLoginSubmit)}>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-1">Username</label>
                <input 
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                {...register2('username', {required: true})} 
                />
                {errors2.username && <p className="text-red-500 text-sm mt-1">Username is required.</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">Password</label>
                <input 
                type="password"
                className="w-full px-4 py-2 border rounded-lg"
                {...register2('password', {required:true})}
                />
                {errors2.password && <p className="text-red-500 text-sm mt-1">Password is required.</p>}
              </div>
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Login
            </button>
          </form>
          }
          <p className="mt-4 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button className="text-blue-500" onClick={()=> setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

        </div>

      </div>
    </Layout>
  );
};

export default AuthPage;
