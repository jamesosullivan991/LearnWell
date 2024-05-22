import React from 'react';
import {
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  BigPlayButton,
} from 'video-react';
import 'video-react/dist/video-react.css';

/**
 * VideoPlayer Component
 * A reusable video player component using the video-react library.
 *
 * @param {Object} props - The properties object
 * @param {string} props.url - The URL of the video to play
 */
const VideoPlayer = ({ url }: { url: string }) => {
  // Array of playback rates to be available in the PlaybackRateMenuButton
  const rates = [2, 1.75, 1.5, 1.25, 1, 0.5, 0.25];

  return (
    <Player>
      <source src={url} type="video/mp4" />
      <BigPlayButton position="center" />
      <ControlBar>
        <PlaybackRateMenuButton rates={rates} />
      </ControlBar>
    </Player>
  );
};

export default VideoPlayer;
