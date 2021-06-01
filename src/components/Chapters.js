import React from 'react'
import PropTypes from 'prop-types'

const Chapters = ({ chapterList, onSeekTo }) => {
  if ( undefined === chapterList ) {
    return;
  }

  //const findTimestamp = /\[.+\]/g;

  return (
    <aside className="chapters">
      <ul id="chaptersList" className="chapters-list">
        <h2>Chapters in this video:</h2>
        {chapterList.map((chapter) => {
          const timeStamp = chapter.substring(0, 7),
                chapterTitle = chapter.substring(7);

          const timeInSeconds = ( timeStamp ) => {
            const splitTime = timeStamp.slice(1,-1).split(':');
            return (splitTime[0]*60 + parseInt(splitTime[1]));
          };

          console.log(timeInSeconds(timeStamp));

          return <li><button type="button" data-time={timeInSeconds(timeStamp)} onClick={onSeekTo}>{timeStamp}</button>{chapterTitle}</li>
        })}
      </ul>
    </aside>
  )
}

Chapters.propTypes = {
  chapterList: PropTypes.array,
  onSeekTo: PropTypes.func,
}

export default Chapters
