// --- Admin

export const adminTokenDeleteSuccess = () => {
  return `Success!
Token successfully deleted`;
};

export const adminTokenDeleteError = () => {
  return `Error!
Token deletion error`;
};

// --- Snapshop Dashboard

export const snapshopDashboardDeposit = (a: number, l: string) => {
  return `Deposit:
Actual: $${a} 
Losses: $${+l > 0 ? l : 0}`;
};

export const snapshopDashboardUnrelized = (u: number) => {
  return `Unrealized: $${u}`;
};
