// import { Trans } from '@lingui/macro';
import { Button, Grid, Switch } from "@mui/material";
import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import { useAssetCaps } from "src/hooks/useAssetCaps";
import { useModalContext } from "src/hooks/useModal";
import { DashboardReserve } from "src/utils/dashboardSortUtils";

import { useProtocolDataContext } from "../../../../hooks/useProtocolDataContext";
import { isFeatureEnabled } from "../../../../utils/marketsAndNetworksConfig";
import Image from "next/image";
import { FormattedNumber } from "src/components/primitives/FormattedNumber";
import { useEffect } from "react";

export const SuppliedPositionsListItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
}: DashboardReserve) => {
  const { user } = useAppDataContext();
  const { isIsolated, aIncentivesData, isFrozen, isActive } = reserve;
  const { currentMarketData, currentMarket } = useProtocolDataContext();
  const { openSupply, openWithdraw, openCollateralChange, openSwap } =
    useModalContext();
  const { debtCeiling } = useAssetCaps();
  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  const canBeEnabledAsCollateral =
    !debtCeiling?.isMaxed &&
    reserve.reserveLiquidationThreshold !== "0" &&
    ((!reserve.isIsolated && !user.isInIsolationMode) ||
      user.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
      (reserve.isIsolated &&
        user.totalCollateralMarketReferenceCurrency === "0"));

  const disableSwap = !isActive || reserve.symbol == "stETH";
  const disableWithdraw = !isActive;
  const disableSupply = !isActive || isFrozen;

  const isEnabled = usageAsCollateralEnabledOnUser && canBeEnabledAsCollateral;

  return (
    <li className="dashboard-list-item">
      <div className="col-span-all flex items-center gap-2">
        <picture className="w-[100px] max-w-[80px]">
          <Image
            src={`/logos/${reserve?.symbol}.png`}
            width={30}
            height={30}
            alt={reserve?.symbol}
          />
        </picture>
        <p className="firm-voice">{reserve?.name}</p>
      </div>

      <div>
        <h3 className="teaser-voice">Balance</h3>
        <p className="firm-voice ">
          <FormattedNumber data-cy={`apy`} value={underlyingBalance} />
        </p>
      </div>

      <div>
        <h3 className="teaser-voice">APY</h3>

        <p className="firm-voice ">
          <FormattedNumber data-cy={`apy`} value={reserve?.supplyAPY} percent />
        </p>
      </div>

      <div>
        <p className="teaser-voice">Collateral</p>
        <Switch
          onClick={() => {
            openCollateralChange(
              underlyingAsset,
              currentMarket,
              reserve.name,
              "dashboard",
              usageAsCollateralEnabledOnUser,
            );
          }}
          disableRipple
          checked={isEnabled}
          disabled={!canBeEnabledAsCollateral}
        />
      </div>

      <div className="actions items-center ">
        <button
          // disabled={disableSupply}
          onClick={() => {
            openSupply(
              underlyingAsset,
              currentMarket,
              reserve?.name,
              "dashboard",
            );
            console.log("opening ");
          }}
          className="button whisper-voice"
        >
          Supply
        </button>

        <button
          // disabled={disableSupply}
          onClick={() => {
            openWithdraw(
              underlyingAsset,
              currentMarket,
              reserve.name,
              "dashboard",
            );
          }}
          className="button whisper-voice outline"
        >
          Withdraw
        </button>
      </div>
    </li>
  );
};
