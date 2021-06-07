import React from 'react'

import MainNav from '../components/MainNav'
import { SocialIcon } from 'react-social-icons';

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
              <SocialIcon url="https://www.youtube.com/c/ProfessorKExplains" fgColor="#fff" />
            </li>
            <li>
              <SocialIcon url="https://twitter.com/ashleykolodziej" fgColor="#fff" />
            </li>
            <li>
              <SocialIcon url="https://www.linkedin.com/in/ashleykolodziej/" fgColor="#fff" />
            </li>
          </ul>
        </nav>
      </footer>
    )
  }
}

export default Footer
