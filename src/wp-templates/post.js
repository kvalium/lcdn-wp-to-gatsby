import React, { useState, useCallback } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import Gallery from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"

import Layout from "../components/layout"
import Comments from "../components/Comments"

import { extractWPPostContent } from "../services/wordpressService"

function PostTemplate({ data }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((_event, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const {
    wordpressPost: post,
    allWordpressWpComments: { edges: comments },
    allWordpressPost: { edges: navigation },
  } = data
  const postNav = navigation.filter(navs => navs.node.id === post.id)[0]
  const postElements = extractWPPostContent(post.content)
  return (
    <Layout>
      <p style={{ display: "none" }}>{Date()}</p>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="post">
            <p className="is-size-6 has-text-grey">{post.date}</p>
            <h1
              className="title is-1"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            {postElements.map(({ type, images, order, content }) => {
              if (type === "gallery") {
                return (
                  <div className="gallery" key={order}>
                    <Gallery photos={images} onClick={openLightbox} />
                    <ModalGateway>
                      {viewerIsOpen && (
                        <Modal onClose={closeLightbox}>
                          <Carousel
                            currentIndex={currentImage}
                            views={images.map(x => ({
                              ...x,
                              srcset: x.srcSet,
                              caption: x.title,
                            }))}
                          />
                        </Modal>
                      )}
                    </ModalGateway>
                  </div>
                )
              }
              return (
                <div
                  className="raw"
                  key={order}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )
            })}
            {comments.length > 0 && <Comments comments={comments} />}
            <div
              class="buttons are-medium"
              style={{
                marginTop: 100,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {postNav.next && (
                <Link
                  to={postNav.next.slug}
                  class="button is-outlined is-primary"
                >
                  <span class="icon is-small">
                    <i class="fas fa-check"></i>
                  </span>
                  <span>Précédent</span>
                </Link>
              )}
              {postNav.previous && (
                <Link
                  to={postNav.previous.slug}
                  class="button is-outlined is-primary"
                >
                  <span>Suivant</span>
                  <span class="icon is-small">
                    <i class="fas fa-check"></i>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query($wordpress_id: Int!) {
    wordpressPost(wordpress_id: { eq: $wordpress_id }) {
      id
      title
      date(formatString: "DD MMMM YYYY", locale: "FR")
      date(formatString: "DD MMMM YYYY", locale: "FR")
      categories {
        name
        slug
      }
      author {
        name
        slug
      }
      content
    }
    allWordpressWpComments(filter: { post: { eq: $wordpress_id } }) {
      edges {
        node {
          post
          author_name
          date(formatString: "DD MMMM YYYY", locale: "FR")
          content
          status
          author_avatar_urls {
            wordpress_48
          }
        }
      }
    }
    allWordpressPost {
      edges {
        next {
          slug
        }
        previous {
          slug
        }
        node {
          id
        }
      }
    }
  }
`
