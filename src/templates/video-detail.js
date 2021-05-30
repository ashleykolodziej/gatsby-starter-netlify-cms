import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import YouTube from 'react-youtube'

import { getCaptions, getTracks } from '@os-team/youtube-captions';

export const VideoPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  videoId
}) => {
  const PostContent = contentComponent || Content;

  // Captions
  fetch(`http://video.google.com/timedtext?type=track&v=${videoId}&lang=en-US&fmt=json3`)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  // Chapters
  const findChapters = /(([\[])+(.)+)/g;
  const chapters = `${description}`.match(findChapters)
  console.log( chapters );

  return (
    <section className="section">
      {helmet || ''}
      <YouTube videoId={videoId} />
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

VideoPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const VideoPost = ({ data }) => {
  const { youtubeVideo } = data

  return (
    <Layout>
      <VideoPostTemplate
        content={youtubeVideo.description}
        contentComponent={HTMLContent}
        description={youtubeVideo.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${youtubeVideo.title}`}</title>
            <meta
              name="description"
              content={`${youtubeVideo.description}`}
            />
          </Helmet>
        }
        tags="video"
        title={youtubeVideo.title}
        videoId={youtubeVideo.videoId}
      />
    </Layout>
  )
}

VideoPost.propTypes = {
  data: PropTypes.shape({
    youtubeVideo: PropTypes.object,
  }),
}

export default VideoPost

export const pageQuery = graphql`
  query VideoPostByID($id: String!) {
    youtubeVideo(id: { eq: $id }) {
        id
        videoId
        title
        description
        publishedAt
    }
  }
`
