const Copyirght = () => {
  return (
    <div className="copyright">
      <div className="copyright-content">
        <span className="copyright-title">
          Powered by{' '}
          <a href={'https://itstoreall.github.io/middle'} target="_blank">
            Serhii Statislav
          </a>
        </span>
        <span className="copyright-symbol">&copy;</span>
        <time className="copyright-time">{new Date().getFullYear()}</time>
      </div>
    </div>
  );
};

export default Copyirght;
