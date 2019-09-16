import React from "react"
import { Link, graphql } from "gatsby"
import { decode } from "he"

import Layout from "../components/layout"

const numberOfPostsPerPage = 9

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      displayedPosts: this.props.data.allWordpressPost.edges.slice(
        0,
        numberOfPostsPerPage
      ),
    }
  }
  componentDidMount() {
    //Options
    var options = {
      root: null, // Page as root
      threshold: 1.0,
    }
    // Create an observer
    if (
      typeof window !== "undefined" &&
      document.querySelector(".lazyload-articles") !== null
    ) {
      this.observer = new IntersectionObserver(
        this.loadMore.bind(this),
        options
      )
      this.observer.observe(this.loadingRef)
    }
  }
  loadMore = () => {
    this.setState(currentState => {
      const newIndex = currentState.currentIndex + numberOfPostsPerPage
      return {
        currentIndex: newIndex,
        displayedPosts: [
          ...currentState.displayedPosts,
          ...this.props.data.allWordpressPost.edges.slice(
            newIndex,
            newIndex + numberOfPostsPerPage
          ),
        ],
      }
    })
  }
  render() {
    const { displayedPosts } = this.state
    return (
      <Layout>
        <div className="columns is-multiline">
          {displayedPosts.map(({ node }) => {
            return (
              <div className="column is-one-third" key={node.slug}>
                <Link to={node.slug}>
                  <div className="card">
                    {node.featured_img && (
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img src={node.featured_img} alt={node.title} />
                        </figure>
                      </div>
                    )}
                    <div className="card-content">
                      <h3 className="title is-5">{decode(node.title)}</h3>
                      <div className="content">
                        <div
                          dangerouslySetInnerHTML={{ __html: node.excerpt }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        <div className="has-text-centered">
          <div
            className="lazyload-articles"
            ref={loadingRef => (this.loadingRef = loadingRef)}
          />
          <button
            className="button is-info is-rounded is-large"
            onClick={() => this.loadMore()}
          >
            Plus d'articles !
          </button>
        </div>
      </Layout>
    )
  }
}

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          slug
          title
          date(formatString: "DD MMMM YYYY", locale: "FR")
          featured_img
          excerpt
          author {
            name
          }
          categories {
            name
          }
        }
      }
    }
  }
`
