export type UIAppearance = "System" | "Light" | "Dark";
export type AppearanceMode = "light" | "dark";

export type AppearanceAction = {
  name: UIAppearance;
};

export type Language = "en" | "dh";
export type UILanguage = "English" | "Dhivehi";

export type PVoid = Promise<void>;
export interface IService {
  init?: () => PVoid;
}

export interface IStore {
  hydrate?: () => PVoid;
}