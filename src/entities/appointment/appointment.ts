export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt >= endsAt || startsAt <= new Date()) {
      throw new Error('invalid date');
    }

    this.props = props;
  }

  get customer(): string {
    return this.props.customer;
  }

  get startsAt(): Date {
    return this.props.startsAt;
  }

  get endsAt(): Date {
    return this.props.endsAt;
  }
}
