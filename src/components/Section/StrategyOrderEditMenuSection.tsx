/*
import { FiEdit3 } from 'react-icons/fi';
*/
import { FiTrash2 } from 'react-icons/fi';
import { FiArchive } from 'react-icons/fi';
import { Order } from '@/src/types';
import Button from '@/src/components/Button/Button';

type Props = {
  isDCAPlus: boolean;
  order: Order;
  archiveOrder: (order: Order) => void;
  removeOrder: (id: number) => void;
};

const StrategyOrderEditMenuSection = (props: Props) => {
  const { isDCAPlus, order, archiveOrder, removeOrder } = props;

  return (
    <section className="strategy-order-edit-menu">
      {/* <Button
        className="strategy-order-edit-menu-button"
        clickContent={() => console.log('edit order!')}
      >
        <FiEdit3 size={18} />
      </Button> */}

      {isDCAPlus && (
        <Button
          className="strategy-order-edit-menu-button"
          clickContent={() => archiveOrder(order)}
        >
          <FiArchive size={18} />
        </Button>
      )}
      <Button
        className="strategy-order-edit-menu-button"
        clickContent={() => removeOrder(order.id)}
      >
        <FiTrash2 size={18} />
      </Button>
    </section>
  );
};

export default StrategyOrderEditMenuSection;
