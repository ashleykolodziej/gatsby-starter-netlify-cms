import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import YouTube from 'react-youtube'
import Chapters from '../components/Chapters'
import Transcript from '../components/Transcript'

export const VideoPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  videoId
}) => {
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onSeekTo = (event) => {
    if ( event.target.type !== 'button' ) return;
    player.seekTo(event.target.dataset.time);
  };

  // Chapters
  const findChapters = /(([[])+(.)+)/g;
  const chapters = `${description}`.match(findChapters)

  let cleanDescription = description;

  if (chapters && chapters.length) {
    const findCleanDescription = /[\s\S]*?(?=Chapters in this video:)/g;
    cleanDescription = `${description}`.match(findCleanDescription)
  }

  return (
    <section className="video-detail">
      {helmet || ''}
      <header className="video-teaser content-container">
        <h1 className="page-title">
          {title}
        </h1>
        <p>{cleanDescription}</p>
        <ul className="taglist">
          {tags.map((tag) => (
            <li key={tag + `tag`}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </header>
      <section className="video-player">
        <YouTube videoId={videoId} containerClassName="video-responsive" onReady={onReady} />
        {content && content.length ? (
          <Transcript content={content} onSeekTo={onSeekTo} />
        ) : 
          <Chapters chapterList={chapters} onSeekTo={onSeekTo} />
        }
      </section>
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
  const { markdownRemark: post } = data
  let maybeContent = '',
      maybeTags = ['Video'],
      maybeTitle = youtubeVideo.title;

  if ( null !== post ) {
    maybeContent = post.html;

    if ( null !== post.frontmatter.tags ) {
      maybeTags = post.frontmatter.tags;
    }

    if ( '' !== post.frontmatter.title ) {
      maybeTitle = post.frontmatter.title;
    }
  }

  return (
    <Layout>
      <VideoPostTemplate
        content={maybeContent}
        description={youtubeVideo.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${maybeTitle}`}</title>
            <meta
              name="description"
              content={`${youtubeVideo.description}`}
            />
          </Helmet>
        }
        tags={maybeTags}
        title={maybeTitle}
        videoId={youtubeVideo.videoId}
      />
    </Layout>
  )
}

VideoPost.propTypes = {
  data: PropTypes.shape({
    youtubeVideo: PropTypes.object,
    markdownRemark: PropTypes.object,
  }),
}

export default VideoPost

export const pageQuery = graphql`
  query VideoPostByID($id: String!, $videoid: String!) {
    youtubeVideo(id: { eq: $id }) {
        id
        videoId
        title
        description
        publishedAt
    }
    markdownRemark(frontmatter: {videoId: {eq: $videoid}}) {
      id
      html
      frontmatter {
        title
        category
        tags
      }
    }
  }
`
