export class User {
  constructor(
    public username: string,
    public first_name: string,
    public last_name: string,
    public password: string,
    public email: string,
    public description: string,
    public avatar_url: string,
    public guest: boolean
  ) {

  }
}
