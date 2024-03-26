import React, { useEffect } from 'react';
import { Box, Button, Grid, Skeleton, Typography } from '../../../node_modules/@mui/material/index';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { fetchCourses } from '../../store/reducers/courses/coursesSlice';
import { toast } from 'react-toastify';
import PageTitle from 'components/PageTitle';

const AllCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, isError, isLoading, isSuccess, message } = useSelector((state) => state.courses);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, isSuccess, dispatch, message, courses, navigate]);
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  //   const course = {
  //     id: 1,
  //     name: 'Frontend Development',
  //     price: '150000',
  //     duration: '3',
  //     description: 'Learn Frontend Development',
  //     status: 'open',
  //     created_at: '2023-12-13T08:42:48.000000Z',
  //     updated_at: '2023-12-13T08:42:48.000000Z'
  //   };
  return (
    <Box>
      <PageTitle title=" Avaialable Courses" />
      <Box className="mt-5">
        {isLoading && (
          <Grid container spacing={4}>
            {[1, 2, 3, 4]?.map((course, index) => {
              return (
                <Grid item sm={12} md={4} key={index}>
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </Grid>
              );
            })}
          </Grid>
        )}
        <Grid container spacing={4}>
          {courses &&
            courses?.courses?.map((course, index) => {
              return (
                <Grid item sm={12} md={4} key={index}>
                  <Box className="border bg-white py-2 px-4 shadow-md rounded-md">
                    <Box className="flex items-center justify-center">
                      {course.name === 'Frontend Development' ? (
                        <img src={require('../../assets/images/courses/frontend.jpg')} alt="frontend visuals" className="h-52" />
                      ) : course.name === 'Backend Development' ? (
                        <img src={require('../../assets/images/courses/backend.jpg')} alt="backend visuals" className="h-52" />
                      ) : course.name === 'Mobile Development' ? (
                        <img src={require('../../assets/images/courses/data1.jpg')} alt="mobile visuals" className="h-52" />
                      ) : (
                        <img src={require('../../assets/images/courses/data2.jpg')} alt="data visuals" className="h-52" />
                      )}
                    </Box>

                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {course.name}
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '12px' }} color="textSecondary">
                        {course.description}
                      </Typography>
                    </Box>
                    <Box className="my-4">
                      <Typography variant="body1" sx={{ fontSize: '12px' }} color="textSecondary">
                        Price: N{parseFloat(course.price).toLocaleString()}
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '12px' }} color="textSecondary">
                        Duration: {course.duration} months
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: '12px' }}
                        color={course.status === 'open' ? 'success.dark' : 'error.dark'}
                        fontWeight="bold"
                      >
                        Status: {course.status}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={course.status !== 'open'}
                        onClick={() => console.log(`Enrolling in ${name} (ID: ${id})`)}
                      >
                        Enroll Now
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default AllCourses;
