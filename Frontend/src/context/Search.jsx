import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  // authprovider ki help se state ko kahi se access kr payege
  const [search, setSearch] = useState({ keyworf: null, result: [] });
  // default axios
  // axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};
// custom hook

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
