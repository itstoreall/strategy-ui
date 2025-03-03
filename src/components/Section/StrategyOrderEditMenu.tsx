const StrategyOrderEditMenu = () => {
  return (
    <div>
      <span
        style={{
          position: 'absolute',
          top: '-0.8rem',
          right: '1rem',
          display: 'flex',
          // justifyContent: 'center',
          gap: '1rem',
          // minWidth: '40px',
          // backgroundColor: 'blue',
        }}
      >
        <span
          style={{
            // right: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '40px',
            backgroundColor: 'red',
          }}
        >
          Ed
        </span>
        <span
          style={{
            // right: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '40px',
            minHeight: '40px',
            backgroundColor: 'blue',
          }}
        >
          De
        </span>
        {/* <span
          style={{
            // right: '1rem',
            display: 'flex',
            gap: '1rem',
            minWidth: '40px',
            backgroundColor: 'red',
          }}
        >
          Sm
        </span> */}
      </span>
    </div>
  );
};

export default StrategyOrderEditMenu;
