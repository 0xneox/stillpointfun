import { useState } from "react";

export function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = () => {
    // Placeholder for actual wallet connection - will add Solana wallet adapter after npm install
    setIsConnected(true);
    setWalletAddress("0x7a3...f2c");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  return (
    <button
      onClick={isConnected ? disconnectWallet : connectWallet}
      className="px-6 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border hover:border-foreground"
      style={{
        backgroundColor: isConnected ? "var(--accent)" : "transparent",
        color: isConnected ? "var(--accent-foreground)" : "var(--foreground)",
      }}
    >
      {isConnected ? walletAddress : "Connect Wallet"}
    </button>
  );
}
