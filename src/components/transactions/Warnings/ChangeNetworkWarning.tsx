import { ChainId } from "contract-helpers";
// import { Trans } from '@lingui/macro';
import { Button, Typography } from "@mui/material";
// import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
// import { TrackEventProps } from 'src/store/analyticsSlice';
// import { useRootStore } from 'src/store/root';
// import { GENERAL } from 'src/utils/mixPanelEvents';

import { Warning } from "../../primitives/Warning";
import { useWeb3 } from "src/hooks/lib/useWeb3";

export type ChangeNetworkWarningProps = {
  funnel?: string;
  networkName: string;
  chainId: ChainId;
  event?: any;
};

export const ChangeNetworkWarning = ({
  networkName,
  chainId,
  event,
  funnel,
}: ChangeNetworkWarningProps) => {
  const { switchNetwork, switchNetworkError } = useWeb3();
  // const trackEvent = useRootStore((store) => store.trackEvent);

  const handleSwitchNetwork = () => {
    // trackEvent(GENERAL.SWITCH_NETWORK, { funnel, ...event?.eventParams, network: networkName });
    switchNetwork?.(chainId);
  };
  return (
    <Warning severity="error" icon={false}>
      {switchNetworkError ? (
        <Typography>
          <div>
            Seems like we can&apos;t switch the network automatically. Please
            check if you can change it from the wallet.
          </div>
        </Typography>
      ) : (
        <Typography variant="description">
          <div>Please switch to {networkName}.</div>{" "}
          <Button
            variant="text"
            sx={{ ml: "2px", verticalAlign: "top" }}
            onClick={handleSwitchNetwork}
            disableRipple
          >
            <Typography variant="description">
              <div>Switch Network</div>
            </Typography>
          </Button>
        </Typography>
      )}
    </Warning>
  );
};
