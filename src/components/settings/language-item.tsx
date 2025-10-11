import * as React from 'react';
import { observer } from 'mobx-react-lite';

import type { OptionType } from '@/components/ui';
import { Options, useModal } from '@/components/ui';
import { translate } from '@/lib';
import { useStores } from '@/stores';
import type { Language } from '@/lib/i18n/resources';

import { Item } from './item';

export const LanguageItem = observer(() => {
  const { uiLanguage } = useStores();
  const modal = useModal();
  const onSelect = React.useCallback(
    (option: OptionType) => {
      uiLanguage.setLanguage(option.value as Language);
      modal.dismiss();
    },
    [uiLanguage, modal]
  );

  const langs = React.useMemo(
    () => [
      { label: translate('settings.english'), value: 'en' },
      { label: translate('settings.arabic'), value: 'ar' },
    ],
    [uiLanguage.language]
  );

  const selectedLanguage = React.useMemo(
    () => langs.find((lang) => lang.value === uiLanguage.language),
    [uiLanguage.language, langs]
  );

  return (
    <>
      <Item
        text="settings.language"
        value={selectedLanguage?.label}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
      />
    </>
  );
});
