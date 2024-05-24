import { InterestRate } from "contract-helpers";
import { Button, Grid } from "@mui/material";
import { useAssetCaps } from "src/hooks/useAssetCaps";
import { useModalContext } from "src/hooks/useModal";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";
import { useRootStore } from "src/store/root";
import { DashboardReserve } from "src/utils/dashboardSortUtils";
import { isFeatureEnabled } from "src/utils/marketsAndNetworksConfig";
import { GENERAL } from "src/utils/mixPanelEvents";
import Image from "next/image";
import { FormattedNumber } from "src/components/primitives/FormattedNumber";

export const BorrowedPositionsListItem = ({
  reserve,
  variableBorrows,
  variableBorrowsUSD,
  stableBorrows,
  stableBorrowsUSD,
  borrowRateMode,
  stableBorrowAPY,
}: DashboardReserve) => {
  const { openBorrow, openRepay, openRateSwitch, openDebtSwitch } =
    useModalContext();
  const { currentMarket, currentMarketData } = useProtocolDataContext();
  const { borrowCap } = useAssetCaps();
  // const trackEvent = useRootStore((store) => store.trackEvent);

  const {
    isActive,
    isFrozen,
    borrowingEnabled,
    stableBorrowRateEnabled,
    sIncentivesData,
    vIncentivesData,
    variableBorrowAPY,
    name,
  } = reserve;

  const disableBorrow =
    !isActive || !borrowingEnabled || isFrozen || borrowCap?.isMaxed;

  const showSwitchButton = isFeatureEnabled.debtSwitch(currentMarketData);
  const disableSwitch = !isActive || reserve.symbol == "stETH";

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
        <h3 className="teaser-voice">debt</h3>
        <p className="firm-voice ">
          <FormattedNumber
            data-cy={`apy`}
            value={Number(
              borrowRateMode === InterestRate.Variable
                ? variableBorrows
                : stableBorrows,
            )}
          />
        </p>
      </div>

      <div>
        <h3 className="teaser-voice">
          apy
          <span className=" whisper-voice font-bold text-primary">
            {" "}
            {borrowRateMode}
          </span>
        </h3>
        <p className="firm-voice ">
          <FormattedNumber
            data-cy={`apy`}
            percent
            value={Number(
              borrowRateMode === InterestRate.Variable
                ? variableBorrowAPY
                : stableBorrowAPY,
            )}
          />
        </p>
      </div>

      <div></div>

      <div className="actions items-center">
        <button
          // disabled={disableSupply}
          onClick={() => {
            openBorrow(
              reserve.underlyingAsset,
              currentMarket,
              name,
              "dashboard",
            );
          }}
          className="button whisper-voice"
        >
          Borrow
        </button>

        <button
          // disabled={disableSupply}
          onClick={() => {
            openRepay(
              reserve.underlyingAsset,
              borrowRateMode,
              isFrozen,
              currentMarket,
              name,
              "dashboard",
            );
          }}
          className="button whisper-voice outline"
        >
          Repay
        </button>
      </div>
    </li>
  );
};
