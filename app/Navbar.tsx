import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  const links = [{
    label: 'Dashboard', link: '/'
  }, {
    label: 'Issues', link: '/issue'
  }]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(item => <li key={item.link}><Link href={item.link} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{item.label}</Link></li>)}
      </ul>
    </nav>
  )
}

export default Navbar