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
import SymbolIcon from "src/components/SymbolIcon";

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
        <SymbolIcon symbol={symbol} />
        <p className="firm-voice">{name}</p>
      </div>
      <div>
        <h3 className="teaser-voice">
          apy /<strong className="whisper-voice text-primary"> %</strong>
        </h3>

        <p className="firm-voice">
          <FormattedNumber
            visibleDecimals={3}
            data-cy={`apy`}
            value={supplyAPY}
          />
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
      <div className="actions items-center">
        <button
          onClick={() => {
            if (!isConnected) {
              openConnectModal?.();
            } else {
              openSupply(underlyingAsset, currentMarket, name, "dashboard");
            }
          }}
          className="button whisper-voice justify-self-end"
        >
          Supply
        </button>
        <button className="button whisper-voice outline">Add Token?</button>
      </div>
    </div>
  );
};
