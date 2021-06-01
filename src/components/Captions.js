import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Captions = ({ videoId, onSeekTo }) => {
    const [ isLoading, setIsLoading ] = useState( true );
    const [ data, setData ] = useState( null );

    useEffect(() => {
      const fetchData = async () => {
        await fetch(`http://video.google.com/timedtext?type=track&v=${videoId}&lang=en-US&fmt=json3`)
          .then( response => response.json() )
          .then( ( data ) => {
            setData( data );
            setIsLoading( false );
          } ).catch( ( error ) => {
            console.warn( error );
            setData( null );
            setIsLoading( false );
            return;
          } );
      };

      fetchData();
    }, [videoId]);

    return (
      <>
      {isLoading ?
        null
        :
        <aside className="transcript">
          <ul id="transcriptList" className="transcript-list">
            <h2>Video transcript:</h2>
            {data.events.map((caption) => {
              const timeStamp = 'Test';

              return <li><button type="button" data-time={caption.tStartMs/60} onClick={onSeekTo}>{timeStamp}</button>{caption.segs[0].utf8}</li>;
            })}
          </ul>
        </aside>
      }
      </>
    );
}

Captions.propTypes = {
  videoId: PropTypes.string,
  onSeekTo: PropTypes.func,
}

export default Captions
