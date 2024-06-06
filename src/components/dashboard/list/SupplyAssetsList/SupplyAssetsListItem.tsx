import { DashboardReserve } from "src/utils/dashboardSortUtils";

import { FormattedNumber } from "src/components/primitives/FormattedNumber";
import { CheckBoxOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useModalContext } from "src/hooks/useModal";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";
import { useAssetCaps } from "src/hooks/useAssetCaps";
import Image from "next/image";
import { populateAssetIcon } from "configuration";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const SupplyAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  walletBalance,
  walletBalanceUSD,
  supplyCap,
  totalLiquidity,
  supplyAPY,
  aIncentivesData,
  underlyingAsset,
  isActive,
  isFreezed,
  isIsolated,
  usageAsCollateralEnabledOnUser,
  detailsAddress,
}: DashboardReserve) => {
  const { openSupply } = useModalContext();
  const { currentMarket } = useProtocolDataContext();
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  // Disable the asset to prevent it from being supplied if supply cap has been reached
  const { supplyCap: supplyCapUsage, debtCeiling } = useAssetCaps();
  const isMaxCapReached = supplyCapUsage?.isMaxed;

  const disableSupply =
    !isActive || isFreezed || Number(walletBalance) <= 0 || isMaxCapReached;

  return (
    <div className="dashboard-list-item">
      <div className="col-span-all flex items-center gap-2">
        <picture className="w-[100px] max-w-[80px]">
          <Image
            src={populateAssetIcon(symbol)}
            width={30}
            height={30}
            alt={symbol}
          />
        </picture>
        <p className="firm-voice">{name}</p>
      </div>
      <div>
        <h3 className="teaser-voice">apy</h3>

        <p className="firm-voice">
          <FormattedNumber data-cy={`apy`} value={supplyAPY} percent />
        </p>
      </div>
      <div>
        <h3 className="teaser-voice">collateral</h3>

        <p>
          {usageAsCollateralEnabledOnUser ? (
            <CheckBoxOutlined color="success" />
          ) : (
            "-"
          )}
        </p>
      </div>
      <div></div>
      <div className="actions items-center">
        <button
          onClick={() => {
            if (!isConnected) {
              openConnectModal?.();
            } else {
              openSupply(underlyingAsset, currentMarket, name, "dashboard");
            }
          }}
          className="button whisper-voice"
        >
          Supply
        </button>
      </div>
    </div>
  );
};
