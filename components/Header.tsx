import React from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <header>
      <div className="inner-column">
        <div className="mast-head">
          <picture className="site-logo">
            <img src="/images/logo-icon.svg" alt="" />
          </picture>

          <ul className="site-nav">
            <li>
              <Link className="text" href="/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <Link className="text" href="/markets">
                Markets
              </Link>
            </li>
            {/* <li>
              <Link className="text" href="/stake">
                Stake
              </Link>
            </li> */}
            <li>
              <ConnectWallet />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
