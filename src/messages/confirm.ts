// --- Admin

export const deleteTokenAdmin = (symbol: string) => {
  return `Delete!
Token (${symbol}) will be deleted`;
};

// --- OrderListItem BuyTarget

export const deleteBuyTarget = (symbol: string) => {
  return `Delete!
(${symbol}) Target will be deleted`;
};

// --- OrderListItem EditMenu

export const deleteEditMenuBtn = (id: number) => {
  return `Delete!
Order ${id} will be deleted`;
};

export const archiveEditMenuBtn = (id: number) => {
  return `Archive!
Order ${id} will be archived`;
};
