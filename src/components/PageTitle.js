import React from 'react';
import { Box, Typography } from '../../node_modules/@mui/material/index';

const PageTitle = ({ title }) => {
  return (
    <Box className="border py-3 bg-[#ece4efcd] px-5 rounded-md">
      <Typography variant="subtitle2" className="text-black opacity-50">
        Page
      </Typography>
      <Typography variant="h5" className="text-[#4b0064] font-black">
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
