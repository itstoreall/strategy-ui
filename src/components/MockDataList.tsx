const MockDataList = ({ items }: { items: number }) => (
  <ul>
    {[...Array(items)].map((_, index) => (
      <li key={index}>{index + 1}</li>
    ))}
  </ul>
);

export default MockDataList;
