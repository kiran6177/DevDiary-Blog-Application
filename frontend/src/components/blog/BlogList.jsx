import React from 'react'
import MyBlogBox from './MyBlogBox'

function BlogList() {

  return (
    <div className='flex flex-col gap-5'>
        <MyBlogBox/>
        <MyBlogBox/>
    </div>
  )
}

export default BlogList
