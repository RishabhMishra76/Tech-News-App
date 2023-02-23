import React, { useEffect, useRef, useState } from "react";
import classes from "./displayNewsFeed.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import TileData from "../tileData/tileData.component";
import NewsIcon from "../../Assets/newsWhite.svg"

function DisplayNewsFeed() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(10);
  const myDivRef = useRef(null);

  async function getResponse(pg, perPage) {
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://techcrunch.com/wp-json/wp/v2/posts?per_page=${perPage}&_embed=true&page=${pg}`
      );
      const tempData = await response.json();
      setData(tempData);
    } catch (err) {
      console.log("Something went wrong, Try again later." + err);
    }
    setIsFetching(false);
  }

  const handleSelectChange = (event) => {
    setNewsPerPage(event.target.value);
  };

  function scrollToTop() {
    if (myDivRef.current) {
      myDivRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const handleButtonClick = (e, pageDir) => {
    e.preventDefault();
    if (pageDir === "next") {
      setPageNumber(pageNumber + 1);
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  const handlePageSelect = (e, val) => {
    debugger;
    e.preventDefault();
    setPageNumber(val);
  };

  useEffect(() => {
    getResponse(pageNumber, newsPerPage);
    scrollToTop();
  }, [pageNumber, newsPerPage]);

  return (
    <>
      <h1><img className={classes.headerIcon} src={NewsIcon} alt="news-icon"></img>Tech News Nation</h1>
      <div className={classes.container}>
        {isFetching ? (
          <div className={`${classes["linkingBg"]}`}>
            <CircularProgress style={{ color: "inherit" }} size={50} />
          </div>
        ) : (
          <>
            <div id="myDiv" ref={myDivRef} className={classes.tiles}>
              {data?.map((itm) => (
                <TileData key={itm?.title?.rendered} itm={itm} />
              ))}
            </div>
            <div className={classes.footerButtons}>
              {!isFetching && (
                <>
                    <button
                      className={classes.nextButton}
                      disabled={pageNumber <= 1}
                      onClick={(e) => {
                        handleButtonClick(e, "prev");
                      }}
                    >
                      Prev Page
                    </button>

                  {pageNumber - 2 > 0 && (
                    <button
                      className={classes.pageButton}
                      onClick={(e) => {
                        handlePageSelect(e, pageNumber - 2);
                      }}
                    >
                      {pageNumber - 2}
                    </button>
                  )}
                  {pageNumber - 1 > 0 && (
                    <button
                      className={classes.pageButton}
                      onClick={(e) => {
                        handlePageSelect(e, pageNumber - 1);
                      }}
                    >
                      {pageNumber - 1}
                    </button>
                  )}
                  <button
                    className={classes.pageButtonSelected}
                    onClick={(e) => {
                      handlePageSelect(e, pageNumber);
                    }}
                  >
                    {pageNumber}
                  </button>
                  <button
                    className={classes.pageButton}
                    onClick={(e) => {
                      handlePageSelect(e, pageNumber + 1);
                    }}
                  >
                    {pageNumber + 1}
                  </button>
                  <button
                    className={classes.pageButton}
                    onClick={(e) => {
                      handlePageSelect(e, pageNumber + 2);
                    }}
                  >
                    {pageNumber + 2}
                  </button>

                  <button
                    className={classes.nextButton}
                    onClick={(e) => {
                      handleButtonClick(e, "next");
                    }}
                  >
                    Next Page
                  </button>
                </>
              )}
            </div>
            <div className={classes.paginationSelector}>
              <select value={newsPerPage} onChange={handleSelectChange}>
                <option value={10}>10/Page</option>
                <option value={20}>20/Page</option>
                <option value={30}>30/Page</option>
                <option value={40}>40/Page</option>
                <option value={50}>50/Page</option>
              </select>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DisplayNewsFeed;
