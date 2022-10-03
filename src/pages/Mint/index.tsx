import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { toast } from 'react-toastify';
import './style.css';
import { CONTRACT_ADDRESS } from '../../constant';
import NFT_INFO from '../../artifacts/contracts/BasicIslandGenesis.sol/BasicIslandGenesis.json';
import { attatchAnim } from '../../utils/anim';

const Mint = () => {
  const [mintCount, setMintCount] = useState<number>(1);
  const [totalMinted, setTotalMinted] = useState<number>(0);
  const [mintOpen, setMintOPen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { account, library, active } = useWeb3React();

  const increase = () => {
    if (mintCount < 2) setMintCount(mintCount + 1);
  };
  const decrease = () => {
    if (mintCount > 1) setMintCount(mintCount - 1);
  };
  const isMintOpen = async () => {
    if (active) {
      const nftContract = new Contract(
        CONTRACT_ADDRESS || '',
        NFT_INFO.abi,
        library.getSigner(),
      );
      const open = await nftContract.getState();
      setMintOPen(open);
    } else {
      toast.warning(
        "Wallet is not connected or you won't be able to do anything here",
      );
    }
  };
  const getMintedTotal = async () => {
    if (active) {
      const nftContract = new Contract(
        CONTRACT_ADDRESS || '',
        NFT_INFO.abi,
        library.getSigner(),
      );
      const total = await nftContract.totalAmountMinted();
      setTotalMinted(Number(total));
    } else {
      toast.warning(
        "Wallet is not connected or you won't be able to do anything here",
      );
    }
  };
  const mint = async (e: any) => {
    try {
      if (account) {
        setLoading(true);
        const nftContract = new Contract(
          CONTRACT_ADDRESS || '',
          NFT_INFO.abi,
          library.getSigner(),
        );
        const nftPrice = await nftContract._mintPrice();
        if (mintOpen) {
          const res = await nftContract.mint(mintCount, {
            value: nftPrice.mul(mintCount),
          });
          res.wait().then(() => {
            setLoading(false);
            toast.success('Successfully Minted');
            attatchAnim(e);
            getMintedTotal();
          });
        } else {
          toast.error('Mint Closed');
        }
      } else {
        toast.error('Wallet is not connected');
      }
    } catch (error: any) {
      toast.error('You exceeded maximum number in your wallet.');
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (active) {
        getMintedTotal();
        isMintOpen();
      }
    }, 2000);
  }, [active]);

  return (
    <>
      <div className="flex flex-row justify-center items-center px-xxl py-sm">
        <div className="flex flex-col w-2/4 pr-xsl">
          <div className="flex pb-md">
            <p className="text-5xl text-left leading-gsm">
              <span className="text-yellow-heavy">Mint</span> unique NFTs and
              trade them in short or long position to increase your reward.
            </p>
          </div>
          <div className="flex flex-row justify-center pb-md">
            <div className="flex flex-row justify-between items-center bg-input bg-no-repeat bg-full p-input w-2/3">
              <span className="pl-xs">Maximum 2: </span>
              <input
                type="number"
                min={1}
                max={5}
                value={mintCount}
                className="text-center border-0 bg-black outline-none w-1/3 mint-input"
              />
            </div>
            <div className="flex flex-row justify-center item-center w-1/3">
              <button
                className="text-4xl bg-decrease bg-no-repeat bg-full w-2/4"
                onClick={decrease}
              >
                -
              </button>
              <button
                className="text-4xl bg-increase bg-no-repeat bg-full w-2/4 ml-nxsm"
                onClick={increase}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center pb-sm">
            <div className="flex flex-row justify-center items-center">
              <img src="/images/rocket.png" alt="Mint" />
              <span>Minted: {totalMinted} / 500</span>
            </div>
            <button
              className={`text-smm bg-yellow-heavy rounded-2xl p-normal-button min-w-button-mint w-2/5}`}
              type="button"
              disabled={loading}
              id="mint"
              onClick={(e: any) => {
                mint(e);
              }}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="loader"></div>
                  <span>Waiting...</span>
                </div>
              ) : (
                'Mint'
              )}
            </button>
          </div>
        </div>
        <div className="p-8">
          <img
            className="border-xs border-blue-light rounded-2xl"
            src="/images/genisCard.gif"
            alt="Membership NFT"
          />
        </div>
      </div>
    </>
  );
};

export default Mint;
