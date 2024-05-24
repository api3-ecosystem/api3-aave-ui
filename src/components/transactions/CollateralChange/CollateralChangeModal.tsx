import React from "react";
import {
  ModalContextType,
  ModalType,
  useModalContext,
} from "src/hooks/useModal";

import { BasicModal } from "../../primitives/BasicModal";
import { ModalWrapper } from "../FlowCommons/ModalWrapper";
import { CollateralChangeModalContent } from "./CollateralChangeModalContent";
import { ChainId } from "contract-helpers";

export const CollateralChangeModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;
  return (
    <BasicModal open={type === ModalType.CollateralChange} setOpen={close}>
      <ModalWrapper
        title={<div>Review tx</div>}
        underlyingAsset={args.underlyingAsset}
        requiredChainId={ChainId.sepolia}
      >
        {(params) => <CollateralChangeModalContent {...params} />}
      </ModalWrapper>
    </BasicModal>
  );
};
