import React from 'react'

import MainNav from '../components/MainNav'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <nav className="footer-menu">
          <MainNav />
        </nav>
        <nav className="footer-social">
          <ul className="footer-social-list">
            <li>
              <a title="facebook" href="https://facebook.com">
                <img src={facebook} alt="Facebook" />
              </a>
            </li>
            <li>
              <a title="twitter" href="https://twitter.com">
                <img className="fas fa-lg" src={twitter} alt="Twitter" />
              </a>
            </li>
            <li>
              <a title="instagram" href="https://instagram.com">
                <img src={instagram} alt="Instagram" />
              </a>
            </li>
            <li>
              <a title="vimeo" href="https://vimeo.com">
                <img src={vimeo} alt="Vimeo" />
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    )
  }
}

export default Footer
