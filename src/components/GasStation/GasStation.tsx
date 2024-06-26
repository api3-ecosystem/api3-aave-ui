import { API_ETH_MOCK_ADDRESS } from "contract-helpers";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Box, CircularProgress, Stack } from "@mui/material";
import { BigNumber } from "ethers/lib/ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import React from "react";
import { GasTooltip } from "src/components/infoTooltips/GasTooltip";
import { Warning } from "src/components/primitives/Warning";
import { useWalletBalances } from "src/hooks/app-data-provider/useWalletBalances";
import { useGasStation } from "src/hooks/useGasStation";
import { useModalContext } from "src/hooks/useModal";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";

import { GasOption } from "./GasStationProvider";
import { useAppDataContext } from "src/hooks/app-data-provider/useAppDataProvider";
import { GasPriceData } from "src/hooks/useGetGasPrices";
import { FormattedNumber } from "../primitives/FormattedNumber";

export interface GasStationProps {
  gasLimit: BigNumber;
  skipLoad?: boolean;
  disabled?: boolean;
}

export const getGasCosts = (
  gasLimit: BigNumber,
  gasOption: GasOption,
  customGas: string,
  gasData: GasPriceData,
  baseCurrencyUsd: string
) => {
  const gasPrice =
    gasOption === GasOption.Custom
      ? parseUnits(customGas, "gwei").toString()
      : gasData[gasOption].legacyGasPrice;
  return (
    Number(formatUnits(gasLimit.mul(gasPrice), 18)) *
    parseFloat(baseCurrencyUsd)
  );
};

export const GasStation: React.FC<GasStationProps> = ({
  gasLimit,
  skipLoad,
  disabled,
}) => {
  const {
    state,
    gasPriceData: { data },
  } = useGasStation();

  const { walletBalances } = useWalletBalances();
  const nativeBalanceUSD =
    walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amountUSD;

  const { reserves } = useAppDataContext();
  const { currentNetworkConfig } = useProtocolDataContext();
  const { name, baseAssetSymbol, wrappedBaseAssetSymbol } =
    currentNetworkConfig;

  const { loadingTxns } = useModalContext();

  const wrappedAsset = reserves.find(
    (token) =>
      token.symbol.toLowerCase() === wrappedBaseAssetSymbol?.toLowerCase()
  );

  const totalGasCostsUsd =
    data && wrappedAsset
      ? getGasCosts(
          gasLimit,
          state.gasOption,
          state.customGas,
          data,
          wrappedAsset.priceInUSD
        )
      : undefined;

  return (
    <Stack gap={6}>
      <Box sx={{ display: "flex", alignItems: "center", mt: 6 }}>
        <LocalGasStationIcon
          color="primary"
          sx={{ fontSize: "16px", mr: 1.5 }}
        />

        {loadingTxns && !skipLoad ? (
          <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
        ) : totalGasCostsUsd && !disabled ? (
          <>
            <FormattedNumber
              value={totalGasCostsUsd}
              symbol="USD"
              color="text.secondary"
            />
            <GasTooltip />
          </>
        ) : (
          "-"
        )}
      </Box>
      {!disabled && Number(nativeBalanceUSD) < Number(totalGasCostsUsd) && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Warning severity="warning" sx={{ mb: 0, mx: "auto" }}>
            You do not have enough {baseAssetSymbol} in your account to pay for
            transaction fees on {name} network. Please deposit {baseAssetSymbol}{" "}
            from another account.
          </Warning>
        </Box>
      )}
    </Stack>
  );
};
