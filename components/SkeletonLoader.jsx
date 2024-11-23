const SkeletonLoader = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse gap-2 justify-between flex p-4 bg-gray-200 rounded-lg shadow-md"
          >
            <div className="w-[60%]">

                <div className="w-full  h-7  inline-block rounded-lg bg-gray-300"></div>
                <div className="w-[70%]  h-7 inline-block  rounded-lg bg-gray-300"></div>
                <div className="w-[43%]  h-7 inline-block  rounded-lg bg-gray-300"></div>
            </div>
            <div className="size-[96px] bg-gray-300"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;