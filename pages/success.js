import Link from "next/link";
const Success = () => {
  return (
    <div
      className="flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-indigo-600
    to-blue-400"
    >
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-blue-600 text-9xl">Oh Yes!</h2>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Hurre...</span> Post created
            Successfully
          </h6>

          <Link href="/">
            <div className="cursor-pointer mt-5 bg-blue-600 text-white py-2 px-4 rounded-md font-semibold tracking-tight">
              Create New Post
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
