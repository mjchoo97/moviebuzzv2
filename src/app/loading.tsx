import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex space-x-2 justify-center items-center ">
        <div className="h-8 w-8 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-amber-400 rounded-full animate-bounce"></div>
      </div>
      <div className="loader"></div>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">Loading...</h2>
      <p className="text-gray-500">
        Please wait a moment while we load the content.
      </p>
    </div>
  );
};

export default LoadingPage;
