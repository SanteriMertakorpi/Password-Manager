import React from "react";
import {useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validationSchema";
import Layout from "@/components/Layout";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    console.log(data);
    // Handle login logic
  };

  return(
    <Layout title="Login">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h1 className="text-2x1 font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
            type="email" 
            id="email" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
      </div>

    </Layout>

  );
};

export default Login;