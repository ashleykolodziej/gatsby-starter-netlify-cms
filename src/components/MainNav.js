import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export const MainNav = () => (
  <ul className="navbar-start has-text-centered">
    <li><Link className="navbar-item" to="/tags/html/">HTML</Link></li>
    <li><Link className="navbar-item" to="/tags/css/">CSS</Link></li>
    <li><Link className="navbar-item" to="/tags/javascript/">JavaScript</Link></li>
    <li><Link className="navbar-item" to="/tags/graphic-design/">Graphic Design</Link></li>
    <li><Link className="navbar-item" to="/tags/web-design/">Web Design</Link></li>
  </ul>
)

export default MainNav
