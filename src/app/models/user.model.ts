export class User {
  id: number;
  email: string | null;
  timeUnit: string | null;
  theme: string | null;
  token: string | null;

  constructor(
    id: number,
    email: string | null,
    timeUnit: string | null,
    theme: string | null,
    token: string | null
  ) {
    this.id = id;
    this.email = email;
    this.timeUnit = timeUnit;
    this.theme = theme;
    this.token = token;
  }
}
