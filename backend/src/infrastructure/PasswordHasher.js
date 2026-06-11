import bcrypt from "bcrypt";

export default class PasswordHasher {
  constructor(rounds = 10) {
    this.rounds = rounds;
  }

  hash(password) {
    return bcrypt.hash(password, this.rounds);
  }

  compare(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
