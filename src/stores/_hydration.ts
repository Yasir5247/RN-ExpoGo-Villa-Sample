import { configurePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure persistence to use AsyncStorage
configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: async (key, value) => {
      await AsyncStorage.setItem(key, value);
      return Promise.resolve();
    },
    getItem: async key => {
      const value = await AsyncStorage.getItem(key);
      return Promise.resolve(value);
    },
    removeItem: async key => {
      await AsyncStorage.removeItem(key);
      return Promise.resolve();
    },
  },
});

