export default class UserRepository {
  constructor(prisma) {
    this.model = prisma.user;
  }

  findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  findProfileById(id) {
    return this.model.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  create(data) {
    return this.model.create({ data });
  }
}
