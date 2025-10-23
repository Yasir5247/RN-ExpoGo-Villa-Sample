export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type PVoid = Promise<void>;
export interface IService {
  init?: () => PVoid;
}

export interface IStore {
  hydrate?: () => PVoid;
}