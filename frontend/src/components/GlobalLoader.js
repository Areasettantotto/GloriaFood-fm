const GlobalLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[9999]">
      <div className="loader w-12 h-12 border-4 border-t-accent border-solid rounded-full animate-spin"></div>
    </div>
  )
}

export default GlobalLoader
