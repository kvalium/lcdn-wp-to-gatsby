export const wpToGatsbyCarousel = node => {
    const postDom = new DOMParser().parseFromString(node.content, "text/html")
    const wpCarouselImgs = postDom.querySelectorAll(
      "ul.wp-block-gallery li.blocks-gallery-item > figure > img"
    )

    const carouselImgs = Array.from(wpCarouselImgs).map(({attributes}) => {
    //   return {
    //     original: attributes.getNamedItem("data-large-file").value,
    //     thumbnail: attributes.getNamedItem("data-medium-file").value,
    //     srcSet: attributes.getNamedItem("srcset") ? attributes.getNamedItem("srcset").value : null,
    //     description: attributes.getNamedItem("data-image-description").value,
    //   }
    return {
        src: attributes.getNamedItem("data-large-file").value,
        width: 1,
        height: 1
    }
    })
    return carouselImgs;
}