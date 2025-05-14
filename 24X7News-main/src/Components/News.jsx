import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes, { number } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
 const capitalizeFirstLetter=(val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=872f8c0ec0734318b0131f64bb0cad82&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(55);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {  // replace componentDidMount()
    updateNews();
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    //eslint-disable-next-line
  }, [])
  
  const handlePrevClick = async () => {
    setPage(page-1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page+1);
    updateNews();
  };

  const fetchMoreData = async() => {
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=872f8c0ec0734318b0131f64bb0cad82&page=${page+1}&pagesize=${props.pageSize}`;
   setPage(page+1);
   let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px",marginTop:"90px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row">
          {
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.name}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      !element.urlToImage
                        ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/XDDSARTHAHHNUTIHUTCYQGLPVM.jpg&w=1440"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                  
                </div>
              );
            })}
            </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
      </div>
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress:PropTypes.func
};

export default News;
