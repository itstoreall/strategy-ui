/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
/*
import { RiExchangeDollarLine } from 'react-icons/ri';
*/
import { IoMdTrash } from 'react-icons/io';
import { HiMiniXMark } from 'react-icons/hi2';
import { HistoryEntry } from '@/src/types';
import { normalizeKyivDate } from '@/src/utils';
import Button from '@/src/components/Button/Button';
import useModal from '@/src/hooks/useModal';

type Props = {
  symbol: string;
  strategyData: string;
  deleteTradeHistoryElement: (tradeId: number) => void;
};

type Trade = { d: number; a: number; b: number; s: number };
type ListItemProps = { trade: Trade };

const c = {
  turnover: 'Turnover:',
  profit: 'Profit:',
  id: 'ID:',
  amount: 'Amount',
  avg: 'Buy (AVG):',
  sell: 'Sell:',
  date: 'Date:',
  noHistory: 'No history!',
};

const StrategyHistoryModalSection = (props: Props) => {
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [totalTurnover, setTotalTurnover] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [isScrollable, setIsScrollable] = useState(false);

  const { symbol, strategyData, deleteTradeHistoryElement } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useModal();

  // ---

  useEffect(() => {
    if (strategyData) {
      const { history } = JSON.parse(strategyData);
      history.sort((x: { d: number }, y: { d: number }) => y.d - x.d);
      setHistory(history);
      //
      const { turnover, profit } = calculateGeneralValues(history);
      setTotalTurnover(turnover);
      setTotalProfit(profit);
    }
  }, [strategyData]);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        const ulHeight = contentRef.current.offsetHeight;
        const maxHeight = window.innerHeight;
        setIsScrollable(ulHeight > maxHeight);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [history]);

  // ---

  /*
  const d = [
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161742,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161743,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161744,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161745,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161746,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161747,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161748,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161749,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161750,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161751,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161752,
      s: 118058,
    },
    {
      a: 0.002625,
      b: 110297,
      d: 1753544161753,
      s: 118058,
    },
  ];
  // */

  const getTradeValues = (trade: Trade) => {
    const amount = trade.a;
    const avg = trade.b;
    const sell = trade.s;
    const invested = amount * trade.b;
    const sold = amount * trade.s;
    const profit = sold - invested;
    return { amount, avg, sell, invested, sold, profit };
  };

  const calculateGeneralValues = (history: HistoryEntry[]) => {
    let turnover = 0;
    let profit = 0;
    for (let i = 0; i < history.length; i++) {
      const trade = history[i];
      const { invested, profit: elementProfit } = getTradeValues(trade);
      profit += elementProfit;
      turnover += invested;
    }
    return { profit, turnover };
  };

  const HistoryListItem = ({ trade }: ListItemProps) => {
    /*
    const recoverTrade = (id: number) => {
      if (confirm(confirmMsg.recoverTrade(id))) {
        console.log('recover...');
      }
    };
    */

    return (
      <li className="strategy-history-modal-list-item">
        <div className="strategy-history-list-item-controls-block">
          {/* <Button
            className="strategy-history-list-item-button"
            clickContent={() => recoverTrade(trade.d)}
          >
            <RiExchangeDollarLine size={22} fill="black" />
          </Button> */}
          <Button
            className="strategy-history-list-item-button"
            clickContent={() => deleteTradeHistoryElement(trade.d)}
          >
            <IoMdTrash size={22} fill="black" />
          </Button>
        </div>
        <div className="strategy-history-list-item-content-block">
          <span className="strategy-history-list-item-content">
            <span>{c.id}</span>
            <span>{trade.d}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{`${c.amount} (${symbol}):`}</span>
            <span>{trade.a}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{c.avg}</span>
            <span>{`${trade.b} $`}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{c.sell}</span>
            <span>{`${trade.s} $`}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{c.profit}</span>
            <span>{`${getTradeValues(trade).profit.toFixed(2)} $`}</span>
          </span>
          <span className="strategy-history-list-item-content">
            <span>{c.date}</span>
            <span>{normalizeKyivDate(trade.d, 'DD-MM-YY HH:mm')}</span>
          </span>
        </div>
      </li>
    );
  };

  // console.log('history:', history);

  return (
    <section
      className={`section strategy-history-modal${
        isScrollable ? '-scrollable' : ''
      }`}
    >
      <div className="strategy-history-modal-heading">
        <div className="strategy-history-modal-heading-content">
          <div className="strategy-history-modal-heading-calc-block">
            <span className="strategy-history-modal-heading-calc-box">
              <span>{c.turnover}</span>
              <span>
                <span>{totalTurnover.toFixed(2)}</span>
              </span>
            </span>
            <span className="strategy-history-modal-heading-calc-box">
              <span>{c.profit}</span>
              <span>
                <span>{totalProfit.toFixed(2)}</span>
              </span>
            </span>
          </div>

          <Button
            className="strategy-history-modal-heading-button"
            clickContent={closeModal}
          >
            <HiMiniXMark size={30} fill="black" />
          </Button>
        </div>
      </div>
      <div
        ref={contentRef}
        className={'section-content strategy-history-modal'}
      >
        {history ? (
          <>
            <ul className={'strategy-history-modal-list'}>
              {/* {d.map((el, idx) => { */}
              {history.map((el, idx) => {
                return <HistoryListItem key={idx} trade={el} />;
              })}
            </ul>
          </>
        ) : (
          <div>{c.noHistory}</div>
        )}
      </div>
    </section>
  );
};

export default StrategyHistoryModalSection;
