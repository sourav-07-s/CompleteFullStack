import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <>
      <div>
        <section className="flex flex-col gap-2.5 items-center justify-start min-h-screen w-full bg-black text-white">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-2xl bg-gray-800 p-3 sm:p-4 rounded-lg mb-4"
              >
                <img
                  src={post.Image}
                  alt={post.caption}
                  className="w-full h-auto rounded-xl object-cover"
                />

                <p className="mt-2 text-white text-sm sm:text-base wrap-break-words">
                  {post.caption}
                </p>
              </div>
            ))
          ) : (
            <h1 className="text-3xl font-extrabold mb-10 font-serif">
              No Posts Found
            </h1>
          )}
        </section>
      </div>
    </>
  );
};

export default Feed;
