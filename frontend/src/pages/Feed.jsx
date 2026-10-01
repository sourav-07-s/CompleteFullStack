import  {useState , useEffect} from 'react'
import axios from 'axios'


const Feed = () => {

   const [posts, setPosts] = useState([])


   useEffect(()=>{

    axios.get('http://localhost:3000/posts')
             .then((res)=>{
                console.log(res.data) ;
                setPosts(res.data.posts) ;
             })
   } , [])

  return (
    <section  className="flex flex-col items-center justify-center h-screen bg-black text-white">
      
      {
        posts.length >0 ? (
            posts.map((post) =>(
                <div key={post._id} className="bg-gray-800 p-4 rounded-lg mb-4 w-1/3">
                    <img src={post.Image} alt={post.caption} className="w-full h-auto rounded-xl" />
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