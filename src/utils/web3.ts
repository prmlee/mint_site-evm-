export const shortenAddr = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-4)}`;

export const chainIdToHexString = (chainId: number | null) =>
  chainId && `0x${chainId.toString(16)}`;
