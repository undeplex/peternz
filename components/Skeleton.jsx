
const Skeleton = () => {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-40 bg-gray-200 rounded mb-6"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
      </div>
    );
  };
  
  export default Skeleton;
  