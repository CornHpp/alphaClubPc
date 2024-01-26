const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>Loading</span>
        </>
      ) : (
        <span>--- no more ---</span>
      )}
    </>
  );
};

export default InfiniteScrollContent;
