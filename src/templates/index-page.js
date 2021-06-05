import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import youtubeLogo from '../img/logo-profkexplains.svg'

import Layout from '../components/Layout'
import BlogRollHomepage from '../components/BlogRollHomepage'
import VideoListItem from '../components/VideoListItem'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  description,
  intro,
  videos,
  main
}) => (
  <>
    <section className="homepage-intro">
      <h1 className="visually-hidden">
        {title}
      </h1>
    </section>
    <section className="homepage-video">
      <CarouselProvider
        naturalSlideWidth={500}
        naturalSlideHeight={500}
        totalSlides={10}
        visibleSlides={3}
        infinite={true}
      >
        <div className="carousel-controls">
          <h2>Latest Videos from <img src={youtubeLogo} alt="Professor K Explains" /></h2>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </div>
        <Slider className="homepage-slider">
          {videos.map((node, i) => (
            <Slide key={node.id} index={i} innerClassName="homepage-video-slide">
              <VideoListItem data={node} />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </section>
    <section className="homepage-posts">
      <BlogRollHomepage />
    </section>
    <section className="homepage-about">
      <PreviewCompatibleImage imageInfo={main.profileimage} />
      <div className="homepage-about-content">
        <h3>{main.heading}</h3>
        <p>{main.description}</p>
      </div>
    </section>
  </>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  main: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const video = data.allYoutubeVideo.nodes;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        videos={video}
        main={frontmatter.main}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
        main {
          heading
          description
          profileimage {
            alt,
            image {
              childImageSharp {
                fluid(maxWidth: 300, maxHeight: 300, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allYoutubeVideo(limit: 10) {
      nodes {
        id
        videoId
        title
        publishedAt
        localThumbnail {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 281, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }

`
