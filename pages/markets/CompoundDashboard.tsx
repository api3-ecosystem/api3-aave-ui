import { populateCompoundMarket } from "configuration";
import React, { useEffect, useMemo } from "react";
import { FormattedNumber } from "src/components/primitives/FormattedNumber";
import SymbolIcon from "src/components/SymbolIcon";
import { getLiquidationRisk } from "src/helpers/compoundHelpers";
import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import { useModalContext } from "src/hooks/useModal";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";

export default function CompoundDashboard() {
  const { openSupply, openBorrow, openWithdraw } = useModalContext();

  const compoundMarket = populateCompoundMarket();
  const { currentMarket, currentNetworkConfig } = useProtocolDataContext();
  const { compoundState, user } = useAppDataContext();

  const onSupplyClicked = () => {
    const usdc = compoundMarket.marketAsset;

    openSupply(usdc, currentMarket, "USDC", "reserve", true);
  };

  const onBorrowClicked = () => {
    // withdraw usdc
    const usdc = compoundMarket.marketAsset;
    openBorrow(usdc, currentMarket, "USDC", "reserve", true);
  };

  const isCollateralSupplied = useMemo(() => {
    return false;
  }, []);

  const isBaseBorrowed = useMemo(() => {
    return false;
  }, []);

  return (
    <section>
      <div className="inner-column grid">
        <div className="flex items-center gap-2 justify-self-center">
          <SymbolIcon symbol={"USDC"} />

          <div className="flex flex-col">
            <h1 className="loud-voice">{"USDC Market"}</h1>
          </div>

          <div className="ml-5 min-w-max">
            <button
              onClick={onSupplyClicked}
              disabled={isCollateralSupplied && !isBaseBorrowed ? true : false}
              // disabled={disable}
              data-cy="supplybutton"
              className="button whisper-voice mr-2"
            >
              {isCollateralSupplied ? "Repay USDC" : "Supply USDC"}
            </button>
            <button
              onClick={onBorrowClicked}
              // disabled={disable}
              data-cy="supplybutton"
              className="button whisper-voice"
            >
              {isCollateralSupplied ? "Borrow USDC" : "Withdraw USDC"}
            </button>
          </div>
        </div>
        <div className="summary-cards">
          <div className="summary-card">
            <h3 className="teaser-voice">Todal Reserves </h3>
            <p className="attention-voice">
              <FormattedNumber
                value={compoundState?.assetInfo?.totalReserves}
                // data-cy={`apy`}
                symbol="USD"
              />{" "}
            </p>
          </div>

          <div className="summary-card">
            <h3 className="teaser-voice">Net Supply APR </h3>
            <p className="attention-voice">
              <FormattedNumber
                value={compoundState?.assetInfo?.supplyAPR}
                // data-cy={`apy`}
                symbol="%"
              />{" "}
            </p>
          </div>
          <div className="summary-card">
            <h3 className="teaser-voice">Net Borrow APR </h3>
            <p className="attention-voice">
              <FormattedNumber
                value={compoundState?.assetInfo?.borrowAPR}
                // data-cy={`apy`}
                symbol="%"
              />{" "}
            </p>
          </div>

          <div className="summary-card">
            <h3 className="teaser-voice">Borrow Capacity</h3>
            <p className="attention-voice ">
              <FormattedNumber
                value={compoundState?.assetInfo?.baseInfo?.borrowCapacityBase}
                symbol="USDC"
                visibleDecimals={2}
              />
            </p>
          </div>
          <div className="summary-card">
            <h3 className="teaser-voice">USDC Supplied</h3>
            <p className="attention-voice ">
              <FormattedNumber
                value={compoundState?.assetInfo?.baseInfo?.suppliedFormatted}
                symbol="USDC"
                visibleDecimals={2}
              />
            </p>
          </div>
          <div className="summary-card">
            <h3 className="teaser-voice">Liquidation Risk </h3>
            <p className="attention-voice ">
              <FormattedNumber
                value={getLiquidationRisk(
                  compoundState?.assetInfo?.baseInfo?.borrowCapacityBase,
                  compoundState?.assetInfo?.baseInfo?.borrowedInBase,
                )}
                symbol="%"
                visibleDecimals={2}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
