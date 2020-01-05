import React from "react"

export const Comments = ({ comments }) => (
  <div>
    {comments && (
      <div className="comments">
        <h3 className="is-size-4" style={{ marginBottom: 20 }}>{`${
          comments.length
        } commentaire${comments.length > 1 ? "s" : ""} :`}</h3>
        {comments
          .filter(c => c.node.status === "approved")
          .map(({ node: comment }) => (
            <div className="comment" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex" }}>
                <div style={{ paddingRight: 10 }}>
                  <img src={comment.author_avatar_urls.wordpress_48} />
                </div>
                <div>
                  <p>
                    {comment.author_name === "slici"
                      ? "Julien"
                      : comment.author_name}
                  </p>
                  <p className="has-text-grey">{`le ${comment.date}`}</p>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </div>
          ))}
      </div>
    )}
  </div>
)

export default Comments
