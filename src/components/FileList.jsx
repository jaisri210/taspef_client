import PropTypes from 'prop-types'
import FileCard from './FileCard'

const FileList = ({ files, onPreview, onDownload, onDelete }) => {
  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by uploading a file.</p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      aria-label="File list"
    >
      {files.map((file) => (
        <div key={file._id} role="listitem">
          <FileCard
            file={file}
            onPreview={onPreview}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      originalName: PropTypes.string.isRequired,
      mimeType: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      uploadedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onPreview: PropTypes.func,
  onDownload: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
}

export default FileList

