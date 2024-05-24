import defaultConfig from "default-configs.json";

import { zeroAddress } from "viem";
import { existsSync, readFileSync } from "fs";

export const populateChainsToConfiure = () => {
  try {
    let chainId;

    if (existsSync("generated-config/config.json")) {
      console.log("using cli chains");
      // read config from cli
      const configRaw = readFileSync("generated-config/config.json", "utf-8");
      const config = JSON.parse(configRaw);
      chainId = config.network.chainId;
    } else {
      console.log("using default chains");
      chainId = defaultConfig.config.network.chainId;
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

  if (existsSync("generated-config/deployed-contracts.json")) {
    console.log("using cli contracts");

    // read config from cli
    const raw = readFileSync(
      "generated-config/deployed-contracts.json",
      "utf-8",
    );
    contracts = JSON.parse(raw);
    // chainId = config.network.chainId;
  } else {
    console.log("using default contracts");
    contracts = defaultConfig["deployed-contracts"];
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
