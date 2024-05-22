'use client';
import Link from 'next/link';
import React from 'react';
import api from './services/api';
import { IVideo } from './types/video';

/**
 * VideosPage Component
 * A page component that displays a list of videos fetched from the API.
 */
const VideosPage: React.FC = () => {
  // State to hold the list of videos
  const [videos, setVideos] = React.useState<IVideo[]>([]);

  // useEffect hook to fetch videos when the component mounts
  React.useEffect(() => {
    api.getVideos().then((videos) => setVideos(videos)); // Set the videos state with the fetched data
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="flex justify-center items-start min-h-screen pt-16">
      <div className="w-full max-w-4xl mx-auto p-4 bg-base-100 rounded">
        {/* Header section with title and add video button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Videos</h2>
          <Link href="/videos/new">
            <button className="btn btn-primary btn-outline">Add Video</button>
          </Link>
        </div>

        {/* Table to display videos */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the videos and display each video in a table row */}
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-100">
                  <td>
                    <Link href={`/videos/${video.id}`}>{video.title}</Link>
                  </td>
                  <td>{video.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
