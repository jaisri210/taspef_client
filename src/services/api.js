import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Origin of the API server, without the trailing /api — e.g.
// 'http://localhost:5000' in dev. Used to resolve uploaded-file URLs,
// which live under that origin's /uploads, not the frontend's own origin.
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/?api\/?$/, '')

// Resolves a fileUrl/coverUrl/imageUrl coming back from the API into
// something a browser can actually fetch. Two kinds show up:
//  - "uploads/xyz.pdf" — server-hosted, needs the API origin prefixed
//  - "assets/xyz.pdf"  — a static asset shipped in the client's own
//    public/ folder (legacy content imported by the seed scripts),
//    resolved relative to whatever origin the site itself is on
export function resolveAssetUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  const clean = url.replace(/^\/+/, '')
  if (clean.startsWith('assets/')) return `/${clean}`
  return `${ASSET_BASE_URL}/${clean}`
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor — attaches the admin session token, if any
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taspef_admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle errors globally
    const errorMessage = error.response?.data?.error?.message || error.response?.data?.message || error.message || 'An error occurred'

    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url,
    })

    if (error.response?.status === 401) {
      localStorage.removeItem('taspef_admin_token')
      localStorage.removeItem('taspef_admin_user')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      details: error.response?.data?.error?.details,
    })
  }
)

// API methods
export const fileAPI = {
  /**
   * Get paginated list of files
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 12)
   * @returns {Promise} Response with files data
   */
  getFiles: async (page = 1, limit = 12) => {
    return api.get('/files', {
      params: { page, limit },
    })
  },

  /**
   * Upload a new file
   * @param {File} file - File to upload
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} Response with uploaded file data
   */
  uploadFile: async (file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)

    return api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      },
    })
  },

  /**
   * Get file download URL
   * @param {string} fileId - File ID
   * @returns {string} Download URL
   */
  getDownloadUrl: (fileId) => {
    return `${API_BASE_URL}/files/${fileId}/download`
  },

  /**
   * Download a file
   * @param {string} fileId - File ID
   * @param {string} filename - Original filename
   * @returns {Promise} Download response
   */
  downloadFile: async (fileId, filename) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/files/${fileId}/download`, {
        responseType: 'blob',
      })

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return { success: true }
    } catch (error) {
      console.error('Download error:', error)
      throw error
    }
  },

  /**
   * Delete a file
   * @param {string} fileId - File ID
   * @returns {Promise} Response with deletion status
   */
  deleteFile: async (fileId) => {
    return api.delete(`/files/${fileId}`)
  },

  /**
   * Get file metadata
   * @param {string} fileId - File ID
   * @returns {Promise} Response with file metadata
   */
  getFileMetadata: async (fileId) => {
    return api.get(`/files/${fileId}`)
  },
}

export default api

