import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";

import MobileNav from "./nav_mobile";
import ConnectWallet from "./ConnectWallet";

export default function Nav() {
  const [nav, setNav] = useState(false);
  const router = useRouter();

  return (
    <>
      <MobileNav open={nav} onClose={() => setNav(false)} />
      <div className="flex justify-between pt-6 px-6 md:px-12 items-center">
        <div className="gap-6 items-center hidden sm:flex">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="34"
              viewBox="0 0 36 34"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.55104 9.13496C6.52749 4.27024 12.1776 0.985504 18.659 0.985504C28.2361 0.985504 36.0002 8.15504 36.0002 17C36.0002 25.8449 28.2361 33.0145 18.659 33.0145C9.97555 33.0145 2.78399 27.1221 1.51597 19.4296C1.51597 19.4296 -0.843901 11.5132 0.325025 8.20826C0.325025 8.20826 1.51781 9.3937 3.55104 9.13496ZM26.5295 16.3485C28.1591 16.3485 29.4803 15.0273 29.4803 13.3978C29.4803 11.7683 28.1591 10.447 26.5295 10.447C24.9 10.447 23.5788 11.7683 23.5788 13.3978C23.5788 15.0273 24.9 16.3485 26.5295 16.3485ZM27.603 7.63389L27.3792 7.13109L23.454 8.88172L23.6779 9.38453L27.603 7.63389ZM15.8936 8.88172L11.9684 7.13109L11.7445 7.63389L15.6697 9.38453L15.8936 8.88172ZM15.7816 13.3978C15.7816 11.7683 14.4604 10.447 12.8309 10.447C11.2014 10.447 9.88013 11.7683 9.88013 13.3978C9.88013 15.0273 11.2014 16.3485 12.8309 16.3485C14.4604 16.3485 15.7816 15.0273 15.7816 13.3978ZM24.9973 25.8229C27.214 25.0302 29.5152 23.4263 30.5685 20.2113L30.5666 20.2095C31.3007 18.3249 31.508 16.0494 30.963 13.3959C30.8841 13.7116 30.7703 14.0089 30.6272 14.2933C30.3336 14.8493 29.7941 15.5888 28.8105 16.2898C28.7775 16.3137 28.7426 16.3375 28.7077 16.3614C28.5169 16.4898 28.3169 16.611 28.1095 16.7266L27.1021 19.9856L26.0763 17.5964C25.2175 17.8753 24.2871 18.0882 23.3164 18.235C22.2575 18.3854 21.0519 18.4717 19.6811 18.4717C19.3453 18.4717 19.0223 18.4662 18.7067 18.457C16.7946 18.3671 14.921 18.0551 13.3062 17.5413L12.2565 19.9856L11.2381 16.6899C11.0124 16.5706 10.794 16.4476 10.5903 16.3173C8.82681 15.075 8.46163 13.7079 8.40658 13.4437C8.40291 13.429 8.39924 13.4143 8.39741 13.3978C7.99003 15.6953 8.08728 17.6918 8.56256 19.3966C9.34429 22.6244 11.2894 24.4136 13.341 25.3972C15.1999 26.4285 17.3763 26.9386 19.56 26.9386C21.4336 26.9386 23.3109 26.5643 24.9973 25.8229ZM11.487 12.8315C11.487 13.4503 11.2778 13.9515 11.019 13.9515C10.7603 13.9515 10.5511 13.4503 10.5511 12.8315C10.5511 12.2128 10.7603 11.7115 11.019 11.7115C11.2778 11.7115 11.487 12.2128 11.487 12.8315ZM24.6436 11.7095C24.3849 11.7095 24.1757 12.2107 24.1757 12.8295C24.1757 13.4483 24.3849 13.9495 24.6436 13.9495C24.9023 13.9495 25.1115 13.4483 25.1115 12.8295C25.1115 12.2107 24.9023 11.7095 24.6436 11.7095ZM19.3115 23.8824C19.8638 23.6349 21.0089 23.243 22.1686 23.6349C23.0163 23.9216 23.7191 24.5858 24.2678 25.5923C22.8255 26.2049 21.2346 26.5349 19.5868 26.5349C17.805 26.5349 16.1168 26.1554 14.625 25.4479C15.0984 24.9199 16.1829 23.8824 17.4912 23.802C18.4032 23.7463 19.2711 24.1629 20.0749 25.0437C20.1464 25.122 20.262 25.122 20.3336 25.0395C20.4033 24.9591 20.4033 24.8292 20.3299 24.7487C20.0015 24.3898 19.662 24.1011 19.3115 23.8824Z"
                fill="#F0F0F0"
              />
            </svg>
          </Link>
          <Link href="/dashboard">
            <p>Dashboard</p>
            <div
              className={
                router.pathname === "/dashboard"
                  ? "h-1 rounded-full bg-gradient-to-r from-buttonStart to-buttonEnd"
                  : "h-1 rounded-full"
              }
            ></div>
          </Link>
          <Link href="/markets">
            <p>Markets</p>
            <div
              className={
                router.pathname === "/markets"
                  ? "h-1 rounded-full bg-gradient-to-r from-accent to-secondary"
                  : "h-1 rounded-full"
              }
            ></div>
          </Link>
          <Link href="https://phantazm.gitbook.io/" target="_blank">
            <p className="text-disabled">Docs</p>
            <div className="h-1 rounded-full"></div>
          </Link>
        </div>
        <div className="sm:hidden" onClick={() => setNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M9 12H27M9 18H27M9 24H27"
              stroke="#F0F0F0"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <ConnectWallet />
      </div>
    </>
  );
}
