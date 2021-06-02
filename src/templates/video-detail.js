import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import YouTube from 'react-youtube'
import Chapters from '../components/Chapters'
import Content, { HTMLContent } from '../components/Content'

export const VideoPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  videoId
}) => {
  const PostContent = contentComponent || Content
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onSeekTo = (event) => {
    player.seekTo(event.currentTarget.dataset.time);
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
      <section className="video-player">
        <YouTube videoId={videoId} containerClassName="video-responsive" onReady={onReady} />
        <Chapters chapterList={chapters} onSeekTo={onSeekTo} />
      </section>
      <section className="video-transcript">
        <div className="content-container">
          <h1 className="page-title">
            {title}
          </h1>
          <p>{cleanDescription}</p>
          <PostContent content={content} />
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h4>Tags</h4>
              <ul className="taglist">
                {console.log(tags)}
                {tags.map((tag) => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
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
      maybeTags = null;

  if ( null !== post ) {
    maybeContent = post.html;
    maybeTags = post.tags;
  }

  return (
    <Layout>
      <VideoPostTemplate
        content={maybeContent}
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
        tags={maybeTags}
        title={youtubeVideo.title}
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
