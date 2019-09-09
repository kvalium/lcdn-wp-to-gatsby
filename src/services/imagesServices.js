import cheerio from "cheerio"

export const wpToGatsbyCarousel = node => {
  // using cheerio as DOMParser as build stage doesn't manipulate the DOM
  const $ = cheerio.load(node)
  const wpCarouselImgs = $(
    "ul.wp-block-gallery li.blocks-gallery-item > figure > img"
  )
  if (wpCarouselImgs.length === 0) return

  return Array.from(
    wpCarouselImgs.map((i, { attribs }) => ({
      src: attribs["data-large-file"],
      width: 1,
      height: 1,
    }))
  )
}
