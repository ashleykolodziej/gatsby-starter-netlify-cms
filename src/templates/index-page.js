import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import youtubeLogo from '../img/logo-profkexplains.svg'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRollHomepage from '../components/BlogRollHomepage'

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
              <a key={node.id} href={`/videos/${node.videoId}`}>
                {node.localThumbnail && (
                  <Img fluid={node.localThumbnail.childImageSharp.fluid} />
                )}
                <h3>{node.title}</h3>
                <time dateTime={node.publishedAt}>Published on {new Date(node.publishedAt).toLocaleDateString('en-US')}</time>
              </a>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </section>
    <section className="homepage-posts">
      <BlogRollHomepage />
    </section>
    {/*<div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div>
        <h3>{main.heading}</h3>
        <p>{main.description}</p>
      </div>
    </div>*/}
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
        }
      }
    }
    allYoutubeVideo {
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
