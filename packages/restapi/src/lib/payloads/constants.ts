export interface ChainIdToSourceType {
  [key: number]: string;
}

export const CHAIN_ID_TO_SOURCE: ChainIdToSourceType = {
  1: 'ETH_MAINNET',
  5: 'ETH_TEST_GOERLI',
  137: 'POLYGON_MAINNET',
  80001: 'POLYGON_TEST_MUMBAI',
  56: 'BSC_MAINNET',
  97: 'BSC_TESTNET',
  10: 'OPTIMISM_MAINNET',
  420: 'OPTIMISM_TESTNET',
};

export const SOURCE_TYPES = {
  ETH_MAINNET: 'ETH_MAINNET',
  ETH_TEST_GOERLI: 'ETH_TEST_GOERLI',
  POLYGON_MAINNET: 'POLYGON_MAINNET',
  POLYGON_TEST_MUMBAI: 'POLYGON_TEST_MUMBAI',
  BSC_MAINNET: 'BSC_MAINNET',
  BSC_TESTNET: 'BSC_TESTNET',
  OPTIMISM_MAINNET: 'OPTIMISM_MAINNET',
  OPTIMISM_TESTNET: 'OPTIMISM_TESTNET',
  THE_GRAPH: 'THE_GRAPH',
  PUSH_VIDEO: 'PUSH_VIDEO',
};

export enum IDENTITY_TYPE {
  MINIMAL = 0,
  IPFS = 1,
  DIRECT_PAYLOAD = 2,
  SUBGRAPH = 3,
}

export enum NOTIFICATION_TYPE {
  BROADCAST = 1,
  TARGETTED = 3,
  SUBSET = 4,
}
