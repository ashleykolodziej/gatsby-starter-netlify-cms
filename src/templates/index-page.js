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
  mainpitch,
  description,
  intro,
  videos
}) => (
  <>
    <section className="homepage-intro">
      <h1>
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
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
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
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        videos={video}
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
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
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
