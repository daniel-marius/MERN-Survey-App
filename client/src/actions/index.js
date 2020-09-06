import axios from 'axios';
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_SURVEY,
  ERROR
} from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const handleToken = (token) => async dispatch => {
  try {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

// Add file as an extra parameter
export const submitSurvey = (values, file, history) => async dispatch => {
  try {
    // Data necessary for uploading the image to AWS S3
    const uploadConfig = await axios.get('/api/upload');
    const url = uploadConfig.data.url;
    const key = uploadConfig.data.key;
    const params = {
      headers: {
        'Content-Type': 'images/jpeg|jpg|png|gif'
      }
    };

    await axios.put(url, file, params);

    const res = await axios.post('/api/surveys', {
      ...values,
      imageUrl: key
    });

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const fetchSurveys = () => async dispatch =>  {
  try {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const fetchSurvey = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/surveys/${id}`);
    dispatch({ type: FETCH_SURVEY, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};
