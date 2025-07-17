/*
import { FiEdit3 } from 'react-icons/fi';
*/
import { FiTrash2 } from 'react-icons/fi';
import { FiArchive } from 'react-icons/fi';
import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useRedirect from '@/src/hooks/useRedirect';
import { TradeStrategy } from '@/src/types';
import { QueryKeyEnum } from '@/src/enums';
import * as u from '@/src/utils';
import * as msg from '@/src/messages/confirm';
import Button from '@/src/components/Button/Button';

type Props = { id: number; symbol: string; orderNumber: number };

const StrategyOrderEditMenuSection = ({ id, symbol, orderNumber }: Props) => {
  const { updateData } = useInvalidateQueries();

  const redirectTo = useRedirect();

  const isBTC = symbol === 'BTC';

  const archiveOrder = (id: number) => {
    if (!confirm(msg.archiveEditMenuBtn(id))) return;
    console.log('archived!');
  };

  const removeOrder = async (id: number) => {
    if (!confirm(msg.deleteEditMenuBtn(id))) return;
    const isDeleted = await deleteOrder(id);
    if (isDeleted) {
      updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
      if (orderNumber === 1) {
        const lsTradeStrategyData = u.getLSTradeStrategyData();
        if (lsTradeStrategyData) {
          const dataWithoutCurrentToken = lsTradeStrategyData.filter(
            (el: TradeStrategy) => el.symbol !== symbol
          );
          u.updateLSTradeStrategyData(dataWithoutCurrentToken);
        }
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

      {isBTC && (
        <Button
          className="strategy-order-edit-menu-button"
          clickContent={() => archiveOrder(id)}
        >
          <FiArchive size={18} />
        </Button>
      )}
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
