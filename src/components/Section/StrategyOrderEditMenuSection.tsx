/*
import { FiEdit3 } from 'react-icons/fi';
*/
import { FiTrash2 } from 'react-icons/fi';
import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useRedirect from '@/src/hooks/useRedirect';
import { QueryKeyEnum } from '@/src/enums';
import Button from '@/src/components/Button/Button';

type Props = { id: number; orderNumber: number };

const StrategyOrderEditMenuSection = ({ id, orderNumber }: Props) => {
  const { updateData } = useInvalidateQueries();

  const redirectTo = useRedirect();

  const removeOrder = async (id: number) => {
    if (!confirm(`Order ${id} will be deleted!`)) return;
    const isDeleted = await deleteOrder(id);
    if (isDeleted) {
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
      if (orderNumber === 1) {
        redirectTo('/dashboard');
      }
    }
  };

  return (
    <section className="strategy-order-edit-menu">
      {/* <Button
        className="strategy-order-edit-menu-button"
        clickContent={() => console.log('edit order!')}
      >
        <FiEdit3 size={18} />
      </Button> */}

      <Button
        className="strategy-order-edit-menu-button"
        clickContent={() => removeOrder(id)}
      >
        <FiTrash2 size={18} />
      </Button>
    </section>
  );
};

export default StrategyOrderEditMenuSection;
