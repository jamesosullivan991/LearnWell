'use client';
import { useEffect, useState, useMemo } from 'react';
import VideoPlayer from './video';
import CommentsSection from './comments';
import api from '@/app/services/api';
import Link from 'next/link';
import { IVideo, IComment } from '../../types/video';

interface Props {
  params: { id: string };
}

/**
 * VideoList Component
 * Displays a list of videos with an option to show more or less.
 *
 * @param {Object} props - The properties object
 * @param {IVideo[]} props.videos - Array of video objects to display
 */
const VideoList = ({ videos }: { videos: IVideo[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedVideos = showAll ? videos : videos.slice(0, 20);

  return (
    <div className="video-list bg-base-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">More Videos</h2>
      <ul className="space-y-2">
        {displayedVideos.map((v) => (
          <Link key={v.id} href={`/videos/${v.id}`} passHref>
            <li className="p-2 bg-base-200 rounded hover:shadow-lg hover:bg-blue-100 hover:cursor-pointer mb-2">
              {v.title}
            </li>
          </Link>
        ))}
      </ul>
      {videos.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn btn-secondary btn-sm mt-4"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

/**
 * VideoPage Component
 * Displays a single video along with its comments and a list of related videos.
 *
 * @param {Object} props - The properties object
 * @param {Object} props.params - The parameters object
 * @param {string} props.params.id - The ID of the video to display
 */
const VideoPage = ({ params: { id } }: Props) => {
  // State to hold the comments for the video
  const [comments, setComments] = useState<IComment[]>([]);
  // State to hold the current video details
  const [video, setVideo] = useState<IVideo | null>(null);
  // State to hold the list of all videos
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getVideos()
      .then((fetchedVideos: IVideo[]) => {
        setVideos(fetchedVideos);
        const video = fetchedVideos.find((v) => v.id === id) || null;
        setVideo(video);
      })
      .catch(() => {
        alert('Error finding video.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    api
      .getComments(id)
      .then((fetchedComments) => setComments(fetchedComments))
      .catch(() => alert('Error getting comments.'));
  }, [id]);

  const loadingSpinner = (
    <div className="flex justify-center items-center h-64">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-base-100 p-4 rounded-lg shadow-md">
          {loading
            ? loadingSpinner
            : video && (
                <>
                  <VideoPlayer url={video.videoUrl} />
                  <h2 className="text-2xl font-bold mb-5 header mt-7">
                    {video.title}
                  </h2>
                  <h2 className="rounded text-l bg-gray-100 pt-4 p-4 mb-4">
                    {video.description}
                  </h2>
                  <CommentsSection
                    comments={comments}
                    videoId={video.id}
                    updateComments={(newComment) =>
                      setComments((prevComments) => [
                        ...prevComments,
                        newComment,
                      ])
                    }
                  />
                </>
              )}
        </div>
        {useMemo(
          () => (
            <VideoList videos={videos} />
          ),
          [videos],
        )}
      </div>
    </div>
  );
};

export default VideoPage;
