export const formatCurrency = (currency) => {
  return currency.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
