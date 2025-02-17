import { useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import { Order } from '@/src/types';
// import { OrderTypeEnum } from '@/src/enums';
import Button from '@/src/components/Button/Button';

type Props = {
  data: Order[];
  removeOrder: (id: number) => void;
};

const OrderListSection = ({ data, removeOrder }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // const isBuy = data[0].type === OrderTypeEnum.Buy;

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  // const headingColor = isBuy ? OrderTypeEnum.Buy : OrderTypeEnum.Sell;
  const displayedData = isExpanded ? data : data.slice(0, 10);

  return (
    <section className="section order-list">
      <div className="section-content order-list">
        {/* <span className={`order-list-header ${headingColor}`} /> */}

        <ul className="section-order-list">
          {displayedData.map((order, idx) => {
            const values = `${order.symbol}: ${order.amount} - ${order.price}`;
            return (
              <li key={idx} onClick={() => removeOrder(order.id)}>
                {/* <li key={idx} onClick={() => console.log(111)}> */}
                {values}
              </li>
            );
          })}
        </ul>

        {data.length > 10 && (
          <div className="toggle-block">
            <Button className="toggle-button" clickContent={toggleList}>
              {isExpanded ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderListSection;
