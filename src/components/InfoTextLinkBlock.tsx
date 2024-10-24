type Props = {
  text?: string;
  url: string;
  linkTitle: string;
  className?: string;
};

const InfoTextLinkBlock = (props: Props) => {
  const { text, url, linkTitle, className } = props;

  return (
    <div className={`info-text-link-block ${className}`}>
      <p>
        {text ?? ''}
        <a href={url}>{linkTitle}</a>
      </p>
    </div>
  );
};

export default InfoTextLinkBlock;
