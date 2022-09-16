import { it, describe, expect, test } from 'vitest'
import { getFutureDate } from '../../tests/utils/get-future-date'
import { Appointment } from './appointment'

const expectData = {
  customer: "John Doe",
  startsAt: new Date(),
  endsAt: new Date()
}

test('create an appointment', () => {
  const startsAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-11')

  const appointment = new Appointment({
    ...expectData,
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual(expectData.customer)
})

test('can not create an appointment with end date before start date', () => {
  const startsAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-09')

  startsAt.setDate(startsAt.getDate() + 2)
  endsAt.setDate(endsAt.getDate() + 1)

  expect(() => {
    new Appointment({
      ...expectData,
      startsAt,
      endsAt
    })
  }).toThrow()
})

test('can not create an appointment with end date before now', () => {
  const startsAt = new Date()
  const endsAt = getFutureDate('2022-08-11')

  startsAt.setDate(startsAt.getDate() - 1)

  expect(() => {
    new Appointment({
      ...expectData,
      startsAt,
      endsAt
    })
  }).toThrow()
})