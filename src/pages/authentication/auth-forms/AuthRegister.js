import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../../../store/reducers/auth/authSlice';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword_confirmation, setShowpassword_confirmation] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowpassword_confirmation = () => {
    setShowpassword_confirmation(!showpassword_confirmation);
  };

  const handleMouseDownpassword_confirmation = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success('Congratulations, account created successfully', {
        onclose: () => {
          navigate('/');
        }
      });
    }
    dispatch(reset());
  }, [isError, isSuccess, dispatch, message, user, navigate]);

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          password_confirmation: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('First Name is required'),
          phone: Yup.number().required('Phone Number is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Check if it matches the 'password' field
            .required('Confirm Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatch(register(values));
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">name*</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Kennedy"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="kennedy@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="Phone">Phone Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    type="number"
                    error={Boolean(touched.phone && errors.phone)}
                    id="Phone"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="09010000000"
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password_confirmation-signup">Password Confirmation</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                    id="password_confirmation-signup"
                    type={showpassword_confirmation ? 'text' : 'password_confirmation'}
                    value={values.password_confirmation}
                    name="password_confirmation"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password_confirmation visibility"
                          onClick={handleClickShowpassword_confirmation}
                          onMouseDown={handleMouseDownpassword_confirmation}
                          edge="end"
                          size="large"
                        >
                          {showpassword_confirmation ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password_confirmation && errors.password_confirmation && (
                    <FormHelperText error id="helper-text-password_confirmation-signup">
                      {errors.password_confirmation}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="outlined" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
