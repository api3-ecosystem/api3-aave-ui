import { useEffect } from "react";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useSwitchNetwork,
  useWalletClient,
} from "wagmi";
import { useRootStore } from "src/store/root";
import { useEthersProvider, useEthersSigner } from "./ethers";

export const useWeb3 = () => {
  const [setAccount] = useRootStore((store) => [store.setAccount]);
  const currentAccount = useAccount();
  const chain = useChainId();
  const { error: switchNetworkError, switchNetwork } = useSwitchNetwork();
  const signer = useEthersSigner();
  const provider = useEthersProvider();

  useEffect(() => {
    if (currentAccount.address) {
      setAccount(currentAccount.address);
    }
  }, [currentAccount.address, setAccount]);

  return {
    account: currentAccount.address,
    ...currentAccount,
    chainId: chain,
    switchNetworkError,
    switchNetwork: switchNetwork,
    signer,
    provider,
  };
};
