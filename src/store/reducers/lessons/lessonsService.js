import axios from 'axios';

const API_URL = 'https://school.purplebeetech.com/api/';

const fetchLessons = async (token, lessonId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}lessons/${lessonId}`, config);
  return response.data;
};

const lessonsService = {
  fetchLessons
};

export default lessonsService;
