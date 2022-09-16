import { areIntervalsOverlapping } from 'date-fns';
import { Appointment } from '../../entities/appointment/appointment';
import { AppointmentRepository } from '../appointment/appointment-repository';

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Array<Appointment> = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((appointment) =>
      areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      )
    );

    return !overlappingAppointment ? null : overlappingAppointment;
  }
}
