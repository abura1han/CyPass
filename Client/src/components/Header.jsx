import React, { useContext, useEffect } from "react";
import "../styles/Header.css";
import PageContext from "../contexts/PageContext";

function Header() {
  const { page } = useContext(PageContext);

  useEffect(() => {
    window.document.title = page.name;
  }, [page]);

  return (
    <header className="header">
      <h2>{page.name}</h2>
    </header>
  );
}

export default Header;
