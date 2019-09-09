import cheerio from "cheerio"

/**
 * Extract the WP post content (raw html) to an array of elements
 * @param {String} node raw HTML WP post content
 */
export const extractWPPostContent = node => {
  // using cheerio as DOMParser as build stage doesn't manipulate the DOM
  const $ = cheerio.load(`<span id="post-content">${node}</span>`)

  const postElements = Array.from(
    $("#post-content")
      .children()
      .map((i, el) => {
        // if wp gallery block
        if (`${el.attribs.class}`.includes("wp-block-gallery")) {
          return {
            order: i,
            type: "gallery",
            images: Array.from(
              $(el)
                .children()
                .map((_i, image) => ({
                  src: $(image).find("img")[0].attribs["data-large-file"],
                  width: 1,
                  height: 1,
                }))
            ),
          }
        }
        // returns raw HTML of other elements
        return {
          order: i,
          type: "raw",
          content: $(el).html(),
        }
      })
  )
  return postElements
}