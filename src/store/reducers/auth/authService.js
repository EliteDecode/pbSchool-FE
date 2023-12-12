import axios from 'axios';

const API_URL = 'https://school.purplebeetech.com/api/';
//Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);

  return response.data;
};
//verify

const verify = async (data) => {
  const response = await axios.get(`${API_URL}verify/${data.id}/${data.string}`);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//logout

const logout = async () => {
  localStorage.removeItem('user');
};

//login

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//update

const update = async (userData, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${API_URL}${userId}/update_profile`, userData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const authService = {
  register,
  update,
  logout,
  verify,
  login
};

export default authService;
