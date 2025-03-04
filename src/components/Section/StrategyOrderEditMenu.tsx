import { FiEdit3 } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import Button from '../Button/Button';

const StrategyOrderEditMenu = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-0.8rem',
        right: '0',
        display: 'flex',
        paddingLeft: '0.3rem',
        backgroundColor: '#000000',
        borderRadius: '0 4px 4px 0',
      }}
    >
      <Button className="strategy-order-edit-menu-button">
        <FiEdit3 size={18} />
      </Button>

      <Button className="strategy-order-edit-menu-button">
        <FiTrash2 size={18} />
      </Button>
    </div>
  );
};

export default StrategyOrderEditMenu;
