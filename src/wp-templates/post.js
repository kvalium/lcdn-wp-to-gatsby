import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import Gallery from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"

import Layout from "../components/layout"

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

  const post = data.wordpressPost
  const postElements = extractWPPostContent(post.content)
  return (
    <Layout>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="post">
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
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
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
  }
`
