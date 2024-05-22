'use client';
import React, { useState } from 'react';
import api from '../../services/api';
import { IComment } from '../../types/video';

// Define the prop types for the CommentsSection component
interface CommentsSectionProps {
  comments: IComment[]; // Array of comments
  videoId: string; // ID of the video
  // eslint-disable-next-line no-unused-vars
  updateComments: (comment: IComment) => void; // Function to update comments
}

/**
 * CommentsSection Component
 * @param comments - Array of comments
 * @param videoId - ID of the video
 * @param updateComments - Function to update comments
 */
const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  videoId,
  updateComments,
}) => {
  // State for the new comment content
  const [newComment, setNewComment] = useState<string>('');
  // State for the new comment user ID
  const [newUserId, setNewUserId] = useState<string>('');

  /**
   * Function to handle adding a new comment
   * Validates the input and updates the state and server
   */
  const addComment = async () => {
    // Check if the new comment, user ID, and video ID are not empty
    if (newComment.trim() && newUserId.trim() && videoId.trim()) {
      // Create a new comment object
      const newCommentObj: IComment = {
        userId: newUserId,
        content: newComment,
        videoId: videoId,
      };

      // Update the comments list with the new comment
      updateComments(newCommentObj);

      // Clear the input fields
      setNewComment('');
      setNewUserId('');

      try {
        // Send the new comment to the server
        await api.createComment(newCommentObj);
      } catch (e) {
        // Log any errors that occur during the API call
        console.log(e);
      }
    }
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      <div className="form-control mb-4">
        <input
          type="text"
          placeholder="Your user ID"
          className="input input-bordered w-full mb-2"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)} // Update user ID state on input change
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)} // Update comment content state on input change
        />
        <button className="btn btn-primary mt-2" onClick={addComment}>
          Post Comment
        </button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="card w-full bg-base-100 shadow-md mb-4">
            <div className="card-body">
              <h2 className="card-title">{comment.userId}</h2>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
