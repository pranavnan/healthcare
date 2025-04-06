// patient ask for doctor or may or may not specify the location and ask "i want to book an appointment with dr scott on location 'xyz' and send the date and time" and told us the check the availability of the doctor on that date and time and send the availability

import { IFunction } from "../interface/openai/function.interface";

export class GetDoctorAvailabilityFunction implements IFunction {
}