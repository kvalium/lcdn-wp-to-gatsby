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

  const openLightbox = useCallback((event, { photo, index }) => {
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
      <div className="post">
        <h1
          className="title"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        {postElements.map(el => {
          if (el.type === "gallery") {
            return (
              <div className="gallery" key={el.order}>
                <Gallery photos={el.images} onClick={openLightbox} />
                <ModalGateway>
                  {viewerIsOpen && (
                    <Modal onClose={closeLightbox}>
                      <Carousel
                        currentIndex={currentImage}
                        views={el.images.map(x => ({
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
              key={el.order}
              dangerouslySetInnerHTML={{ __html: el.content }}
            />
          )
        })}
        <nav className="level">
          <div className="level-item has-text-centered">
            <button className="button is-rounded">Button</button>
          </div>
          <div className="level-item has-text-centered">
            <button className="button is-rounded">Button</button>
          </div>
        </nav>
      </div>
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
