// --- Admin

export const adminDeleteToken = (symbol: string) => {
  return `Delete!
Token (${symbol}) will be deleted`;
};

// --- OrderListItem BuyTarget

export const deleteBuyTarget = (symbol: string) => {
  return `Delete!
(${symbol}) Target will be deleted`;
};

// --- OrderListItem EditMenu

export const editMenuDeleteBtn = (id: number) => {
  return `Delete!
Order ${id} will be deleted`;
};

export const editMenuArchiveBtn = (id: number) => {
  return `Archive!
Order ${id} will be archived`;
};

// --- Strategy

export const closeTrades = (orderInfo: string) => {
  return `Close!
${orderInfo} orders will be closed`;
};

export const recoverTrade = (id: number) => {
  return `Recover!
${id}`;
};

export const deleteTradeHistoryElement = (id: number) => {
  return `Delete!
Trade ${id} will be deleted`;
};
