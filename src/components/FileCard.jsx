import PropTypes from 'prop-types'
import Button from './Button'

const FileCard = ({ file, onPreview, onDownload, onDelete }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getFileIcon = (mimeType) => {
    if (mimeType.startsWith('image/')) {
      return (
        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      )
    } else if (mimeType === 'application/pdf') {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      )
    } else {
      return (
        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  const canPreview = file.mimeType.startsWith('image/') || file.mimeType === 'application/pdf'

  return (
    <div className="card group">
      <div className="p-4">
        {/* File Icon */}
        <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg mb-4 group-hover:bg-gray-100 transition-colors duration-200">
          {getFileIcon(file.mimeType)}
        </div>

        {/* File Info */}
        <div className="space-y-2">
          <h3 className="font-medium text-text-primary truncate" title={file.originalName}>
            {file.originalName}
          </h3>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{formatFileSize(file.size)}</span>
            <span>{formatDate(file.uploadedAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {canPreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPreview(file)}
              className="flex-1"
              aria-label={`Preview ${file.originalName}`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => onDownload(file)}
            className="flex-1"
            aria-label={`Download ${file.originalName}`}
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </Button>
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(file)}
              className="sm:w-auto"
              aria-label={`Delete ${file.originalName}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

FileCard.propTypes = {
  file: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    originalName: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    uploadedAt: PropTypes.string.isRequired,
  }).isRequired,
  onPreview: PropTypes.func,
  onDownload: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
}

export default FileCard

