"use client";
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

//RainbowKit
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { populateChainsToConfiure } from "configuration";
import { AllChains } from "./chains";

const populateWagmiChains = () => {
  const chainNames: string[] = populateChainsToConfiure();

  console.log(chainNames);
  const filteredChainConfigs = AllChains.filter((el) =>
    chainNames.includes(el.name.toLowerCase()),
  );
  console.log({ filteredChainConfigs });
  return filteredChainConfigs;
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...populateWagmiChains()],
  [publicProvider()],
);
const { connectors } = getDefaultWallets({
  appName: "Phantazm Frontend",
  projectId: "ca73069c03a2858722ff0941f1dea908",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const WagmiProvider = ({ children }: any) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#87B7E2",
          accentColorForeground: "black",
          borderRadius: "small",
          overlayBlur: "large",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiProvider;
