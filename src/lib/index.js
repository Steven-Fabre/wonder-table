import React, { useEffect, useState } from "react";
import "./styles/index.css";

/**
 * This package will transform an Array of Objects into wonderful table
 * @constructor
 * @param {Array} list - Array of Objects used as data.
 * @param {number} pageNum - Able to instance page at specific number.
 * @param {string} width - Allow to change the width size of the Table.
 * @param {string} height - Allow to change the height size of the Table.
 */

function Table({ list, pageNum = 0, width = "100%", height = "auto" }) {
  const [colNames, setColNames] = useState([]);
  const [page, setPage] = useState(pageNum);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(list);
  const [order, setOrder] = useState(1);
  const [activeCategorie, setActiveCategorie] = useState(Object.keys(list[0])[0]);

  // Before rendering, the columns names are pulled from the data
  useEffect(() => {
    const NewColName = [];
    list.forEach((object) => {
      Object.keys(object).forEach((key) => {
        if (!NewColName.includes(key)) return NewColName.push(key);
      });
    });
    setColNames(NewColName);
  }, []);

  // Watching for change of the active category to sort data
  useEffect(() => {
    document.querySelectorAll(".cat-btn")?.forEach((el) => {
      el.classList.remove("active");
      el.classList.remove("reverse");
    });
    document.body.querySelector(`${"." + activeCategorie}`)?.classList.add("active");
    if (order === -1) document.body.querySelector(`.active`).classList.add("reverse");
    sortData();
  }, [activeCategorie, order, list]);

  const sortData = () => {
    const newData = data.sort((a, b) => {
      if (!a[activeCategorie]) return -1 * order;
      if (!b[activeCategorie]) return 1 * order;
      return a[activeCategorie].localeCompare(b[activeCategorie]) * order;
    });
    return setData([...newData]);
  };

  const createPageButton = () => {
    if (data.length / pageSize > 1) {
      const res = [];
      for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
        res.push(
          <button key={i} className={page === i ? "page-btn active-page-btn" : "page-btn"} onClick={() => setPage(i)}>
            {i + 1}
          </button>
        );
      }
      return <React.Fragment>{res}</React.Fragment>;
    } else {
      return <button onClick={() => onBack()}>1</button>;
    }
  };

  const switchCategorie = (categorie) => {
    return activeCategorie === categorie ? setOrder(order === 1 ? -1 : 1) : setActiveCategorie(categorie);
  };

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 1 < data.length / pageSize ? page + 1 : page);
  };

  const getFilteredItems = (query) => {
    if (!query) {
      return setData(list);
    } else {
      const newData = [];
      list.forEach((object) => {
        Object.keys(object).forEach((key) => {
          if (object[key].toLowerCase().includes(query)) {
            if (!newData.includes(object)) return newData.push(object);
          }
        });
      });
      setData(newData);
    }
  };
  return (
    <div className="table-container" data-testid="awesome-table">
      <div className="table-header">
        <div>
          Show
          <select data-testid="select" className="select-entries" onChange={(e) => setPageSize(e.target.value)}>
            <option data-testid="select-option" value={10}>
              10
            </option>
            <option data-testid="select-option" value={25}>
              25
            </option>
            <option data-testid="select-option" value={50}>
              50
            </option>
            <option data-testid="select-option" value={100}>
              100
            </option>
          </select>
          entries
        </div>
        <input
          data-testid="search"
          type="text"
          onChange={(e) => getFilteredItems(e.target.value.toLowerCase())}
          placeholder="Search"
        />
      </div>
      {data.length > 0 && (
        <table cellSpacing="0" style={{ width: width, height: height, padding: "5px 10px" }}>
          <thead>
            <tr>
              {colNames.map((headerItem, index) => {
                return (
                  <th
                    data-testid="colName"
                    className={headerItem + " cat-btn th"}
                    key={index}
                    onClick={() => {
                      switchCategorie(headerItem);
                    }}
                  >
                    {(headerItem[0].toUpperCase() + headerItem.slice(1)).replace("_", " ")}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Object.values(data.slice(pageSize * page, pageSize * page + pageSize)).map((obj, index) => (
              <tr className={index % 2 ? "tr-even tr" : "tr-odd tr"} key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="table-footer">
        <p>
          Showing {page * pageSize + 1} to {data.length < pageSize ? data.length : pageSize} of {data.length}
        </p>
        <div className="page-navigation">
          <button data-testid="btn-navigation-back" onClick={onBack}>
            Previous
          </button>
          {createPageButton()}
          <button data-testid="btn-navigation-next" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
