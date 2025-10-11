/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import useSignup, { SignupResponse } from '../../apis/auth/use-signup';
import initialValues, { TSignup, validationSchema } from '../../schemas/auth/SignupSchema';

interface ISignupFromProps {
}

const SignupForm: React.FC<ISignupFromProps> = (props) => {
  const navigate = useNavigate();

  const [revealPassword, setRevealPassword] = useState(false);
  const { mutate: signup } = useSignup();

  const handleSignup = async (res: SignupResponse) => {
    if (res && 'success' in res && res.success) {
      navigate('/login');
    }
  };

  const handleErrorAuthen = () => {
    alert('error');
  };

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors }
  } = useForm<TSignup>({
    defaultValues: initialValues,
    resolver: joiResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    signup(values, { onSuccess: handleSignup, onError: () => handleErrorAuthen() });
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
          <p className="mb-1 text-base text-left">Name</p>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} className="my-2" />
            )}
          />
        </div>
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
        {/* <div className="flex flex-col mb-2">
          <p className="mb-1 text-base text-left">Email</p>
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="flex flex-col mb-2">
          <p className="mb-1 text-base text-left">Password</p>
          <Input
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type={revealPassword ? 'text' : 'password'}
            suffix={<EyeOutlined onClick={() => handleRevealPassword(revealPassword)} />}
            onPressEnter={() => handleSubmit()}
          />
        </div> */}

        <div className="mt-2 flex justify-center items-center">
          <Button
            className='m-2'
            onClick={() => onSubmit()}
          >
            Sign up
          </Button>
          <Button
            type="primary"
            className='m-2'
            onClick={() => navigate('/login')}
          >
            Back to login
          </Button>
        </div>
      </form>
      {/* <Form className="flex flex-col p-6 mx-auto bg-white shadow-md rounded-3xl" style={{ width: '448px' }}>
        <div className="flex flex-col mb-2">
          <p className="mb-1 text-base text-left">name</p>
          <Form.Item>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} className="my-2" placeholder="First Name *" />
              )}
            />
          </Form.Item>
        </div>
      </Form> */}
    </>
  );
};
export default SignupForm;
