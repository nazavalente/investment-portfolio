import api from "./api";
import HttpService from "./HttpService";

class AuthService extends HttpService {
  constructor(httpClient) {
    super(httpClient);
    this.bindMethods("register", "login", "getProfile");
  }

  register(payload) {
    return this.post("/auth/register", payload);
  }

  login(payload) {
    return this.post("/auth/login", payload);
  }

  getProfile() {
    return this.get("/auth/me");
  }
}

export const authService = new AuthService(api);
