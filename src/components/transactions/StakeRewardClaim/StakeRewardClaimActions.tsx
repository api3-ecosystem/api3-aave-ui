import { BoxProps } from "@mui/material";
import { useRootStore } from "src/store/root";

import { useTransactionHandler } from "../../../helpers/useTransactionHandler";
import { TxActionsWrapper } from "../TxActionsWrapper";

export interface StakeRewardClaimActionProps extends BoxProps {
  amountToClaim: string;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  symbol: string;
  blocked: boolean;
  selectedToken: string;
}

export const StakeRewardClaimActions = ({
  amountToClaim,
  isWrongNetwork,
  sx,
  symbol,
  blocked,
  selectedToken,
  ...props
}: StakeRewardClaimActionProps) => {
  const claimStakeRewards = useRootStore((state) => state.claimStakeRewards);

  const { action, loadingTxns, mainTxState, requiresApproval } =
    useTransactionHandler({
      tryPermit: false,
      handleGetTxns: async () => {
        return claimStakeRewards({
          token: selectedToken,
          amount: amountToClaim,
        });
      },
      skip: !amountToClaim || parseFloat(amountToClaim) === 0 || blocked,
      deps: [amountToClaim],
    });

  return (
    <TxActionsWrapper
      requiresApproval={requiresApproval}
      blocked={blocked}
      preparingTransactions={loadingTxns}
      handleAction={action}
      actionText={<div>Claim {symbol}</div>}
      actionInProgressText={<div>Claiming {symbol}</div>}
      mainTxState={mainTxState}
      isWrongNetwork={isWrongNetwork}
      sx={sx}
      {...props}
    />
  );
};
