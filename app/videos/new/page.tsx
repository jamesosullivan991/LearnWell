'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

/**
 * VideoForm Component
 * A form to submit video details including title, description, and video URL.
 */
const VideoForm: React.FC = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      videoUrl: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(1, 'Title must be at least 1 character')
        .required('Title is required'),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
      videoUrl: Yup.string()
        .url('Invalid URL format')
        .required('Video URL is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.createVideo(values);
        router.push('/videos');
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Failed to submit form. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <form
        className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Submit a Video</h2>

        {/* Title Field */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="title">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`input input-bordered w-full ${formik.touched.title && formik.errors.title ? 'input-error' : ''}`}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 mt-2">{formik.errors.title}</div>
          ) : null}
        </div>

        {/* Description Field */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            className={`textarea textarea-bordered w-full ${formik.touched.description && formik.errors.description ? 'textarea-error' : ''}`}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 mt-2">{formik.errors.description}</div>
          ) : null}
        </div>

        {/* Video URL Field */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="videoUrl">
            <span className="label-text">Video URL</span>
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            className={`input input-bordered w-full ${formik.touched.videoUrl && formik.errors.videoUrl ? 'input-error' : ''}`}
            value={formik.values.videoUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.videoUrl && formik.errors.videoUrl ? (
            <div className="text-red-500 mt-2">{formik.errors.videoUrl}</div>
          ) : null}
        </div>

        {/* Display submission error if any */}
        {submitError && <div className="text-red-500 mt-4">{submitError}</div>}

        {/* Form buttons */}
        <div className="form-control">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-ghost w-full mt-4"
            onClick={() => router.back()}
            disabled={formik.isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
