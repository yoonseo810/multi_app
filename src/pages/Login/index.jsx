import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useThunk } from '../../hooks/useThunk';
import { logUserIn } from '../../store';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [doLogUserIn, isLogInLoading, isLogInError] = useThunk(logUserIn);

  const navigate = useNavigate();

  const { loginData } = useSelector((state) => state.users);

  const [isVisible, setIsVisible] = useState(false);
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleLogin = () => {
    doLogUserIn({ email: values.email, password: values.password });
  };

  const { handleSubmit, errors, values, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: handleLogin,
  });

  const showPasswordIcon = (
    <button
      className="focus:outline-none"
      type="button"
      onClick={() => {
        setIsVisible((visible) => !visible);
      }}
    >
      {isVisible ? (
        <FaRegEye
          size={22}
          className="text-2xl text-default-400 pointer-events-none"
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-2xl text-default-400 pointer-events-none"
        />
      )}
    </button>
  );

  const isLoginDisabled = Object.values(errors).some((error) => error);

  useEffect(() => {
    if (loginData?.success === true) {
      localStorage.setItem('token', loginData.accessToken);
      toast.success(loginData.message);
      navigate('/');
      navigate(0);
    }
    if (isLogInError) {
      toast.error(isLogInError);
    }
  }, [loginData, isLogInError, navigate]);

  return (
    <div className="mx-auto flex flex-col gap-10 w-80">
      <h2 className="text-5xl text-emerald-400 tracking-wider m-0  ">Log In</h2>
      <form className="flex flex-col gap-10 w-80" onSubmit={handleSubmit}>
        <Input
          color={errors?.email ? 'danger' : 'success'}
          errorMessage={errors?.email && errors.email}
          isRequired
          type="text"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          isInvalid={errors?.email}
        />
        <Input
          color={errors?.password ? 'danger' : 'success'}
          errorMessage={errors?.password && errors.password}
          isRequired
          type={isVisible ? 'text' : 'password'}
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          isInvalid={errors?.password}
          endContent={showPasswordIcon}
        />
        <Button
          color="primary"
          type="submit"
          isDisabled={isLoginDisabled || isLogInLoading}
          isLoading={isLogInLoading}
        >
          {isLogInLoading ? 'Logging In' : 'Log In'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
