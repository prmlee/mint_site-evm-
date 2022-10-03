export const CONTRACT_ADDRESS = '0x4f7D83Aa39b0dD4fa76589B6BC68cb87756481e0';
export const CHAIN_ID = 80001;
export const DEFAULT_NETWORK = Number(CHAIN_ID);
export const supportedChainIds = [80001];
export const networkInfo: any = {
  80001: {
    label: 'Mumbai Testnet',
    rpcUrl:
      'https://polygon-mumbai.g.alchemy.com/v2/qn-ZxsivqSWAF1Nx8uwYkYkjBNfxNYdg',
    nativeCurrency: 'MATIC',
    explorer: 'https://mumbai.polygonscan.com/',
  },
  137: {
    label: 'Polygon Network',
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
    nativeCurrency: 'MATIC',
    explorer: 'https://polygonscan.com/',
  },
};
