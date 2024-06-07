import { useConnectModal } from "@rainbow-me/rainbowkit";
import { populateAssetIcon } from "configuration";
import Image from "next/image";
import { FormattedNumber } from "src/components/primitives/FormattedNumber";
import { useModalContext } from "src/hooks/useModal";

import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";

import { DashboardReserve } from "src/utils/dashboardSortUtils";
import { useAccount } from "wagmi";

export const BorrowAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
  variableBorrowRate,
  stableBorrowRate,
  sIncentivesData,
  vIncentivesData,
  underlyingAsset,
  isFreezed,
}: DashboardReserve) => {
  const { openBorrow } = useModalContext();
  const { currentMarket } = useProtocolDataContext();

  const disableBorrow = isFreezed || Number(availableBorrows) <= 0;
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <div className="dashboard-list-item">
      <div className="col-span-all flex items-center gap-2">
        <picture className="w-[100px] max-w-[80px]">
          <Image
            src={populateAssetIcon(symbol)}
            width={30}
            height={30}
            alt={symbol}
          />
        </picture>
        <p className="firm-voice">{name}</p>
      </div>

      <div>
        <h3 className="teaser-voice">
          apy, variable /
          <strong className="whisper-voice text-primary"> %</strong>
        </h3>
        <p className="firm-voice">
          <FormattedNumber data-cy={`apy`} value={Number(stableBorrowRate)} />
        </p>
      </div>

      <div>
        <h3 className="teaser-voice">
          variabiltiy /
          <strong className="whisper-voice text-primary"> ±%</strong>
        </h3>

        <p className="firm-voice">
          <FormattedNumber data-cy={`apy`} value={Number(variableBorrowRate)} />
        </p>
      </div>

      <div>
        <h3 className="teaser-voice">collaterral</h3>

        <p className="firm-voice">
          <FormattedNumber value={Number(availableBorrows)} />
        </p>
      </div>

      <div className="actions items-center">
        <button
          //  disabled={disableSupply}
          onClick={() => {
            if (!isConnected) {
              openConnectModal?.();
            } else {
              openBorrow(underlyingAsset, currentMarket, name, "dashboard");
            }
            console.log("opening ");
          }}
          className="button whisper-voice"
        >
          Borrow
        </button>
      </div>
    </div>
  );
};
