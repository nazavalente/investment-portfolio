// Compatibility exports for modules outside the dependency container.
import PortfolioCalculator, {
  TransactionType,
} from "../domain/PortfolioCalculator.js";
import ResponseMapper from "../domain/ResponseMapper.js";

const calculator = new PortfolioCalculator();
const mapper = new ResponseMapper(calculator);

export const toNumber = PortfolioCalculator.toNumber;
export const normalizeTransactionType = TransactionType.normalize;
export const isBuyType = TransactionType.isBuy;
export const isSellType = TransactionType.isSell;
export const summarizeTransactions = calculator.summarize.bind(calculator);
export const formatAsset = mapper.asset.bind(mapper);
export const formatTransaction = mapper.transaction.bind(mapper);
export const formatDashboardPerformance =
  mapper.dashboardPerformance.bind(mapper);
