import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProjects = async (category = '') => {
  const response = await API.get('/projects');
  const rawData = response.data?.data || response.data || [];
  const data = rawData.filter(p => p.status !== 'ARCHIVED');
  if (category && category !== 'all') {
    return data.filter(p => p.category === category);
  }
  return data;
};

export const fetchProjectBySlug = async (slug) => {
  try {
    const response = await API.get(`/projects/${slug}`);
    return response.data?.data || response.data;
  } catch (err) {
    console.error(`Error fetching project ${slug}:`, err);
    return null;
  }
};

export const fetchProjectDecisions = async (slug) => {
  const response = await API.get(`/projects/${slug}/decisions`);
  return response.data?.data || response.data || [];
};

export const fetchProjectImages = async (slug) => {
  try {
    const response = await API.get(`/projects/${slug}/images`);
    return response.data?.data || response.data || [];
  } catch (err) {
    console.error(`Error fetching images for ${slug}:`, err);
    return [];
  }
};

export const fetchTechnologies = async () => {
  try {
    const response = await API.get('/technologies');
    return response.data?.data || response.data || [];
  } catch (err) {
    console.error('Error fetching technologies:', err);
    return [];
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await API.post('/contact', formData);
    return response.data;
  } catch (err) {
    const message = err.response?.data?.errors?.join(', ') || err.response?.data?.error || 'Failed to submit form';
    throw new Error(message);
  }
};

export const fetchHealthStatus = async () => {
  try {
    const response = await API.get('/health');
    return response.data;
  } catch (err) {
    return { status: 'ERROR' };
  }
};

export const fetchProfile = async () => {
  const response = await API.get('/profile');
  return response.data?.data || response.data || null;
};

export const fetchTestimonials = async () => {
  const response = await API.get('/testimonials');
  return response.data?.data || response.data || [];
};

