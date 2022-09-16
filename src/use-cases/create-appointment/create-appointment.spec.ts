import { it, describe, expect, test } from 'vitest';
import { Appointment } from '../../entities/appointment/appointment';
import { InMemoryAppointmentRepository } from '../../repositories/in-memory-appointments-repository/in-memory-appointment';
import { getFutureDate } from '../../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment';

describe('create-appointment', () => {
  describe('when create appointment with valid params', () => {
    it('should be able to create an appointment', async () => {
      const startsAt = getFutureDate('2022-08-10');
      const endsAt = getFutureDate('2022-08-11');

      const appointmentRepository = new InMemoryAppointmentRepository();
      const sut = new CreateAppointment(appointmentRepository);

      expect(
        sut.execute({ customer: 'John Doe', startsAt, endsAt })
      ).resolves.toBeInstanceOf(Appointment);
    });

    it('should not be able to create an appointment with overlapping dates', async () => {
      const startsAt = getFutureDate('2022-08-10');
      const endsAt = getFutureDate('2022-09-11');

      const appointmentRepository = new InMemoryAppointmentRepository();
      const sut = new CreateAppointment(appointmentRepository);

      await sut.execute({ customer: 'John Doe', startsAt, endsAt });

      expect(
        sut.execute({
          customer: 'John Doe',
          startsAt: getFutureDate('2022-07-01'),
          endsAt: getFutureDate('2022-08-11'),
        })
      ).rejects.toThrow();

      expect(
        sut.execute({
          customer: 'John Doe',
          startsAt: getFutureDate('2022-09-10'),
          endsAt: getFutureDate('2023-08-11'),
        })
      ).rejects.toThrow();

      expect(
        sut.execute({
          customer: 'John Doe',
          startsAt: getFutureDate('2022-07-01'),
          endsAt: getFutureDate('2023-08-11'),
        })
      ).rejects.toThrow();
    });
  });
});
