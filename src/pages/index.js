import React, { useState } from "react"
import { Link, graphql, navigate } from "gatsby"
import { decode } from "he"

import Layout from "../components/layout"

const numberOfPostsPerPage = 12

export const Index = ({
  data: {
    allWordpressPost: { edges: posts },
  },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState(
    posts.slice(0, numberOfPostsPerPage)
  )

  const loadMore = () => {
    const newIndex = currentIndex + numberOfPostsPerPage
    setCurrentIndex(newIndex)
    setDisplayedPosts([
      ...displayedPosts,
      ...posts.slice(newIndex, newIndex + numberOfPostsPerPage),
    ])
  }

  const orderedByYearPosts = posts.reduce(
    (acc, { node }) => {
      acc[node.year] ? acc[node.year].push(node) : (acc[node.year] = [node])
      return acc
    },

    {}
  )
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Accès rapide</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select
                      onChange={({ target: { value: slug } }) => {
                        navigate(slug)
                      }}
                    >
                      {Object.keys(orderedByYearPosts).map(year => (
                        <optgroup key={year} label={year}>
                          {orderedByYearPosts[year].map(
                            ({ id, title, slug }) => (
                              <option key={id} value={slug}>
                                {decode(title)}
                              </option>
                            )
                          )}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="columns is-multiline">
            {displayedPosts.map(
              ({ node: { id, slug, title, excerpt, featured_img } }) => (
                <div className="column is-one-quarter" key={id}>
                  <Link to={slug}>
                    <div className="card">
                      {featured_img && (
                        <div className="card-image">
                          <figure className="image is-4by3">
                            <img src={featured_img} alt={title} />
                          </figure>
                        </div>
                      )}
                      <div className="card-content">
                        <h3 className="title is-5"> {decode(title)} </h3>
                        <div className="content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: excerpt,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
          <div className="has-text-centered">
            <button
              className="button is-info is-rounded is-large"
              onClick={() => loadMore()}
            >
              Plus d 'articles !
            </button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// Set here the ID of the home page.
export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          slug
          title
          date(formatString: "DD MMMM YYYY", locale: "FR")
          year: date(formatString: "YYYY", locale: "FR")
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

export default Index
