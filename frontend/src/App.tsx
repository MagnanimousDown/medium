import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { CreateBlog } from './pages/CreateBlog'
import { VerifyInstructionPage } from './pages/VerifyInstructionPage'
import { EmailVerificationHandler } from './pages/EmailVerificationHandler'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          {/* <Route path='/' element={<Blogs />}></Route> */}
          <Route path='/' element={<Signup />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/new-blog' element={<CreateBlog />}></Route>
          <Route path='/verify' element={<VerifyInstructionPage />}></Route>
          <Route path='/verify-email/:token' element={<EmailVerificationHandler />}></Route>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
