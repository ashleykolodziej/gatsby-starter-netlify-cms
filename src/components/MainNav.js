import React from 'react'
import { Link } from 'gatsby'

export const MainNav = () => (
  <ul className="navbar-start has-text-centered nav-list">
    <li><Link className="navbar-item tag-html" to="/tags/html/">HTML</Link></li>
    <li><Link className="navbar-item tag-css" to="/tags/css/">CSS</Link></li>
    <li><Link className="navbar-item tag-javascript" to="/tags/javascript/">JavaScript</Link></li>
    {/*<li><Link className="navbar-item tag-graphic-design" to="/tags/graphic-design/">Graphic Design</Link></li>
    <li><Link className="navbar-item tag-web-design" to="/tags/web-design/">Web Design</Link></li>*/}
  </ul>
)

export default MainNav
