import config from "deployment-configs.json";

import { zeroAddress } from "viem";

const deploymentConfig: any = config;

export const populateChainConfigs = () => {
  try {
    let config: any = {};

    if (!deploymentConfig?.generated?.config) {
      console.log("using default chains");
      config.chainId = deploymentConfig.default.config.network.chainId;
      config.name = deploymentConfig.default.config.network.name;
      config.rpc = deploymentConfig.default.config.network.rpc;
    } else {
      console.log("using generated chains");
      // read generated configs
      config.chainId = deploymentConfig.generated.config.network.chainId;
      config.name = deploymentConfig.generated.config.network.name;
      config.rpc = deploymentConfig.generated.config.network.rpc;
    }

    console.log({ config });

    return config;
  } catch (error) {
    console.log("Failed to read deploye contracts file", error);
    return {};
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
      contracts?.LendingPoolAddressesProvider?.custom?.address,
    POOL: contracts?.LendingPool?.custom?.address,
    WETH_GATEWAY: contracts?.WETHGateway?.custom?.address,
    FAUCET: zeroAddress,
    WALLET_BALANCE_PROVIDER: contracts?.WalletBalanceProvider?.custom?.address,
    UI_POOL_DATA_PROVIDER: contracts?.UiPoolDataProvider?.custom?.address,
    UI_INCENTIVE_DATA_PROVIDER:
      contracts?.UiIncentiveDataProviderV2V3?.custom?.address,
  };

  return market;
};
