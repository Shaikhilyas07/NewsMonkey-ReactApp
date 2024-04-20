import React, {  useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const  News = (props) =>  {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


   
    const capitaliza = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const updateNews = async () =>  {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        // console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.setTotalResults)
        setLoading(false)
        props.setProgress(100);

    }
    useEffect(() => {
     updateNews()
     document.title = `${capitaliza(props.category)} - NewsMonkey`;
     //eslint-disable-next-line

    }, [])
    
    // const  handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews()
    // }
    // const  handleNxtClick = async () => {
    //     setPage(page+1)
    //     updateNews();
    // }
    const  fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
       

    };

        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0",marginTop: '95px' }}>NewsMonkey - Top {`${capitaliza(props.category)}`} HeadLines
                </h1>
                {loading && <Spinner />}


                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className='row'>
                            {articles.map((element) => {
                                return <div key={element.url} className='col-md-4'>
                                    <NewsItem source={element.source.name} title={element.title ? element.title.slice(0, 45) : ""} author={element.author} date={element.publishedAt} imageURL={element.urlToImage} newsUrl={element.url} description={element.description ? element.description.slice(0, 88) : ""} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/* <div className='d-flex justify-content-between container'>
                    <button disabled={page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNxtClick} >Next &rarr; </button>
                </div> */}
            </>
        )
}
News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}
export default News