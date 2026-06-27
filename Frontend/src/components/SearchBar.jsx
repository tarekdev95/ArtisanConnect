import "../styles/SearchBar.css";

function SearchBar({
  search,
  setSearch,
  metier,
  setMetier,
  onSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <section className="search-section">
      <h2>Trouvez votre artisan</h2>

      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="🔎 Rechercher par ville..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={metier}
          onChange={(e) => setMetier(e.target.value)}
        >
          <option value="">Toutes les spécialités</option>
          <option value="Plombier">Plombier</option>
          <option value="Peintre">Peintre</option>
          <option value="Électricien">Électricien</option>
          <option value="Menuisier">Menuisier</option>
        </select>

        <button type="submit">Rechercher</button>
      </form>
    </section>
  );
}

export default SearchBar;
