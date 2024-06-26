import { ChainId, InterestRate, PERMISSION } from "contract-helpers";
import React, { useState } from "react";
import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import {
  ModalContextType,
  ModalType,
  useModalContext,
} from "src/hooks/useModal";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";
import { getGhoReserve } from "src/utils/ghoUtilities";
import { isFeatureEnabled } from "src/utils/marketsAndNetworksConfig";

import { BasicModal } from "../../primitives/BasicModal";
import { ModalWrapper } from "../FlowCommons/ModalWrapper";
import { CollateralRepayModalContent } from "./CollateralRepayModalContent";
import { RepayModalContent } from "./RepayModalContent";
import { RepayType, RepayTypeSelector } from "./RepayTypeSelector";
import { useChainId } from "wagmi";

export const RepayModal = () => {
  const { type, close, args, mainTxState } =
    useModalContext() as ModalContextType<{
      underlyingAsset: string;
      currentRateMode: InterestRate;
      isFrozen: boolean;
    }>;
  const { userReserves, reserves } = useAppDataContext();
  const { currentMarketData } = useProtocolDataContext();
  const [repayType, setRepayType] = useState(RepayType.BALANCE);
  const chainId = useChainId();

  const stETHAddress = reserves.find((reserve) => reserve.symbol === "stETH")
    ?.underlyingAsset;
  const ghoReserve = getGhoReserve(reserves);

  // repay with collateral is only possible:
  // 1. on chains with paraswap deployed
  // 2. if asset is not GHO (disabled initially until there is enough liquidity)
  // 3. when you have a different supplied(not necessarily collateral) asset then the one your debt is in
  // For repaying your debt with the same assets aToken you can use repayWithAToken on aave protocol v3
  const collateralRepayPossible =
    isFeatureEnabled.collateralRepay(currentMarketData) &&
    args.underlyingAsset !== ghoReserve?.underlyingAsset &&
    userReserves.some(
      (userReserve) =>
        userReserve.scaledATokenBalance !== "0" &&
        userReserve.underlyingAsset !== args.underlyingAsset &&
        userReserve.underlyingAsset !== stETHAddress,
    );

  const handleClose = () => {
    setRepayType(RepayType.BALANCE);
    close();
  };

  return (
    <BasicModal open={type === ModalType.Repay} setOpen={handleClose}>
      <ModalWrapper
        title={<span>Repay</span>}
        underlyingAsset={args.underlyingAsset}
        requiredPermission={PERMISSION.BORROWER}
        requiredChainId={chainId}
      >
        {(params) => {
          return (
            <>
              {collateralRepayPossible && !mainTxState.txHash && (
                <RepayTypeSelector
                  repayType={repayType}
                  setRepayType={setRepayType}
                />
              )}
              {repayType === RepayType.BALANCE && (
                <RepayModalContent
                  {...params}
                  debtType={args.currentRateMode}
                />
              )}
              {repayType === RepayType.COLLATERAL && (
                <CollateralRepayModalContent
                  {...params}
                  debtType={args.currentRateMode}
                />
              )}
            </>
          );
        }}
      </ModalWrapper>
    </BasicModal>
  );
};
