import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import PageTitle from 'components/PageTitle';
import { useParams } from 'react-router-dom'; // Updated import
import { useDispatch, useSelector } from 'react-redux'; // Updated import
import { toast } from 'react-toastify';
import { fetchLessons } from '../../store/reducers/lessons/lessonsSlice';
import ReactPlayer from 'react-player/lazy';
import { Grid, Typography } from '@mui/material'; // Updated import

const SingleLessons = () => {
  const { lessonId } = useParams();
  const dispatch = useDispatch();

  const { lessons, isError, message } = useSelector((state) => state.lessons);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    dispatch(fetchLessons(lessonId));
  }, [dispatch, lessonId]); // Include lessonId in the dependency array

  return (
    <Box>
      <PageTitle title="Frontend Lessons" />
      <Grid container spacing={4}>
        {lessons?.lessons?.map((lesson, index) => {
          const { name, description } = lesson;

          return (
            <Grid item sm={12} md={4} key={index} className="mt-5">
              <Box className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=zJSY8tbf_ys"
                  width="100%"
                  height="100%"
                  controls
                  config={{ youtube: { playerVars: { controls: 1, modestbranding: 1 } } }}
                />
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {description}
                </Typography>
                <Box mt={2} className="flex justify-between items-center">
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '12px' }}>Lesson status</Typography>
                    <Box className="py-0.5 px-3 bg-[#dbd9c2] text-yellow-700 text-[11px] rounded-md ">Pending</Box>
                  </Box>
                  <Box className="cursor-pointer">
                    <Typography sx={{ fontWeight: 'bold', fontSize: '12px' }}>Action</Typography>
                    <Box className="py-0.5 px-3 bg-[#c1dbbf] text-green-700 text-[11px] rounded-md ">Mark as completed</Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SingleLessons;
