import "../styles/SearchBar.css";

function SearchBar({
  search,
  setSearch,
  metier,
  setMetier,
}) {
  return (
    <section className="search-section">

      <h2>Trouvez votre artisan</h2>

      <div className="search-box">

        <input
          type="text"
          placeholder="🔎 Rechercher un artisan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={metier}
          onChange={(e) => setMetier(e.target.value)}
        >
          <option value="">Tous les métiers</option>
          <option value="Plombier">Plombier</option>
          <option value="Peintre">Peintre</option>
          <option value="Électricien">Électricien</option>
          <option value="Menuisier">Menuisier</option>
        </select>

        <button>
          Rechercher
        </button>

      </div>

    </section>
  );
}

export default SearchBar;