import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        name: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    capitaliza = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        console.log('Hello I am const from news comp');
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitaliza(this.props.category)} - NewsMonkey`;
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        // console.log(parsedData);
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.updateNews()
    }
    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()
    // }
    // handleNxtClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })

    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0" }}>NewsMonkey - Top {`${this.capitaliza(this.props.category)}`} HeadLines
                </h1>
                {this.state.loading && <Spinner />}


                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className='col-md-4'>
                                    <NewsItem source={element.source.name} title={element.title ? element.title.slice(0, 45) : ""} author={element.author} date={element.publishedAt} imageURL={element.urlToImage} newsUrl={element.url} description={element.description ? element.description.slice(0, 88) : ""} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/* <div className='d-flex justify-content-between container'>
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNxtClick} >Next &rarr; </button>
                </div> */}
            </>
        )
    }
}

export default News