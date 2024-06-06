import { SymbolLogo } from "@api3/logos";

export default function SymbolIcon({ symbol }: { symbol: string }) {
  return (
    <picture className={`symbol-icon ${symbol}`}>
      {/* <img src={SymbolLogo(symbol)} width={50} height={50} alt={symbol} /> */}
    </picture>
  );
}
