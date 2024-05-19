"use client";

import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import VideoTitle from './VideoTitle';
import Notes from './Notes';

interface VideoPlayerProps {
    videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
    const [timestamp, setTimestamp] = useState<string | number | undefined>(0);
    const [player, setPlayer] = useState<any>(null);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        setPlayer(event.target);
        console.log('Player is ready');
    };

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
        console.log('Player state is:', event.data);
        setTimestamp(getCurrentTime());
        console.log('Timestamp:', timestamp);
    };

    const getCurrentTime = () => {
        if (player) {
            const currentTime = player.getCurrentTime();
            const formattedTime = convertSecondsToTimeString(currentTime);
            return formattedTime;
        } else {
            console.log('Player not ready yet');
        }
    };

    function convertSecondsToTimeString (timestamp: number) {
        if (isNaN(timestamp) || timestamp < 0) {
            return 'Invalid time';
        }

        const hours = Math.floor(timestamp / 3600);
        const remainingSeconds = Math.floor(timestamp % 3600);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = Math.floor(remainingSeconds % 60);

        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');

        return `${hoursStr} hrs ${minutesStr} min ${secondsStr} sec`;
    }


    return (
        <div className="video-player">
            <YouTube
                videoId={videoId}
                iframeClassName='rounded-md w-full h-[70vh]'
                opts={opts}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
                onPause={onPlayerStateChange}
            />

            <VideoTitle title="Video title goes here" description="This is the description of the video" />
            <div className="border border-gray-200 rounded-xl p-6">
                <Notes timestamp={timestamp as string} videoId={videoId} player={player} />
            </div>
        </div>
    );
};

export default VideoPlayer;
