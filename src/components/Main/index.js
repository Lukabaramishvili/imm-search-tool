import React, { useState } from "react";
import Search from "../Search";
import Table from "../Table";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <>
      <section className="main-section">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClearSearchTerm={handleClearSearchTerm}
          handleSearchTerm={handleSearchTerm}
        />
        {/* <div>Main Section</div> */}
      </section>
      <Table />
    </>
  );
};

export default Main;
