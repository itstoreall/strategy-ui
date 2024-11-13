import Link from 'next/link';

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
        <Link href={url}>{linkTitle}</Link>
      </p>
    </div>
  );
};

export default InfoTextLinkBlock;
