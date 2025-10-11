/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Button, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import useLogin, { LoginResponse } from '../../apis/auth/use-login';
import { authTokenLocalStorage, refreshTokenLocalStorage } from '../../utils/local-storage';
import initialValues, { TLogin, validationSchema } from '../../schemas/auth/LoginSchema';

interface ILoginFromProps {
}

const LoginForm: React.FC<ILoginFromProps> = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [revealPassword, setRevealPassword] = useState(false);
  const { mutate: login } = useLogin();

  const handleAuthen = async (res: LoginResponse) => {
    if (res && 'success' in res && res.success) {
      authTokenLocalStorage.set(res.access_token);
      refreshTokenLocalStorage.set(res.refresh_token);
      await queryClient.refetchQueries(['user']);
      navigate('/');
    }
  };

  const handleErrorAuthen = () => {
    alert('error');
  };
  
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors }
  } = useForm<TLogin>({
    defaultValues: initialValues,
    resolver: joiResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    login(values, { onSuccess: handleAuthen, onError: () => handleErrorAuthen() });
  });
  
  const handleRevealPassword = (toggle: boolean) => {
    setRevealPassword(!toggle);
  };

  return (
    <>
      <form
        onSubmit={onSubmit} className="flex flex-col p-6 mx-auto border border-black rounded-3xl" style={{ width: '448px' }}
      >
        <div className="flex flex-col mb-2">
          <p className="mb-1 text-base text-left">Email</p>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} className="my-2" />
            )}
          />
        </div>
        <div className="flex flex-col mb-2">
          <p className="mb-1 text-base text-left">Password</p>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={revealPassword ? 'text' : 'password'}
                suffix={<EyeOutlined onClick={() => handleRevealPassword(revealPassword)} />}
              />
            )}
          />
        </div>

        <div className="mt-2 flex justify-center items-center">
          <Button
            type="primary"
            className='m-2'
            onClick={() => onSubmit()}
          >
            Log in
          </Button>
          <Button
            className='m-2'
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
