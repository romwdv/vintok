const Filtres = ({ sortDesc, setSortDesc }) => {
  return (
    <section className="filtres">
      <button
        onClick={() => {
          !sortDesc ? setSortDesc(true) : setSortDesc(false);
        }}
      >
        Desc
      </button>
    </section>
  );
};

export default Filtres;
