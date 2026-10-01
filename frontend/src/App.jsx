import React from 'react'
import {BrowserRouter as Router , Routes , Route }  from 'react-router-dom'
import CreatePost from "./pages/CreatePost"
import Feed from "./pages/Feed"




const App = () => {
  return (
    <Router>
       <Routes>
                 <Route path="/" element= {<h1> Home Page</h1>} />
                  <Route path="/about" element= {<h1> About Page</h1>} />
                  <Route path="/contact" element= {<h1> Contact Page</h1>} />
                  <Route path="/create-post" element= {<CreatePost />} />
                  <Route path="/feed" element= {<Feed />} />
      </Routes>
    </Router>
  )
}

export default App