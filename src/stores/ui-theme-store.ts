import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { colorScheme } from 'nativewind';
import { AppearanceMode, PVoid, UIAppearance } from './types';
// import * as Updates from "expo-updates";


export class UIThemeStore {
  isSystemAppearance = false;
  appearance: AppearanceMode = "light";

  setAppearanceMode = async (v: UIAppearance): Promise<void> => {
    this.isSystemAppearance = v === "System";
    this.appearance = this.appearanceFromUIToInternal(v);
    // await Updates.reloadAsync();
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
  get selectedTheme(): UIAppearance {
    if (this.isSystemAppearance) return 'System';
    return this.appearanceFromInternalToUI(this.appearance);
  }

  setSelectedTheme = (theme: UIAppearance): void => {
    if (theme === 'System') {
      this.isSystemAppearance = true;
    } else {
      this.isSystemAppearance = false;
      this.appearance = this.appearanceFromUIToInternal(theme);
    }
    
    // Sync with NativeWind
    const nativeWindTheme = theme === 'System' ? 'system' : theme.toLowerCase() as 'light' | 'dark' | 'system';
    colorScheme.set(nativeWindTheme);
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
    // Restore theme after hydration
    const theme = this.selectedTheme;
    const nativeWindTheme = theme === 'System' ? 'system' : theme.toLowerCase() as 'light' | 'dark' | 'system';
    colorScheme.set(nativeWindTheme);
  };
}

