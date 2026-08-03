export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "SAI Protocol",
    year: "2024-Present",
    description:
      "Sovereign AI Infrastructure for Autonomous Agents. Decentralized infrastructure combining ERC-4337 account abstraction, hardware attestation, and on-chain agent registries. 4 phases complete, 53/53 tests passing.",
    tags: ["AI", "Web3", "TEE", "Solidity"],
    href: "https://github.com/sai-protocol",
  },
  {
    title: "Smart Contracts Development",
    year: "2017-2022",
    description:
      "Developed smart contracts for 7+ cryptocurrencies. Focused on security, efficiency, and decentralized governance mechanisms.",
    tags: ["Crypto", "Solidity", "Security"],
    href: "https://github.com/0xneox",
  },
  {
    title: "Exchange Infrastructure",
    year: "2018-2020",
    description:
      "Designed and implemented orderbook and matching engine for a cryptocurrency exchange. High-frequency trading capabilities.",
    tags: ["Trading", "Infrastructure", "Go"],
    href: "https://github.com/0xneox",
  },
  {
    title: "IQVIA Proof of Concept",
    year: "2019",
    description:
      "Created PoC integrating IPFS, Ethereum, and BigchainDB for pharmaceutical data integrity and supply chain tracking.",
    tags: ["IPFS", "Enterprise", "Blockchain"],
    href: "https://github.com/0xneox",
  },
  {
    title: "On-Chain Analysis",
    year: "2018-2021",
    description:
      "Conducted on-chain analysis for 10+ projects. Transaction pattern analysis, security auditing, and investment research.",
    tags: ["Analysis", "Security", "Research"],
    href: "https://github.com/0xneox",
  },
  {
    title: "Crypto Tax Software",
    year: "2020",
    description:
      "Developed tax computation software for crypto transactions. Automated reporting for complex trading patterns across multiple exchanges.",
    tags: ["FinTech", "Automation", "Python"],
    href: "https://github.com/0xneox",
  },
  {
    title: "NFT Project Collaboration",
    year: "2021",
    description:
      "Collaborated closely with 3 NFT projects. Smart contract development, metadata standards, and marketplace integration.",
    tags: ["NFT", "Web3", "Solidity"],
    href: "https://github.com/0xneox",
  },
];
