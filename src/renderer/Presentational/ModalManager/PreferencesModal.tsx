import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ThemeSetting } from 'main/state/settings';
import electron from '../../electronGlobal';
import PreferencesWrapper from '../Preferences/PreferencesWrapper';
import { Modal } from '../../Generics/redesign/Modal/Modal';
import { modalOnChangeConfig, ModalConfig } from './modalUtils';

type Props = {
  modalOnClose: () => void;
};

interface MetaElement extends HTMLMetaElement {
  content: ThemeSetting;
}

export const PreferencesModal = ({ modalOnClose }: Props) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({});
  const { t } = useTranslation('genericComponents');
  const modalTitle = t('Preferences');
  const buttonSaveLabel = 'Save changes';

  const handleColorSchemeChange = (colorScheme: ThemeSetting) => {
    const meta = document.querySelector(
      'meta[name="color-scheme"]'
    ) as MetaElement;
    const colorValue = colorScheme === 'auto' ? 'light dark' : colorScheme;
    meta.content = colorValue as ThemeSetting;
  };

  const modalOnSaveConfig = async (updatedConfig: ModalConfig | undefined) => {
    const { theme, isOpenOnStartup, isNotificationsEnabled } =
      updatedConfig || (modalConfig as ModalConfig);

    if (theme) {
      await electron.setThemeSetting(theme);
      handleColorSchemeChange(theme);
    }
    if (isOpenOnStartup !== undefined) {
      await electron.setIsOpenOnStartup(isOpenOnStartup);
    }
    if (isNotificationsEnabled !== undefined) {
      await electron.setIsNotificationsEnabled(isNotificationsEnabled);
    }
    modalOnClose();
  };

  return (
    <Modal
      modalTitle={modalTitle}
      buttonSaveLabel={buttonSaveLabel}
      modalOnSaveConfig={modalOnSaveConfig}
      modalOnClose={modalOnClose}
      modalOnCancel={modalOnClose}
    >
      <PreferencesWrapper
        modalOnChangeConfig={(config, save) => {
          modalOnChangeConfig(
            config,
            modalConfig,
            setModalConfig,
            save,
            modalOnSaveConfig
          );
        }}
      />
    </Modal>
  );
};
