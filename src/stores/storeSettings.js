import { defineStore } from "pinia";
import { Dark, LocalStorage } from "quasar";
import { reactive, watch } from "vue";

export const useStoreSettings = defineStore("settings", () => {
  /*
  state
  */
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "$",
    darkMode: false,
  });

  // watch DarkMode
  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value);
    },
    {
      immediate: true,
    }
  );

  // watch Settings
  watch(settings, () => {
    saveSettings();
  });

  /*
  getters
  */

  /*
  actions
  */

  const saveSettings = () => {
    LocalStorage.set("settings", settings);
  };

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem("settings");
    if (savedSettings) Object.assign(settings, savedSettings);
  };

  return {
    // state
    settings,
    // getters
    // actions
    loadSettings,
  };
});
