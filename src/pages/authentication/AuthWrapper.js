import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import { useLocation } from 'react-router-dom';
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Grid container>
        <Grid sm={12} md={6}>
          <Grid
            className="border"
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
              minHeight: '100vh'
            }}
          >
            <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
              <Logo />
            </Grid>
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                className="w-full"
                container
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
              >
                <Grid item>
                  <AuthCard>{children}</AuthCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
              <AuthFooter />
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={12} md={6} className={`${location.pathname === '/login' ? 'login_bg' : 'register_bg'}`}></Grid>
      </Grid>
    </Box>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
