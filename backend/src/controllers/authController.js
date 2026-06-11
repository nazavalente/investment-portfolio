import BaseController from "../core/BaseController.js";

export default class AuthController extends BaseController {
  constructor(authService) {
    super();
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  register(req, res, next) {
    return this.execute(next, async () => {
      const user = await this.authService.register(req.body);
      return this.success(res, user, "Register berhasil", 201);
    });
  }

  login(req, res, next) {
    return this.execute(next, async () => {
      const data = await this.authService.login(req.body);
      return this.success(res, data, "Login berhasil");
    });
  }

  getMe(req, res, next) {
    return this.execute(next, async () => {
      const user = await this.authService.getProfile(req.user.id);
      return this.success(res, user, "Data profil berhasil diambil");
    });
  }
}
