/**
 * Interface representing a Video object
 *
 * @interface IVideo
 * @property {string} created_at - The date and time when the video was created
 * @property {string} videoUrl - The URL of the video
 * @property {string} userId - The ID of the user who uploaded the video
 * @property {string} description - A description of the video
 * @property {string} title - The title of the video
 * @property {number} numComments - The number of comments on the video
 * @property {string} id - The unique identifier of the video
 */
export interface IVideo {
  created_at: string;
  videoUrl: string;
  userId: string;
  description: string;
  title: string;
  numComments: number;
  id: string;
}

/**
 * Interface representing a Comment object
 *
 * @interface IComment
 * @property {string} userId - The ID of the user who made the comment
 * @property {string} content - The content of the comment
 * @property {string} videoId - The ID of the video on which the comment was made
 */
export interface IComment {
  userId: string;
  content: string;
  videoId: string;
}
