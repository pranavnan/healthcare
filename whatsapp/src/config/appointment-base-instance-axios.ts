import axios from 'axios';

const APPOINTMENT_BASE_URL = 'http://appointment-srv:3000/api/appointment';

const appointmentAxiosInstance = axios.create({
  baseURL: APPOINTMENT_BASE_URL,
})

export {
  appointmentAxiosInstance
}