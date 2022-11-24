import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ExternalLink from '../../Generics/redesign/Link/ExternalLink';
import {
  WalletBackgroundId,
  WALLET_BACKGROUNDS,
} from '../../assets/images/wallets';
import {
  walletDescription,
  title,
  walletContainer,
  walletTitle,
  walletImage,
  walletDetails,
  advancedOptionsLink,
  advancedOptions,
  advancedOptionsDescription,
} from './WalletSettings.css';
import LineLabelSettings from '../../Generics/redesign/LabelSetting/LabelSettings';
import { Toggle } from '../../Generics/redesign/Toggle/Toggle';
import DropdownLink from '../../Generics/redesign/Link/DropdownLink';

export const WalletSettings = () => {
  const { t: tGeneric } = useTranslation('genericComponents');
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>();

  const wallets = [
    {
      walletId: 'metamask',
      walletName: 'Metamask',
    },
    {
      walletId: 'coinbase',
      walletName: 'Coinbase',
    },
    {
      walletId: 'brave',
      walletName: 'Brave',
    },
    {
      walletId: 'tally',
      walletName: 'TallyHo!',
    },
    {
      walletId: 'argent',
      walletName: 'Argent',
    },
  ];

  type WalletProps = {
    walletId: WalletBackgroundId;
    walletName: string;
  };

  const getWalletItem = ({ walletId, walletName }: WalletProps) => {
    return {
      label: (
        <div className={walletContainer}>
          <div
            className={walletImage}
            style={{
              backgroundImage: `url(${WALLET_BACKGROUNDS[walletId]})`,
            }}
          />
          <div className={walletTitle}>{walletName}</div>
        </div>
      ),
      value: (
        <Toggle
          // checked={isOpenOnStartup}
          onChange={(newValue) => {
            console.log(newValue);
          }}
        />
      ),
    };
  };
  return (
    <>
      <div className={walletDescription}>
        Hook up your browser wallet to this node so you can enjoy greater
        security, privacy, and read speeds. Enable your favourite browser
        wallets below to allow access to your node. Don’t forget to add a new
        network in your wallet with the configuration below.
      </div>
      <div className={title}>Wallets</div>
      <LineLabelSettings
        items={[
          {
            sectionTitle: '',
            items: wallets.map((wallet) => {
              return getWalletItem(wallet);
            }),
          },
        ]}
      />
      <div className={advancedOptionsLink}>
        <DropdownLink
          text={`${
            isOptionsOpen ? tGeneric('Hide') : tGeneric('Show')
          } ${tGeneric('advancedOptions')}`}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          isDown={!isOptionsOpen}
        />
      </div>
      {isOptionsOpen && (
        <div className={advancedOptions}>
          <div className={title}>Using a lesser known browser wallet?</div>
          <div className={advancedOptionsDescription}>
            If your wallet of choice is not displayed in the list above you can
            select the browser used for the extension and provide the extension
            ID to allow access.{' '}
            <ExternalLink
              url="http://google.com"
              text={tGeneric('LearnMore')}
              inline
              hideIcon
            />
          </div>
        </div>
      )}
      <div className={walletDetails}>
        <div className={title}>Details for your new wallet network</div>
        <LineLabelSettings
          items={[
            {
              sectionTitle: '',
              items: [
                {
                  label: 'Network Name',
                  value: 'Ethereum Mainnet (NiceNode)',
                },
                {
                  label: 'New RPC URL',
                  value: 'http://localhost:8080',
                },
                {
                  label: 'Chain ID',
                  value: '1',
                },
                {
                  label: 'Currency Symbol',
                  value: 'ETH',
                },
                {
                  label: 'Block explorer',
                  value: 'https://etherscan.io',
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};
