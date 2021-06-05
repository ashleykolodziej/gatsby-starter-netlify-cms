import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HTMLContent } from '../components/Content'

const Transcript = ({ content, onSeekTo }) => {
  const ref = useRef();
  console.log(ref);

  useEffect(() => {
    const contentNode = document.createRange().createContextualFragment(content);
    const paragraphs = contentNode.querySelectorAll('p');

    for (const paragraph of paragraphs) {
        const paragraphText = paragraph.textContent,
              timeStamp = paragraphText.substring(0, 10),
              cleanedText = paragraphText.substring(10);

        const timeInSeconds = ( timeStamp ) => {
          const splitTime = timeStamp.slice(1,-1).split(':');
          return (splitTime[0]*60*60 + splitTime[1]*60 + parseInt(splitTime[2]));
        };

        paragraph.innerHTML = `<button type="button" data-time=${timeInSeconds(timeStamp)}>${timeStamp}</button>${cleanedText}</p>`;
    }

    let uselessDiv = document.createElement('div');
        uselessDiv.appendChild( contentNode.cloneNode(true) );

    ref.current = uselessDiv.innerHTML;

    return;
  }, [content]);

  if (undefined === ref.current) {
    return null;
  }

  return (
    <aside className="chapters" onClick={onSeekTo}>
      <h2>Transcript</h2>
      <HTMLContent content={ref.current} />
    </aside>
  )
}

Transcript.propTypes = {
  onSeekTo: PropTypes.func,
}

export default Transcript
