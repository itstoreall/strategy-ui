type Props = {
  tag?: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
};

const Title = ({ tag, text, className }: Props) => {
  const Tag = tag || 'h1';

  return <Tag className={`title ${className}`}>{text}</Tag>;
};

export default Title;
