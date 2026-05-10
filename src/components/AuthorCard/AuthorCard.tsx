import React from 'react'

type AuthorCardDataType = {
    data: string
};


const AuthorCard = ({data}: AuthorCardDataType) => {
    const author = {
        name: data,
        title: "Web developer & Digital Consultant",
        description: "I build websites that perform well on all devices and rank high on search engines. With over 7 years of experience working with brands across the UK, I focus on clean code, mobile-first design, and technical SEO built in from day one."
    }


    return (
    <div className='bg-primary-color rounded-2xl text-text-color-secondary p-8 md:p-10'>
        <span className='text-secondary-color uppercase text-sm'>WRITTEN BY</span>
        <h3 className='mt-2 md:mt-4 mb-1 text-2xl md:text-3xl'>
            {author.name}
        </h3>
        <p className='text-sm'>{author.title}</p>
        <p className='text-sm md:text-m mt-8'>{author.description}</p>
    </div>
  )
}

export default AuthorCard