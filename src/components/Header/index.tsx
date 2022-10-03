import { useEffect, useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { chainIdToHexString, shortenAddr } from '../../utils/web3';
import { DEFAULT_NETWORK, networkInfo } from '../../constant';
import { InjectedConnector } from '@web3-react/injected-connector';

const Header = () => {
  const { error, activate, account } = useWeb3React();
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const connectWallet = async () => {
    try {
      await activate(
        new InjectedConnector({ supportedChainIds: [DEFAULT_NETWORK] }),
      );
    } catch (error) {
      console.log('connect', error);
    }
  };

  const changeNetwork = async () => {
    const wallet: any = window;
    const ethereum = wallet.ethereum;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdToHexString(DEFAULT_NETWORK) }],
      });
    } catch (switchError) {
      const error = JSON.parse(JSON.stringify(switchError));
      if (
        error.code === 4902 ||
        (error.code === -32603 && error?.data?.originalError.code === 4902)
      ) {
        try {
          const item = networkInfo[DEFAULT_NETWORK];
          await wallet.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdToHexString(DEFAULT_NETWORK),
                chainName: item.label,
                rpcUrls: [item.rpcUrl],
                nativeCurrency: {
                  name: item.nativeCurrency,
                  symbol: item.nativeCurrency,
                  decimals: 18,
                },
                blockExplorerUrls: [item.explorer],
              },
            ],
          });
          console.log('change network done!');
        } catch (addError) {
          console.log('addError', addError);
        }
      }
    }
  };

  useEffect(() => {
    setWrongNetwork(isUnsupportedChainIdError);
  }, [isUnsupportedChainIdError]);

  useEffect(() => {
    if (wrongNetwork) changeNetwork();
  }, [wrongNetwork]);

  return (
    <div className="flex justify-between items-center pt-6 px-20">
      <img src="images/logo.jpg" alt="Logo" className="w-1/5" />
      <button
        type="button"
        className="border-4 border-yellow-heavy rounded-2xl p-4"
        onClick={connectWallet}
      >
        {account ? `${shortenAddr(account)}` : 'CONNECT WALLET'}
      </button>
    </div>
  );
};

export default Header;
