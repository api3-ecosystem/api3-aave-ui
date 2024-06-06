import { ChainId, PERMISSION } from "contract-helpers";
// import { Trans } from '@lingui/macro';
import React from "react";
import {
  ModalContextType,
  ModalType,
  useModalContext,
} from "src/hooks/useModal";

import { BasicModal } from "../../primitives/BasicModal";
import { ModalWrapper } from "../FlowCommons/ModalWrapper";
import { SupplyModalContent } from "./SupplyModalContent";
import { useChainId } from "wagmi";

export const SupplyModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;

  const chainId = useChainId();

  return (
    <BasicModal open={type === ModalType.Supply} setOpen={close}>
      <ModalWrapper
        action="supply"
        title={<span>Supply</span>}
        underlyingAsset={args.underlyingAsset}
        requiredChainId={chainId}
        requiredPermission={PERMISSION.DEPOSITOR}
      >
        {(params) => <SupplyModalContent {...params} />}
      </ModalWrapper>
    </BasicModal>
  );
};
