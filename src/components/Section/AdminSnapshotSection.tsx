type Props = {
  usersNumber: number;
  tokensNumber: number;
};

const AdminSnapshotSection = (props: Props) => {
  const { usersNumber, tokensNumber } = props;

  return (
    <section className="section account-snapshot">
      <ul className="section-content snapshot-list">
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Users</span>
            <span className="content-value">{usersNumber}</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Tokens</span>
            <span className="content-value">{tokensNumber}</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Empty</span>
            <span className="content-value">0</span>
          </div>
        </li>
        <li className="snapshot-item">
          <div className="item-content">
            <span className="content-name">Empty</span>
            <span className="content-value">0</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default AdminSnapshotSection;
