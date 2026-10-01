import  {useState} from 'react'


const Feed = () => {

   const [posts, setPosts] = useState([])

  return (
    <section  className="flex flex-col items-center justify-center h-screen bg-black text-white">
      
      {
        posts.length >0 ? (
            posts.map((post) =>(
                <div key={post.id} className="bg-gray-800 p-4 rounded-lg mb-4 w-1/3">
                    <img src={post.image} alt={post.caption} className="w-full h-auto rounded-xl" />
                </div>
            ))
        ) : (
          <h1 className="text-3xl font-extrabold mb-10 font-serif">No Posts Found</h1>
        )
      }
        
    
    </section>
  )
}

export default Feed