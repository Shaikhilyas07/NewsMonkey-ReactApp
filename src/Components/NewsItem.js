import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageURL, newsUrl, author, date, source } = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <div  style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:0}}>
                    <span className="  badge rounded-pill bg-danger" >
                        {source}
                    </span>
                    </div>
                    
                    <img src={!imageURL ? "https://images.news18.com/ibnlive/uploads/2024/04/reuters-israel-defence-forces-in-gaza-2024-04-b02172582c22ba7268156e599f2e3953-16x9.jpg?impolicy=website&width=1200&height=675" : imageURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
