import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="myContainer flex items-center w-2/3 justify-between px-15 h-15">

        <div className="logo font-bold">
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
            </div>
    {/* <ul>
        <li className="flex gap-12">
        <a className='hover:font-bold' href="">Home</a>
        <a className='hover:font-bold' href="">About</a>
        <a className='hover:font-bold' href="">Contact</a>
        </li>
    </ul> */}
    <button className='flex bg-green-600 justify-around items-center px-2 py-1 rounded-full gap-2'>
        <img  className='invert w-8' src="github.svg" alt="" />
        <span className='font-bold'>Github</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
