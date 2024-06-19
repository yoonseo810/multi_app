import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useThunk } from '../../hooks/useThunk';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store';

const Register = () => {
  const [doRegisterUser, isRegisterLoading, isRegisterError] =
    useThunk(registerUser);

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const { registerData } = useSelector((state) => state.users);

  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const handleRegistration = () => {
    doRegisterUser({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
  };

  const { handleSubmit, errors, values, handleChange } = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerValidationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: handleRegistration,
  });

  const showPasswordIcon = (field) => {
    return (
      <button
        className="focus:outline-none"
        type="button"
        onClick={() => {
          setIsVisible((visible) => ({
            ...visible,
            [field]: !visible[field],
          }));
        }}
      >
        {isVisible[field] ? (
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
  };

  const isRegisterDisabled = Object.values(errors).some((error) => error);

  useEffect(() => {
    if (registerData?.success === true) {
      toast.success(registerData.message);
      navigate('/login');
      navigate(0);
    }
    if (isRegisterError) {
      toast.error(isRegisterError);
    }
  }, [registerData, isRegisterError, navigate]);

  return (
    <div className="mx-auto flex flex-col gap-10 w-80">
      <h2 className="text-5xl text-emerald-400 tracking-wider m-0  ">
        Register
      </h2>
      <form className="flex flex-col gap-10 w-80" onSubmit={handleSubmit}>
        <Input
          color={errors?.fullName ? 'danger' : 'success'}
          errorMessage={errors?.fullName && errors.fullName}
          isRequired
          type="text"
          label="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          isInvalid={errors?.fullName}
        />
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
          type={isVisible.password ? 'text' : 'password'}
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          isInvalid={errors?.password}
          endContent={showPasswordIcon('password')}
        />
        <Input
          color={errors?.confirmPassword ? 'danger' : 'success'}
          errorMessage={errors?.confirmPassword && errors.confirmPassword}
          isRequired
          type={isVisible.confirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          isInvalid={errors?.confirmPassword}
          endContent={showPasswordIcon('confirmPassword')}
        />
        <Button
          color="primary"
          type="submit"
          isDisabled={isRegisterDisabled || isRegisterLoading}
          isLoading={isRegisterLoading}
        >
          {isRegisterLoading ? 'Registering' : 'Register'}
        </Button>
      </form>
    </div>
  );
};

export default Register;
