import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
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
    const errorMessage = error.response?.data?.error?.message || error.message || 'An error occurred'
    
    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url,
    })
    
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

