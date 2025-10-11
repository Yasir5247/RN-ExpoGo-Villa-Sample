import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { AppearanceMode, PVoid, UIAppearance } from './types';
import * as Updates from "expo-updates";

export type ColorSchemeType = 'light' | 'dark' | 'system';

export class UIThemeStore {
  isSystemAppearance = false;
  appearance: AppearanceMode = "light";

  setAppearanceMode = async (v: UIAppearance): Promise<void> => {
    this.isSystemAppearance = v === "System";
    this.appearance = this.appearanceFromUIToInternal(v);
    await Updates.reloadAsync();
  };

  get appearanceName(): UIAppearance {
    return this.isSystemAppearance
      ? "System"
      : this.appearanceFromInternalToUI(this.appearance);
  }

  private appearanceFromInternalToUI = (v: AppearanceMode): UIAppearance => {
    return v === "light" ? "Light" : "Dark";
  };

  private appearanceFromUIToInternal = (v: UIAppearance): AppearanceMode => {
    return v === "Light" ? "light" : "dark";
  };

  // Alias methods for consistency with existing hooks
  get selectedTheme(): ColorSchemeType {
    if (this.isSystemAppearance) return 'system';
    return this.appearance;
  }

  setSelectedTheme = (theme: ColorSchemeType): void => {
    if (theme === 'system') {
      this.isSystemAppearance = true;
    } else {
      this.isSystemAppearance = false;
      this.appearance = theme;
    }
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UITheme",
      properties: [
        "isSystemAppearance",
        "appearance",
      ],
      debugMode: false,
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}

