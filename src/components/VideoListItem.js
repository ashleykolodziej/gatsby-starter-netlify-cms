import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const VideoListItem = ({ data }) => {
  if ( null === data ) {
    return null;
  }

  return (
    <a key={data.id} href={`/videos/${data.videoId}`}>
      {data.localThumbnail && (
        <Img fluid={data.localThumbnail.childImageSharp.fluid} />
      )}
      <h3>{data.title}</h3>
      <time dateTime={data.publishedAt}>Published on {new Date(data.publishedAt).toLocaleDateString('en-US')}</time>
    </a>
  )
}

VideoListItem.propTypes = {
  data: PropTypes.object,
}

export default VideoListItem
