const AccountSnapshotSection = () => {
  return (
    <section className="dashboard account-snapshot">
      <ul className="snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Strategy</span>
            <span className="content-value">2</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Token</span>
            <span className="content-value">29</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Deposit</span>
            <span className="content-value">27384</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Profit</span>
            <span className="content-value">3985</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default AccountSnapshotSection;
