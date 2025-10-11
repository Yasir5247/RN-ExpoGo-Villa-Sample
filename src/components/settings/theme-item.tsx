import React from 'react';
import { observer } from 'mobx-react-lite';

import type { OptionType } from '@/components/ui';
import { Options, useModal } from '@/components/ui';
import { translate } from '@/lib';
import { useStores } from '@/stores';
import type { UIAppearance } from '@/stores/types';

import { Item } from './item';

export const ThemeItem = observer(() => {
  const { uiTheme } = useStores();
  const modal = useModal();

  const onSelect = React.useCallback(
    (option: OptionType) => {
      uiTheme.setSelectedTheme(option.value as UIAppearance);
      modal.dismiss();
    },
    [uiTheme, modal]
  );

  // translate() is already reactive to language changes
  const themes = [
    { label: `${translate('settings.theme.dark')} 🌙`, value: 'Dark' },
    { label: `${translate('settings.theme.light')} 🌞`, value: 'Light' },
    { label: `${translate('settings.theme.system')} ⚙️`, value: 'System' },
  ];

  const theme = themes.find((t) => t.value === uiTheme.selectedTheme);

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
