import axios, { AxiosInstance } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { IVideo, IComment } from '../types/video';

// Create an Axios instance with case conversion middleware applied
const api: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://take-home-assessment-423502.uc.r.appspot.com/api',
  }),
);

// Hardcoded user ID for API requests
const userId = 'james_osullivan';

/**
 * Fetches a list of videos for the specified user.
 *
 * @returns {Promise<IVideo[]>} - A promise that resolves to an array of video objects.
 */
const getVideos = async (): Promise<IVideo[]> => {
  const res = await api.get(`/videos?user_id=${userId}`);
  return res.data.videos;
};

/**
 * Fetches a video by its ID.
 *
 * @param {string} videoId - The ID of the video to fetch.
 * @returns {Promise<IVideo | undefined>} - A promise that resolves to the video object or undefined if not found.
 */
const getVideoById = async (videoId: string): Promise<IVideo | undefined> => {
  const res = await api.get(`/videos?user_id=${userId}`);
  const videos: IVideo[] = res.data.videos;
  return videos.find((v: IVideo) => v.id === videoId);
};

// Interface for the data required to create a video
interface CreateFormProps {
  title: string;
  description: string;
  videoUrl: string;
}

/**
 * Creates a new video.
 *
 * @param {CreateFormProps} data - The data required to create a video.
 * @returns {Promise<IVideo>} - A promise that resolves to the created video object.
 */
const createVideo = async (data: CreateFormProps): Promise<IVideo> => {
  const res = await api.post('/videos', { ...data, userId });
  return res.data;
};

/**
 * Fetches comments for a specific video.
 *
 * @param {string} videoId - The ID of the video for which to fetch comments.
 * @returns {Promise<IComment[]>} - A promise that resolves to an array of comment objects.
 */
const getComments = async (videoId: string): Promise<IComment[]> => {
  const res = await api.get(`/videos/comments?video_id=${videoId}`);
  return res.data.comments;
};

// Interface for the data required to create a comment
interface CreateCommentProps {
  userId: string;
  content: string;
  videoId: string;
}

/**
 * Creates a new comment on a video.
 *
 * @param {CreateCommentProps} data - The data required to create a comment.
 * @returns {Promise<IComment>} - A promise that resolves to the created comment object.
 */
const createComment = async (data: CreateCommentProps): Promise<IComment> => {
  try {
    const res = await api.post('/videos/comments', data);
    return res.data;
  } catch (e) {
    console.error('Error creating comment: ', e);
    throw e;
  }
};

const apiService = {
  getVideos,
  getVideoById,
  createVideo,
  getComments,
  createComment,
};

export default apiService;
