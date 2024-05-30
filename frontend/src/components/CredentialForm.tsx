import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

interface CredentialFormInputs {
  website: string;
  username: string;
  password: string;
}

interface CredentialFormProps {
  onSubmit: (data: CredentialFormInputs) => void;
}

const CredentialForm: React.FC<CredentialFormProps> = ({ onSubmit}) => {
  const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm<CredentialFormInputs>();

  const generatePassword = () => {
    const lenght = 13;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';

    for (let i = 0; i<lenght; i++){
      const randomIndex = Math.floor(Math.random()*charset.length);
      password += charset[randomIndex];
    }
    setValue('password',password);
  };

  const submitHandler: SubmitHandler<CredentialFormInputs> = (data) => {
    onSubmit(data);
    reset();
  };

  return(
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
        <input 
        type="text"
        id="website"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
        {...register('website', {required: 'Website URL is required'})}
        />
        {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
      </div>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="flex items-center space-x-2">
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          <button
            type="button"
            onClick={generatePassword}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Generate Password
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Credential
      </button>
    </form>
  );
};

export default CredentialForm;