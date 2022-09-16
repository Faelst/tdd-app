import {
  Appointment,
  AppointmentProps,
} from '../../entities/appointment/appointment';
import { AppointmentRepository } from '../../repositories/appointment/appointment-repository';

interface Request extends AppointmentProps {}

type Response = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({ customer, startsAt, endsAt }: Request): Promise<Response> {
    const overlappingAppointment =
      await this.appointmentRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates');
    }

    const appointment = new Appointment({ customer, startsAt, endsAt });
    await this.appointmentRepository.create(appointment);
    return appointment;
  }
}
