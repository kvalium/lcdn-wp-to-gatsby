export const wpToGatsbyCarousel = node => {
  const postDom = new DOMParser().parseFromString(node, "text/html")
  const wpCarouselImgs = Array.from(
    postDom.querySelectorAll(
      "ul.wp-block-gallery li.blocks-gallery-item > figure > img"
    )
  )

  if (wpCarouselImgs.length === 0) return
  const carouselImgs = wpCarouselImgs.map(({ attributes }) => {
    return {
      src: attributes.getNamedItem("data-large-file").value,
      width: 1,
      height: 1,
    }
  })
  return carouselImgs
}
