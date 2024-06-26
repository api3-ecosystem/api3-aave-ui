import { Box, Typography } from "@mui/material";
import { StyledTxModalToggleButton } from "src/components/StyledToggleButton";
import { StyledTxModalToggleGroup } from "src/components/StyledToggleButtonGroup";
import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";

export enum RepayType {
  BALANCE,
  COLLATERAL,
}
export function RepayTypeSelector({
  repayType,
  setRepayType,
}: {
  repayType: RepayType;
  setRepayType: (type: RepayType) => void;
}) {
  const { currentMarketData } = useProtocolDataContext();

  if (!currentMarketData.enabledFeatures?.collateralRepay) return null;
  return (
    <Box sx={{ mb: 6 }}>
      <Typography mb={1} color="text.secondary">
        <div>Repay with</div>
      </Typography>

      <StyledTxModalToggleGroup
        color="primary"
        value={repayType}
        exclusive
        onChange={(_, value) => setRepayType(value)}
      >
        <StyledTxModalToggleButton
          value={RepayType.BALANCE}
          disabled={repayType === RepayType.BALANCE}
        >
          <Typography variant="buttonM">
            <div>Wallet balance</div>
          </Typography>
        </StyledTxModalToggleButton>

        <StyledTxModalToggleButton
          value={RepayType.COLLATERAL}
          disabled={repayType === RepayType.COLLATERAL}
        >
          <Typography variant="buttonM">
            <div>Collateral</div>
          </Typography>
        </StyledTxModalToggleButton>
      </StyledTxModalToggleGroup>
    </Box>
  );
}
