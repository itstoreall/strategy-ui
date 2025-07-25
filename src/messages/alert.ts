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

export const dashboardSnapshopDeposit = (a: string, l: string) => {
  return `Deposit:
Actual: $${a} 
Losses: $${+l > 0 ? l : 0}`;
};

export const dashboardSnapshopUnrelized = (u: number) => {
  return `Unrealized: $${u}`;
};
