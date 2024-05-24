import config from "deployment-configs.json";

import { zeroAddress } from "viem";

const deploymentConfig: any = config;

export const populateChainsToConfiure = () => {
  try {
    let chainId;

    if (!deploymentConfig?.generated?.config) {
      console.log("using default chains");
      chainId = deploymentConfig.default.config.network.chainId;
    } else {
      console.log("using generated chains");
      // read config from cli
      chainId = deploymentConfig.generated.config.network.chainId;
    }

    console.log({ chainId });

    return [chainId];
  } catch (error) {
    console.log("Failed to read deploye contracts file", error);
    return [];
  }
};

export const populateMarket = () => {
  let contracts;

  if (!deploymentConfig?.generated?.["deployed-contracts"]) {
    console.log("using default contracts");
    contracts = deploymentConfig.default?.["deployed-contracts"];
  } else {
    console.log("using cli contracts");

    // read config from cli

    contracts = deploymentConfig?.generated?.["deployed-contracts"];
  }

  const market = {
    POOL_ADDRESSES_PROVIDER:
      contracts.LendingPoolAddressesProvider.sepolia.address,
    POOL: contracts.LendingPool.sepolia.address,
    WETH_GATEWAY: contracts.WETHGateway.sepolia.address,
    FAUCET: zeroAddress,
    WALLET_BALANCE_PROVIDER: contracts.WalletBalanceProvider.sepolia.address,
    UI_POOL_DATA_PROVIDER: contracts.UiPoolDataProvider.sepolia.address,
    UI_INCENTIVE_DATA_PROVIDER:
      contracts.UiIncentiveDataProviderV2V3.sepolia.address,
  };

  return market;
};
