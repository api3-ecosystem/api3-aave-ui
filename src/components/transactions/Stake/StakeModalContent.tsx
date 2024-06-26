import { normalize, valueToBigNumber } from "@aave/math-utils";
import { Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useGeneralStakeUiData } from "src/hooks/stake/useGeneralStakeUiData";
import { useUserStakeUiData } from "src/hooks/stake/useUserStakeUiData";
import { useModalContext } from "src/hooks/useModal";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";
// import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { stakeConfig } from "src/ui-config/stakeConfig";
import { getNetworkConfig } from "src/utils/marketsAndNetworksConfig";
import { STAKE } from "src/utils/mixPanelEvents";

// import { CooldownWarning } from '../../Warnings/CooldownWarning';
import { AssetInput } from "../AssetInput";
import { TxErrorView } from "../FlowCommons/Error";
import { GasEstimationError } from "../FlowCommons/GasEstimationError";
import { TxSuccessView } from "../FlowCommons/Success";
import {
  DetailsNumberLine,
  TxModalDetails,
} from "../FlowCommons/TxModalDetails";
import { TxModalTitle } from "../FlowCommons/TxModalTitle";
import { ChangeNetworkWarning } from "../Warnings/ChangeNetworkWarning";
import { StakeActions } from "./StakeActions";
import { CooldownWarning } from "../Warnings/CooldownWarning";
import { useWeb3Context } from "src/hooks/lib/hooks/useWeb3Context";

export type StakeProps = {
  stakeAssetName: string;
  icon: string;
};

export enum ErrorType {
  NOT_ENOUGH_BALANCE,
}

type StakingType = "aave" | "bpt";

export const StakeModalContent = ({ stakeAssetName, icon }: StakeProps) => {
  const { chainId: connectedChainId, readOnlyModeAddress } = useWeb3Context();
  const { gasLimit, mainTxState: txState, txError } = useModalContext();
  const { currentNetworkConfig, currentChainId } = useProtocolDataContext();

  const { data: stakeUserResult } = useUserStakeUiData();
  const { data: stakeGeneralResult } = useGeneralStakeUiData();

  const stakeData = stakeGeneralResult?.[stakeAssetName as StakingType];

  // states
  const [_amount, setAmount] = useState("");
  const amountRef = useRef<string>();

  const walletBalance = normalize(
    stakeUserResult?.[stakeAssetName as StakingType]
      .underlyingTokenUserBalance || "0",
    18,
  );

  const isMaxSelected = _amount === "-1";
  const amount = isMaxSelected ? walletBalance : _amount;

  const handleChange = (value: string) => {
    const maxSelected = value === "-1";
    amountRef.current = maxSelected ? walletBalance : value;
    setAmount(value);
  };

  // staking token usd value
  const amountInUsd =
    Number(amount) *
    (Number(normalize(stakeData?.stakeTokenPriceEth || 1, 18)) *
      Number(normalize(stakeGeneralResult?.ethPriceUsd || 1, 8)));

  // error handler
  let blockingError: ErrorType | undefined = undefined;
  if (valueToBigNumber(amount).gt(walletBalance)) {
    blockingError = ErrorType.NOT_ENOUGH_BALANCE;
  }

  const handleBlocked = () => {
    switch (blockingError) {
      case ErrorType.NOT_ENOUGH_BALANCE:
        return <div>Not enough balance on your wallet</div>;
      default:
        return null;
    }
  };

  // is Network mismatched
  const stakingChain =
    currentNetworkConfig.isFork &&
    currentNetworkConfig.underlyingChainId === stakeConfig.chainId
      ? currentChainId
      : stakeConfig.chainId;
  const isWrongNetwork = connectedChainId !== stakingChain;

  const networkConfig = getNetworkConfig(stakingChain);

  if (txError && txError.blocking) {
    return <TxErrorView txError={txError} />;
  }
  if (txState.success)
    return (
      <TxSuccessView
        action={<div>Staked</div>}
        amount={amountRef.current}
        symbol={icon}
      />
    );

  return (
    <>
      <TxModalTitle title="Stake" symbol={icon} />
      {isWrongNetwork && !readOnlyModeAddress && (
        <ChangeNetworkWarning
          networkName={networkConfig.name}
          chainId={stakingChain}
          funnel={"Stake Modal"}
        />
      )}

      <CooldownWarning />

      <AssetInput
        value={amount}
        onChange={handleChange}
        usdValue={amountInUsd.toString()}
        symbol={icon}
        assets={[
          {
            balance: walletBalance.toString(),
            symbol: icon,
          },
        ]}
        isMaxSelected={isMaxSelected}
        maxValue={walletBalance.toString()}
        balanceText={<div>Wallet balance</div>}
      />
      {blockingError !== undefined && (
        <Typography variant="helperText" color="red">
          {handleBlocked()}
        </Typography>
      )}
      <TxModalDetails gasLimit={gasLimit}>
        <DetailsNumberLine
          description={<div>Staking APR</div>}
          value={Number(stakeData?.stakeApy || "0") / 10000}
          percent
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <StakeActions
        sx={{ mt: "48px" }}
        amountToStake={amount}
        isWrongNetwork={isWrongNetwork}
        symbol={icon}
        blocked={blockingError !== undefined}
        selectedToken={stakeAssetName}
        event={STAKE.STAKE_TOKEN}
      />
    </>
  );
};
