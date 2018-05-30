export class User {
  constructor(
    public user_username: string,
    public user_first_name: string,
    public user_last_name: string,
    public user_password: string,
    public user_email: string,
    public user_description: string,
    public user_avatar_url: string,
    public user_guest: boolean
  ) {

  }
}
