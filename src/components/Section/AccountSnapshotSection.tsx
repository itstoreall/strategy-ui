const AccountSnapshotSection = () => {
  return (
    <section className="section account-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Tokens</span>
            <span className="content-value">49</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Orders</span>
            <span className="content-value">283</span>
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
