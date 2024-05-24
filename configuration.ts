import { MarketDataType } from "src/ui-config/marketsConfig";
import deployedContracts from "../deployed-contracts.json";
import config from "../deploy-adaptors/config.json";
import { zeroAddress } from "viem";

export const populateChainsToConfiure = () => {
  try {
    // const config = deployedContracts;
    const configuredChains = config.network.name;

    console.log({ configuredChains });

    return [configuredChains];
  } catch (error) {
    console.log("Failed to read deploye contracts file", error);
    return [];
  }
};

export const populateMarket = () => {
  const configuredChains = populateChainsToConfiure();

  const config = deployedContracts;

  const chain: string = configuredChains[0];
  const market = {
    POOL_ADDRESSES_PROVIDER:
      config.LendingPoolAddressesProvider.sepolia.address,
    POOL: config.LendingPool.sepolia.address,
    WETH_GATEWAY: config.WETHGateway.sepolia.address,
    FAUCET: zeroAddress,
    WALLET_BALANCE_PROVIDER: config.WalletBalanceProvider.sepolia.address,
    UI_POOL_DATA_PROVIDER: config.UiPoolDataProvider.sepolia.address,
    UI_INCENTIVE_DATA_PROVIDER:
      config.UiIncentiveDataProviderV2V3.sepolia.address,
  };

  return market;
};
