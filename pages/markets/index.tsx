"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import marketDetails from "../../data/market-details.json";

import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import { valueToBigNumber } from "@aave/math-utils";
import { FormattedNumber } from "src/components/primitives/FormattedNumber";
import MarketAssetListContainer from "./MarketAssetListContainer";

export default function Markets() {
  const { reserves, loading } = useAppDataContext();

  const aggregatedStats = reserves.reduce(
    (acc, reserve) => {
      return {
        totalLiquidity: acc.totalLiquidity.plus(reserve.totalLiquidityUSD),
        totalDebt: acc.totalDebt.plus(reserve.totalDebtUSD),
      };
    },
    {
      totalLiquidity: valueToBigNumber(0),
      totalDebt: valueToBigNumber(0),
    },
  );

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down("sm"));
  const valueTypographyVariant = downToSM ? "main16" : "main21";
  const symbolsVariant = downToSM ? "secondary16" : "secondary21";

  return (
    <>
      <section>
        <div className="inner-column grid">
          <h1 className="loud-voice gradient-text mb-4 justify-self-center text-center">
            Markets
          </h1>
          <div className="summary-cards">
            <div className="summary-card">
              <h3 className="teaser-voice">Total market size</h3>
              <p className="attention-voice">
                <FormattedNumber
                  value={aggregatedStats.totalLiquidity.toString()}
                  symbol="USD"
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbolsVariant={symbolsVariant}
                />
              </p>
            </div>

            <div className="summary-card">
              <h3 className="teaser-voice">Total Supplied</h3>
              <p className="attention-voice ">
                <FormattedNumber
                  value={aggregatedStats.totalLiquidity
                    .minus(aggregatedStats.totalDebt)
                    .toString()}
                  symbol="USD"
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbolsVariant={symbolsVariant}
                />
              </p>
            </div>

            <div className="summary-card">
              <h3 className="teaser-voice">Total Borrowed</h3>
              <p className="attention-voice ">
                <FormattedNumber
                  value={aggregatedStats.totalDebt.toString()}
                  symbol="USD"
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbolsVariant={symbolsVariant}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="inner-column wide">
          <MarketAssetListContainer />
        </div>
      </section>
    </>
  );
}
