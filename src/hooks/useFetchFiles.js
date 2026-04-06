import { useState, useEffect, useCallback } from 'react'
import { fileAPI } from '../services/api'

/**
 * Custom hook to fetch files with pagination
 * @param {number} initialPage - Initial page number
 * @param {number} initialLimit - Initial items per page
 * @returns {Object} Files data and methods
 */
export const useFetchFiles = (initialPage = 1, initialLimit = 12) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fileAPI.getFiles(page, limit)

      setFiles(response.data || [])
      setTotalItems(response.totalItems || 0)
      setTotalPages(response.totalPages || 0)
    } catch (err) {
      setError(err.message || 'Failed to fetch files')
      setFiles([])
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  const goToPage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }, [page, totalPages])

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }, [page])

  const refresh = useCallback(() => {
    fetchFiles()
  }, [fetchFiles])

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit)
    setPage(1) // Reset to first page when changing limit
  }, [])

  return {
    files,
    loading,
    error,
    page,
    limit,
    totalItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    refresh,
    changeLimit,
  }
}

export default useFetchFiles

