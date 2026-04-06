import { useState, useRef } from 'react'
import useFetchFiles from '../hooks/useFetchFiles'
import { fileAPI } from '../services/api'
import FileList from '../components/FileList'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import Loader from '../components/Loader'
import Button from '../components/Button'

const Files = () => {
  const { files, loading, error, page, limit, totalItems, totalPages, goToPage, refresh } = useFetchFiles(1, 12)
  const [previewFile, setPreviewFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const fileInputRef = useRef(null)

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

  const handleDelete = async (file) => {
    if (!window.confirm(`Are you sure you want to delete "${file.originalName}"?`)) {
      return
    }

    try {
      await fileAPI.deleteFile(file._id)
      refresh()
      alert('File deleted successfully')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete file. Please try again.')
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB')
      return
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(file.type)) {
      setUploadError('File type not allowed. Please upload images, PDFs, or Word documents.')
      return
    }

    try {
      setUploading(true)
      setUploadError(null)
      setUploadProgress(0)

      await fileAPI.uploadFile(file, (progress) => {
        setUploadProgress(progress)
      })

      // Reset and refresh
      setUploadProgress(0)
      setUploading(false)
      event.target.value = ''
      refresh()
      alert('File uploaded successfully!')
    } catch (err) {
      console.error('Upload failed:', err)
      setUploadError(err.message || 'Failed to upload file')
      setUploading(false)
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
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">File Management</h1>
        <p className="text-text-secondary mb-6">
          Upload, manage, and download files for TASPEF activities.
        </p>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-text-primary mb-2">Upload New File</h2>
              <p className="text-sm text-text-secondary">
                Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
            <Button
              variant="primary"
              onClick={handleFileSelect}
              disabled={uploading}
              loading={uploading}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {uploading ? `Uploading ${uploadProgress}%` : 'Upload File'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              aria-label="File upload input"
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                  role="progressbar"
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          )}

          {/* Upload Error */}
          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {uploadError}
            </div>
          )}
        </div>
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
            onDelete={handleDelete}
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

