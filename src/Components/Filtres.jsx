import { FaSortUp, FaSortDown } from "react-icons/fa";

const Filtres = ({ sortDesc, setSortDesc }) => {
  return (
    // <section className="filtres">
    <div className="sort-price">
      <span
        onClick={() => {
          !sortDesc ? setSortDesc(true) : setSortDesc(false);
        }}
      >
        Classer les prix
      </span>
      {sortDesc ? <FaSortUp size={20} /> : <FaSortDown size={20} />}
    </div>
    // </section>
  );
};

export default Filtres;
