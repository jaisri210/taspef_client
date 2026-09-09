import { useState } from 'react'
import useFetchFiles from '../hooks/useFetchFiles'
import { fileAPI } from '../services/api'
import FileList from '../components/FileList'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import Loader from '../components/Loader'
import Button from '../components/Button'

// Uploading and deleting now require an admin session (see /admin/gallery
// or the other admin modules) — this page is read-only browse/download.
const Files = () => {
  const { files, loading, error, page, limit, totalItems, totalPages, goToPage, refresh } = useFetchFiles(1, 12)
  const [previewFile, setPreviewFile] = useState(null)

  const handlePreview = (file) => {
    setPreviewFile(file)
  }

  const handleDownload = async (file) => {
    try {
      await fileAPI.downloadFile(file._id, file.originalName)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to download file. Please try again.')
    }
  }

  const renderPreviewContent = () => {
    if (!previewFile) return null

    if (previewFile.mimeType.startsWith('image/')) {
      return (
        <img
          src={fileAPI.getDownloadUrl(previewFile._id)}
          alt={previewFile.originalName}
          className="w-full h-auto max-h-[70vh] object-contain"
        />
      )
    } else if (previewFile.mimeType === 'application/pdf') {
      return (
        <iframe
          src={fileAPI.getDownloadUrl(previewFile._id)}
          title={previewFile.originalName}
          className="w-full h-[70vh] border-0"
        />
      )
    }

    return <p className="text-center text-text-secondary">Preview not available for this file type.</p>
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">File Library</h1>
        <p className="text-text-secondary mb-6">
          Browse and download files shared for TASPEF activities.
        </p>
      </div>

      {/* Loading State */}
      {loading && <Loader text="Loading files..." />}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Files</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <Button variant="primary" onClick={refresh}>
            Try Again
          </Button>
        </div>
      )}

      {/* File List */}
      {!loading && !error && (
        <>
          <FileList
            files={files}
            onPreview={handlePreview}
            onDownload={handleDownload}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={limit}
              onPageChange={goToPage}
            />
          )}
        </>
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title={previewFile?.originalName || 'File Preview'}
        size="xl"
      >
        {renderPreviewContent()}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPreviewFile(null)}>
            Close
          </Button>
          {previewFile && (
            <Button variant="primary" onClick={() => handleDownload(previewFile)}>
              Download
            </Button>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Files

