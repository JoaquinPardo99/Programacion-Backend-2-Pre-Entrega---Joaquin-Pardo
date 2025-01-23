export class UserDTO {
  constructor({ _id, first_name, last_name, email }) {
    this.id = _id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }

  static toResponse(user) {
    return {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }
}
