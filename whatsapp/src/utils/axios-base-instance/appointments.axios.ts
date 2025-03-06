import axios from 'axios';
import { APPOINTMENT_SRV_URL } from '../doctor-srv-url';

const appointmentsAxiosInstance = axios.create({
  baseURL: APPOINTMENT_SRV_URL,
});

export { appointmentsAxiosInstance };
