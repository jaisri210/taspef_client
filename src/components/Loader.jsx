import PropTypes from 'prop-types'

const Loader = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const loader = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizes[size]} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-text-secondary text-sm md:text-base">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {loader}
      </div>
    )
  }

  return <div className="flex items-center justify-center py-12">{loader}</div>
}

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
}

export default Loader

