import AppError from "../core/AppError.js";

export default class AuthService {
  constructor({ userRepository, passwordHasher, tokenService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async register({ name, email, password }) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("Email sudah digunakan", 409);
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: await this.passwordHasher.hash(password),
    });

    return { id: user.id, name: user.name, email: user.email };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    const passwordMatches =
      user && (await this.passwordHasher.compare(password, user.password));

    if (!passwordMatches) {
      throw new AppError("Email atau password salah", 401);
    }

    return {
      token: this.tokenService.generate({ id: user.id, email: user.email }),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async getProfile(userId) {
    const user = await this.userRepository.findProfileById(userId);

    if (!user) {
      throw new AppError("User tidak ditemukan", 404);
    }

    return user;
  }
}
