interface IPanel {
  title?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  classes?: string;
}

const Panel = ({
  title = "",
  isLoading = false,
  children,
  classes = "",
}: IPanel) => {
  return (
    <div className={`${classes} bg-white shadow-md rounded-2xl`}>
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold px-7 pt-5 mb-2">{title}</h2>
            <hr />
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default Panel;
