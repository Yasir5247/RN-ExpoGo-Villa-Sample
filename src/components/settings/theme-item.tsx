import React from 'react';
import { observer } from 'mobx-react-lite';

import type { OptionType } from '@/components/ui';
import { Options, useModal } from '@/components/ui';
import { translate } from '@/lib';
import { useStores } from '@/stores';
import type { AppearanceMode } from '@/stores/types';

import { Item } from './item';

export const ThemeItem = observer(() => {
  const { uiTheme } = useStores();
  const modal = useModal();

  const onSelect = React.useCallback(
    (option: OptionType) => {
      uiTheme.setSelectedTheme(option.value as AppearanceMode);
      modal.dismiss();
    },
    [uiTheme, modal]
  );

  const themes = React.useMemo(
    () => [
      { label: `${translate('settings.theme.dark')} 🌙`, value: 'dark' },
      { label: `${translate('settings.theme.light')} 🌞`, value: 'light' },
      { label: `${translate('settings.theme.system')} ⚙️`, value: 'system' },
    ],
    []
  );

  const theme = React.useMemo(
    () => themes.find((t) => t.value === uiTheme.selectedTheme),
    [uiTheme.selectedTheme, themes]
  );

  return (
    <>
      <Item
        text="settings.theme.title"
        value={theme?.label}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </>
  );
});
