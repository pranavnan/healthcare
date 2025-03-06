import { AxiosInstance } from 'axios';
import { container } from '../container';
import { TYPES } from '../types';
import { appointmentsAxiosInstance } from '../../utils/axios-base-instance/appointments.axios';

container
  .bind<AxiosInstance>(TYPES.Axios.AppointmentAxiosInstance)
  .toConstantValue(appointmentsAxiosInstance);
