"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import marketDetails from "../../../data/market-details.json";
import { market, utilization } from "../../../data/chart-options";
import Nav from "../../../components/nav";

export default function Market() {
  const router = useRouter();

  const sampleData = [
    {
      data: [
        [1324508400000, 65],
        [1324508500000, 60],
        [1324508600000, 72],
        [1324508700000, 65],
        [1324508800000, 72],
        [1324508900000, 60],
        [1324509000000, 75],
      ],
    },
  ];

  const utilizationData = [
    {
      name: "Supply APR",
      type: "line",
      data: [
        [1, 1.5],
        [2, 1.53],
        [3, 1.56],
        [4, 1.59],
        [5, 1.62],
        [6, 1.65],
        [7, 1.68],
        [8, 1.71],
        [9, 1.74],
        [10, 1.77],
        [11, 1.8],
        [12, 1.83],
        [13, 1.86],
        [14, 1.89],
        [15, 1.92],
        [16, 1.95],
        [17, 1.98],
        [18, 2.01],
        [19, 2.04],
        [20, 2.07],
        [21, 2.1],
        [22, 2.13],
        [23, 2.16],
        [24, 2.19],
        [25, 2.22],
        [26, 2.25],
        [27, 2.28],
        [28, 2.31],
        [29, 2.34],
        [30, 2.37],
        [31, 2.4],
        [32, 2.43],
        [33, 2.46],
        [34, 2.49],
        [35, 2.52],
        [36, 2.55],
        [37, 2.58],
        [38, 2.61],
        [39, 2.64],
        [40, 2.67],
        [41, 2.7],
        [42, 2.73],
        [43, 2.76],
        [44, 2.79],
        [45, 2.82],
        [46, 2.85],
        [47, 2.88],
        [48, 2.91],
        [49, 2.94],
        [50, 2.97],
        [51, 3.0],
        [52, 3.03],
        [53, 3.06],
        [54, 3.09],
        [55, 3.12],
        [56, 3.15],
        [57, 3.18],
        [58, 3.21],
        [59, 3.24],
        [60, 3.27],
        [61, 3.3],
        [62, 3.33],
        [63, 3.36],
        [64, 3.39],
        [65, 3.42],
        [66, 3.45],
        [67, 3.48],
        [68, 3.51],
        [69, 3.54],
        [70, 3.57],
        [71, 3.6],
        [72, 3.63],
        [73, 3.66],
        [74, 3.69],
        [75, 3.72],
        [76, 3.75],
        [77, 3.78],
        [78, 3.81],
        [79, 3.84],
        [80, 3.87],
      ],
    },
    {
      name: "Borrow APR",
      type: "line",
      data: [
        [1, 1.03],
        [2, 1.06],
        [3, 1.09],
        [4, 1.12],
        [5, 1.15],
        [6, 1.18],
        [7, 1.21],
        [8, 1.24],
        [9, 1.27],
        [10, 1.3],
        [11, 1.33],
        [12, 1.36],
        [13, 1.39],
        [14, 1.42],
        [15, 1.45],
        [16, 1.48],
        [17, 1.51],
        [18, 1.54],
        [19, 1.57],
        [20, 1.6],
        [21, 1.63],
        [22, 1.66],
        [23, 1.69],
        [24, 1.72],
        [25, 1.75],
        [26, 1.78],
        [27, 1.81],
        [28, 1.84],
        [29, 1.87],
        [30, 1.9],
        [31, 1.93],
        [32, 1.96],
        [33, 1.99],
        [34, 2.02],
        [35, 2.05],
        [36, 2.08],
        [37, 2.11],
        [38, 2.14],
        [39, 2.17],
        [40, 2.2],
        [41, 2.23],
        [42, 2.26],
        [43, 2.29],
        [44, 2.32],
        [45, 2.35],
        [46, 2.38],
        [47, 2.41],
        [48, 2.44],
        [49, 2.47],
        [50, 2.5],
        [51, 2.53],
        [52, 2.56],
        [53, 2.59],
        [54, 2.62],
        [55, 2.65],
        [56, 2.68],
        [57, 2.71],
        [58, 2.74],
        [59, 2.77],
        [60, 2.8],
        [61, 2.83],
        [62, 2.86],
        [63, 2.89],
        [64, 2.92],
        [65, 2.95],
        [66, 2.98],
        [67, 3.01],
        [68, 3.04],
        [69, 3.07],
        [70, 3.1],
        [71, 3.13],
        [72, 3.16],
        [73, 3.19],
        [74, 3.22],
        [75, 3.25],
        [76, 3.28],
        [77, 3.31],
        [78, 3.34],
        [79, 3.37],
        [80, 3.4],
      ],
    },
  ];

  const [supplyAprTimeframe, setSupplyAprTimeframe] = useState(1);
  const [borrowAprTimeframe, setBorrowAprTimeframe] = useState(1);
  const [oraclePriceTimeframe, setOraclePriceTimeframe] = useState(1);

  interface MarketData {
    name: string;
    ticker: string;
    contractAddress: string;
    oraclePrice: number;
    utilisation: number;
    supplied: string;
    netSupplyApr: number;
    borrowed: string;
    netBorrowApr: number;
    availableLiquidity: string;
    reserveSize: string;
  }

  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    try {
      const parsedMarket = marketDetails as MarketData[];
      setMarketData(parsedMarket);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, []);

  const addressMarketData = marketData?.find(
    (data) => data.contractAddress === router.query.token_address,
  );

  return (
    <>
      <div className="flex min-h-screen w-screen flex-col">
        <Nav />
        <div className="flex h-fit w-full flex-col gap-12 p-6 md:p-12">
          <div className="flex w-full flex-col justify-between gap-y-8 lg:flex-row">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <Image
                  src={`/logos/${addressMarketData?.ticker}.png`}
                  height={48}
                  width={48}
                  alt="logo"
                />
                <div className="flex flex-col">
                  <p className="text-disabled">{addressMarketData?.ticker}</p>
                  <h2 className="text-2xl font-extrabold">
                    {addressMarketData?.name}
                  </h2>
                </div>
              </div>
              <Link
                target="_blank"
                href={
                  "https://zkevm.polygonscan.com/token/" +
                  addressMarketData?.contractAddress
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M20.0004 10.5C20.0004 11.0523 20.4481 11.5 21.0004 11.5C21.5526 11.5 22.0004 11.0523 22.0004 10.5H20.0004ZM14.0004 2.5C13.4481 2.5 13.0004 2.94772 13.0004 3.5C13.0004 4.05228 13.4481 4.5 14.0004 4.5V2.5ZM20.8478 4.26441L21.7388 3.81043L21.7388 3.81043L20.8478 4.26441ZM20.236 3.65259L20.69 2.76159V2.76159L20.236 3.65259ZM20.3075 5.6071C20.698 5.21658 20.698 4.58341 20.3075 4.19289C19.917 3.80237 19.2838 3.80237 18.8933 4.1929L20.3075 5.6071ZM11.2933 11.7929C10.9028 12.1834 10.9028 12.8166 11.2933 13.2071C11.6838 13.5976 12.317 13.5976 12.7075 13.2071L11.2933 11.7929ZM4.86187 21.1284L5.31586 20.2374H5.31586L4.86187 21.1284ZM3.37205 19.6386L2.48105 20.0926H2.48105L3.37205 19.6386ZM17.6288 19.6386L16.7378 19.1846L17.6288 19.6386ZM16.139 21.1284L15.685 20.2374L16.139 21.1284ZM4.86187 6.87157L4.40788 5.98057L4.86187 6.87157ZM3.37205 8.3614L2.48105 7.90741L2.48105 7.90741L3.37205 8.3614ZM10.5004 7.5C11.0527 7.5 11.5004 7.05228 11.5004 6.5C11.5004 5.94772 11.0527 5.5 10.5004 5.5V7.5ZM19.0004 14C19.0004 13.4477 18.5527 13 18.0004 13C17.4481 13 17.0004 13.4477 17.0004 14H19.0004ZM22.0004 10.5V5.74H20.0004V10.5H22.0004ZM18.7604 2.5H14.0004V4.5H18.7604V2.5ZM22.0004 5.74C22.0004 5.36446 22.0011 5.02267 21.978 4.73905C21.9538 4.44376 21.8989 4.12463 21.7388 3.81043L19.9568 4.7184C19.9493 4.70367 19.9706 4.7303 19.9846 4.90191C19.9996 5.0852 20.0004 5.33146 20.0004 5.74H22.0004ZM18.7604 4.5C19.1689 4.5 19.4152 4.50077 19.5985 4.51575C19.7701 4.52977 19.7967 4.5511 19.782 4.54359L20.69 2.76159C20.3757 2.60149 20.0566 2.54652 19.7613 2.5224C19.4777 2.49923 19.1359 2.5 18.7604 2.5V4.5ZM21.7388 3.81043C21.5087 3.35884 21.1415 2.99169 20.69 2.76159L19.782 4.54359C19.8572 4.58194 19.9184 4.64313 19.9568 4.7184L21.7388 3.81043ZM18.8933 4.1929L11.2933 11.7929L12.7075 13.2071L20.3075 5.6071L18.8933 4.1929ZM12.5459 20.5H8.455V22.5H12.5459V20.5ZM4.00048 16.0455V11.9545H2.00049V16.0455H4.00048ZM8.455 20.5C7.48387 20.5 6.81566 20.4992 6.29736 20.4569C5.79073 20.4155 5.51602 20.3394 5.31586 20.2374L4.40788 22.0194C4.93697 22.289 5.50418 22.3987 6.13449 22.4502C6.75313 22.5008 7.51687 22.5 8.455 22.5V20.5ZM2.00049 16.0455C2.00049 16.9836 1.99971 17.7473 2.05026 18.366C2.10176 18.9963 2.21147 19.5635 2.48105 20.0926L4.26306 19.1846C4.16108 18.9845 4.085 18.7097 4.04361 18.2031C4.00126 17.6848 4.00048 17.0166 4.00048 16.0455H2.00049ZM5.31586 20.2374C4.86257 20.0065 4.49403 19.6379 4.26306 19.1846L2.48105 20.0926C2.90376 20.9222 3.57826 21.5967 4.40788 22.0194L5.31586 20.2374ZM17.0004 16.0455C17.0004 17.0166 16.9996 17.6848 16.9573 18.2031C16.9159 18.7097 16.8398 18.9845 16.7378 19.1846L18.5198 20.0926C18.7894 19.5635 18.8991 18.9963 18.9506 18.366C19.0012 17.7473 19.0004 16.9836 19.0004 16.0455H17.0004ZM12.5459 22.5C13.484 22.5 14.2477 22.5008 14.8664 22.4502C15.4967 22.3987 16.0639 22.289 16.593 22.0194L15.685 20.2374C15.4849 20.3394 15.2101 20.4155 14.7035 20.4569C14.1852 20.4992 13.517 20.5 12.5459 20.5V22.5ZM16.7378 19.1846C16.5068 19.6379 16.1383 20.0065 15.685 20.2374L16.593 22.0194C17.4226 21.5967 18.0971 20.9222 18.5198 20.0926L16.7378 19.1846ZM8.455 5.5C7.51687 5.5 6.75313 5.49923 6.1345 5.54977C5.50418 5.60127 4.93697 5.71098 4.40788 5.98057L5.31586 7.76257C5.51602 7.66059 5.79073 7.58452 6.29736 7.54312C6.81566 7.50077 7.48387 7.5 8.455 7.5V5.5ZM4.00048 11.9545C4.00048 10.9834 4.00126 10.3152 4.04361 9.79689C4.085 9.29026 4.16108 9.01554 4.26306 8.81538L2.48105 7.90741C2.21147 8.4365 2.10176 9.00372 2.05026 9.63403C1.99971 10.2527 2.00049 11.0164 2.00049 11.9545H4.00048ZM4.40788 5.98057C3.57826 6.40328 2.90376 7.07779 2.48105 7.90741L4.26306 8.81538C4.49403 8.36208 4.86257 7.99354 5.31586 7.76257L4.40788 5.98057ZM8.455 7.5H10.5004V5.5H8.455V7.5ZM17.0004 14V16.0455H19.0004V14H17.0004Z"
                    fill="#F0F0F0"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex w-full flex-wrap gap-10 gap-y-4 lg:w-fit">
              <div className="flex flex-col items-center">
                <p className="text-disabled">Oracle Price</p>
                <p className="text-2xl font-extrabold">
                  <span>$ </span>
                  {addressMarketData?.oraclePrice}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-disabled">Utilization</p>
                <p className="text-2xl font-extrabold">
                  {addressMarketData?.utilisation}
                  <span> %</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-disabled">Available Liq.</p>
                <p className="text-2xl font-extrabold">
                  <span>$ </span>
                  {addressMarketData?.availableLiquidity}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-disabled">Reserve Size</p>
                <p className="text-2xl font-extrabold">
                  <span>$ </span>
                  {addressMarketData?.reserveSize}
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-fit grid-cols-2 flex-col gap-6 lg:grid lg:h-full lg:gap-12">
            <div className="flex h-fit w-full flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-disabled">Supply APY</p>
                  <p className="text-2xl font-extrabold">
                    {addressMarketData?.netSupplyApr}
                    <span> %</span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSupplyAprTimeframe(1)}
                    className={
                      supplyAprTimeframe === 1
                        ? "rounded-md bg-accent px-3 py-1"
                        : "rounded-md bg-accent px-3 py-1 opacity-50"
                    }
                  >
                    1m
                  </button>
                  <button
                    onClick={() => setSupplyAprTimeframe(3)}
                    className={
                      supplyAprTimeframe === 3
                        ? "rounded-md bg-accent px-3 py-1"
                        : "rounded-md bg-accent px-3 py-1 opacity-50"
                    }
                  >
                    3m
                  </button>
                </div>
              </div>
              <Chart
                options={market}
                series={sampleData}
                type="line"
                height={"320px"}
              />
            </div>
            <div className="flex h-fit w-full flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-disabled">Borrow APY</p>
                  <p className="text-2xl font-extrabold">
                    {addressMarketData?.netBorrowApr}
                    <span> %</span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setBorrowAprTimeframe(1)}
                    className={
                      borrowAprTimeframe === 1
                        ? "rounded-md bg-accent px-3 py-1"
                        : "rounded-md bg-accent px-3 py-1 opacity-50"
                    }
                  >
                    1m
                  </button>
                  <button
                    onClick={() => setBorrowAprTimeframe(3)}
                    className={
                      borrowAprTimeframe === 3
                        ? "rounded-md bg-accent px-3 py-1"
                        : "rounded-md bg-accent px-3 py-1 opacity-50"
                    }
                  >
                    3m
                  </button>
                </div>
              </div>
              <Chart
                options={market}
                series={sampleData}
                type="line"
                height={"320px"}
              />
            </div>
            <div className="flex h-fit w-full flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-disabled">Oracle Price</p>
                  <p className="text-2xl font-extrabold">
                    <span>$ </span>
                    {addressMarketData?.oraclePrice}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setOraclePriceTimeframe(1)}
                    className={
                      oraclePriceTimeframe === 1
                        ? "rounded-md bg-accent px-3 py-1"
                        : "rounded-md bg-accent px-3 py-1 opacity-50"
                    }
                  >
                    1m
                  </button>
                  <button
                    onClick={() => setOraclePriceTimeframe(3)}
                    className={
                      oraclePriceTimeframe === 3
                        ? "rounded-md bg-accent px-3 py-1"
                        : "rounded-md bg-accent px-3 py-1 opacity-50"
                    }
                  >
                    3m
                  </button>
                </div>
              </div>
              <Chart
                options={market}
                series={sampleData}
                type="line"
                height={"320px"}
              />
            </div>
            <div className="flex h-fit w-full flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-disabled">Utilisation</p>
                  <p className="text-2xl font-extrabold">
                    {addressMarketData?.utilisation}
                    <span> %</span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <p className="text-disabled">
                    Ideal <span className="text-white">80%</span>
                  </p>
                </div>
              </div>
              <Chart
                options={utilization}
                series={utilizationData}
                type="line"
                height={"320px"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
