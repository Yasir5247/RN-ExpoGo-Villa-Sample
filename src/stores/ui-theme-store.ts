import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { colorScheme } from 'nativewind';
import { Appearance } from 'react-native';
import type { Theme } from '@react-navigation/native';
import { DarkTheme, LightTheme } from '@/lib/theme';
import { AppearanceMode, PVoid, UIAppearance } from './types';
// import * as Updates from "expo-updates";


export class UIThemeStore {
  isSystemAppearance = false;
  appearance: AppearanceMode = "light";
  systemColorScheme: AppearanceMode | null = Appearance.getColorScheme() || 'light';
  private appearanceListener: any = null;

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

  // Get React Navigation theme based on current appearance
  get navigationTheme(): Theme {
    if (this.isSystemAppearance) {
      return this.systemColorScheme === 'dark' ? DarkTheme : LightTheme;
    }
    return this.appearance === 'dark' ? DarkTheme : LightTheme;
  }

  // Get the current effective appearance mode (resolves System to actual mode)
  get effectiveAppearance(): AppearanceMode {
    if (this.isSystemAppearance) {
      return this.systemColorScheme || 'light';
    }
    return this.appearance;
  }

  private setupAppearanceListener = () => {
    // Clean up existing listener if any
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }

    // Listen to system appearance changes
    this.appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.systemColorScheme = colorScheme || 'light';
    });
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
    
    // Setup appearance listener
    this.setupAppearanceListener();
  }

  // Cleanup method
  dispose = () => {
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }
  };

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}

