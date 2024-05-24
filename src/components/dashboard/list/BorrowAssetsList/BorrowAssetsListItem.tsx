import { CheckBoxOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Row from "components/row";
import Image from "next/image";
import { FormattedNumber } from "src/components/primitives/FormattedNumber";
import { useModalContext } from "src/hooks/useModal";

import { useProtocolDataContext } from "src/hooks/useProtocolDataContext";

import { DashboardReserve } from "src/utils/dashboardSortUtils";

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

  return (
    <div className="dashboard-list-item">
      <div className="col-span-all flex items-center gap-2">
        <picture className="w-[100px] max-w-[80px]">
          <Image
            src={`/logos/${iconSymbol}.png`}
            width={30}
            height={30}
            alt={symbol}
          />
        </picture>
        <p className="firm-voice">{name}</p>
      </div>

      <div>
        <h3 className="teaser-voice">apy, variable</h3>
        <p className="firm-voice">
          <FormattedNumber
            data-cy={`apy`}
            value={Number(stableBorrowRate)}
            percent
          />
        </p>
      </div>

      <div>
        <h3 className="teaser-voice">variabiltiy</h3>

        <p className="firm-voice">
          <span className="plus-minus">±</span>{" "}
          <FormattedNumber
            data-cy={`apy`}
            value={Number(variableBorrowRate)}
            percent
          />
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
            openBorrow(underlyingAsset, currentMarket, name, "dashboard");
            console.log("opening ");
          }}
          className="button whisper-voice"
        >
          Borrow
        </button>
      </div>
    </div>
    // <Row
    //   key={name}
    //   ticker={symbol}
    //   name={name}
    //   subtitle={
    //     <>
    //       <p className="text-xs">
    //         <span style={{ fontSize: 14, fontWeight: 600, marginRight: 5 }}>
    //           {" "}
    //           Wallet:
    //         </span>
    //         <FormattedNumber
    //           data-cy={`walletBalance`}
    //           value={0}
    //           variant={"main16"}
    //           symbolsVariant={"main16"}
    //         />
    //       </p>

    //       <p className="text-xs">
    //         <span style={{ fontSize: 14, fontWeight: 600, marginRight: 5 }}>
    //           {" "}
    //           Supplied:
    //         </span>
    //         <FormattedNumber
    //           data-cy={`walletBalance`}
    //           value={0}
    //           variant={"main16"}
    //           symbolsVariant={"main16"}
    //         />
    //       </p>
    //     </>
    //   }
    // >
    //   <div className="flex gap-2 w-full sm:w-fit">
    //     <button
    //       // disabled={disableSupply}
    //       onClick={() => {
    //         openBorrow(underlyingAsset, currentMarket, name, "dashboard");
    //         console.log("opening ");
    //       }}
    //       className="px-4 py-2 text-sm rounded-sm bg-accent  w-1/2 "
    //     >
    //       Borrow
    //     </button>
    //     <button className="px-4 py-2 text-sm rounded-sm bg-accent opacity-30 w-1/2 ">
    //       Details
    //     </button>
    //   </div>
    // </Row>
  );
};
