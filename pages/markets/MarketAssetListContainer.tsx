import React from "react";
import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";
import {
  GHO_SUPPORTED_MARKETS,
  GHO_SYMBOL,
  getGhoReserve,
} from "src/utils/ghoUtilities";
import { fetchIconSymbolAndName } from "src/ui-config/reservePatches";
import { API_ETH_MOCK_ADDRESS } from "contract-helpers";
import MarketAssetsList from "./MarketAssetsList";
import Link from "next/link";

export default function MarketAssetListContainer() {
  const { reserves, loading } = useAppDataContext();
  const {
    currentMarket,
    currentMarketData,
    currentNetworkConfig,
    currentChainId,
  } = useProtocolDataContext();

  const ghoReserve = getGhoReserve(reserves);
  const filteredData = reserves
    // Filter out any non-active reserves
    .filter((res) => res.isActive)
    // Filter out all GHO, as we deliberately display it on supported markets
    .filter((res) => res !== ghoReserve)
    // filter out any that don't meet search term criteria
    // .filter((res) => {
    //   if (!searchTerm) return true;
    //   const term = searchTerm.toLowerCase().trim();
    //   return (
    //     res.symbol.toLowerCase().includes(term) ||
    //     res.name.toLowerCase().includes(term) ||
    //     res.underlyingAsset.toLowerCase().includes(term)
    //   );
    // })
    // Transform the object for list to consume it
    .map((reserve) => ({
      ...reserve,
      ...(reserve.isWrappedBaseAsset
        ? fetchIconSymbolAndName({
            symbol: currentNetworkConfig.baseAssetSymbol,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          })
        : {}),
    }));
  const marketFrozen = !reserves.some((reserve) => !reserve.isFrozen);
  const showFrozenMarketWarning =
    marketFrozen &&
    ["Harmony", "Fantom", "Ethereum AMM"].includes(
      currentMarketData?.marketTitle,
    );
  const unfrozenReserves = filteredData.filter(
    (r) => !r.isFrozen && !r.isPaused,
  );
  const frozenOrPausedReserves = filteredData.filter(
    (r) => r.isFrozen || r.isPaused,
  );

  return (
    <>
      {/* Unfrozen assets list */}

      <MarketAssetsList reserves={unfrozenReserves} loading={loading} />

      {/* Frozen or paused assets list */}
      {/* {frozenOrPausedReserves.length > 0 && (
        <Box sx={{ mt: 10, px: { xs: 4, xsm: 6 } }}>
          <Typography variant="h4" mb={4}>
            Frozen or paused assets
          </Typography>
          <Typography>
            These assets are temporarily frozen or paused by Aave community
            decisions, meaning that further supply / borrow, or rate swap of
            these assets are unavailable. Withdrawals and debt repayments are
            allowed. Follow the{" "}
            <Link
              //   onClick={() => {
              //     trackEvent(GENERAL.EXTERNAL_LINK, {
              //       link: "Frozen Market Markets Page",
              //       frozenMarket: currentNetworkConfig.name,
              //     });
              //   }}
              href="https://governance.aave.com"
              //   underline="always"
            >
              Aave governance forum
            </Link>{" "}
            for further updates.
          </Typography>
        </Box>
      )} */}
      {/* <MarketAssetsList reserves={frozenOrPausedReserves} loading={loading} /> */}

      {/* Show no search results message if nothing hits in either list */}
      {/* {!loading && filteredData.length === 0 && (
        <Typography>
          We couldn&apos;t find any assets related to your search. Try again
          with a different asset name, symbol, or address.
        </Typography>
      )} */}
    </>
  );
}
