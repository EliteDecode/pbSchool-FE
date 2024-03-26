import axios from 'axios';

const API_URL = 'https://school.purplebeetech.com/api/';

const fetchCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}courses`, config);
  return response.data;
};

const coursesService = {
  fetchCourses
};

export default coursesService;
