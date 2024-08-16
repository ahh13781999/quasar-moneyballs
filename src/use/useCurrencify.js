import { useStoreSettings } from "src/stores/storeSettings";

const storeSettings = useStoreSettings()

export function useCurrencify(amount) {
  let posNegSymbol = "";
  if (amount > 0) posNegSymbol = "+";
  else if (amount < 0) posNegSymbol = "-";

  const amountPositive = Math.abs(amount);

  const currencySymbol = storeSettings.settings.currencySymbol,
    amountFormatted = amountPositive.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`;
}
