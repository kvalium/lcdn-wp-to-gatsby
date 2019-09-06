import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import Layout from "../components/layout"

import { wpToGatsbyCarousel } from "../services/imagesServices";

function PostTemplate({data}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

    const post = data.wordpressPost
    const gallery = wpToGatsbyCarousel(post)
    console.log(gallery);
    return (
      <Layout>
        <h1
          className="title"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}

        <Gallery photos={gallery} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen && (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={gallery.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          )}
        </ModalGateway>
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
      content
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
