import React from 'react'
import PropTypes from 'prop-types'

const Chapters = ({ chapterList}) => {
  if ( undefined === chapterList ) {
    return;
  }

  return (
    <aside className="chapters">
      <ul id="chaptersList" className="chapters-list">
        <h2>Chapters in this video:</h2>
        {chapterList.map((chapter) => (
          <li>{chapter}</li>
        ))}
      </ul>
    </aside>
  )
}

Chapters.propTypes = {
  chapterList: PropTypes.array
}

export default Chapters
