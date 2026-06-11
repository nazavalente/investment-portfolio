import prisma from "./config/db.js";
import PortfolioCalculator from "./domain/PortfolioCalculator.js";
import ResponseMapper from "./domain/ResponseMapper.js";
import PasswordHasher from "./infrastructure/PasswordHasher.js";
import TokenService from "./infrastructure/TokenService.js";
import AuthMiddleware from "./middlewares/authMiddleware.js";
import UserRepository from "./repositories/UserRepository.js";
import AssetRepository from "./repositories/AssetRepository.js";
import TransactionRepository from "./repositories/TransactionRepository.js";
import CategoryRepository from "./repositories/CategoryRepository.js";
import TargetRepository from "./repositories/TargetRepository.js";
import WatchlistRepository from "./repositories/WatchlistRepository.js";
import AuthService from "./services/authService.js";
import AssetService from "./services/assetService.js";
import TransactionService from "./services/transactionService.js";
import DashboardService from "./services/dashboardService.js";
import CategoryService from "./services/CategoryService.js";
import TargetService from "./services/TargetService.js";
import WatchlistService from "./services/WatchlistService.js";
import AuthController from "./controllers/authController.js";
import AssetController from "./controllers/assetController.js";
import TransactionController from "./controllers/transactionController.js";
import DashboardController from "./controllers/dashboardController.js";
import CategoryController from "./controllers/categoryController.js";
import TargetController from "./controllers/targetController.js";
import WatchlistController from "./controllers/watchlistController.js";

const portfolioCalculator = new PortfolioCalculator();
const responseMapper = new ResponseMapper(portfolioCalculator);
const tokenService = new TokenService(process.env.JWT_SECRET);

const repositories = {
  user: new UserRepository(prisma),
  asset: new AssetRepository(prisma),
  transaction: new TransactionRepository(prisma),
  category: new CategoryRepository(prisma),
  target: new TargetRepository(prisma),
  watchlist: new WatchlistRepository(prisma),
};

const services = {
  auth: new AuthService({
    userRepository: repositories.user,
    passwordHasher: new PasswordHasher(),
    tokenService,
  }),
  asset: new AssetService({
    assetRepository: repositories.asset,
    categoryRepository: repositories.category,
    responseMapper,
  }),
  transaction: new TransactionService({
    transactionRepository: repositories.transaction,
    assetRepository: repositories.asset,
    portfolioCalculator,
    responseMapper,
  }),
  category: new CategoryService({
    categoryRepository: repositories.category,
    responseMapper,
  }),
  target: new TargetService({
    targetRepository: repositories.target,
    responseMapper,
  }),
  watchlist: new WatchlistService({
    watchlistRepository: repositories.watchlist,
    responseMapper,
  }),
};

services.dashboard = new DashboardService({
  assetRepository: repositories.asset,
  targetRepository: repositories.target,
  portfolioCalculator,
  responseMapper,
});

export const controllers = {
  auth: new AuthController(services.auth),
  asset: new AssetController(services.asset),
  transaction: new TransactionController(services.transaction),
  category: new CategoryController(services.category),
  target: new TargetController(services.target),
  watchlist: new WatchlistController(services.watchlist),
  dashboard: new DashboardController(services.dashboard),
};

export const middlewares = {
  auth: new AuthMiddleware(tokenService).handle,
};

export { repositories, services };
