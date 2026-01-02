import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-slate-800 flex flex-col w-full justify-center items-center text-white'>
         <div className="logo font-bold">
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
            </div>
      <div className='flex justify-center items-center gap-1'>
        Created with <img width={25} src="heart.png" alt=""/> by codewithtaaha
      </div>
    </div>
  )
}

export default Footer
// import React from 'react'

// const Footer = () => {
//     return (
//         <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
//             <div className="logo font-bold text-white text-2xl">
//                 <span className='text-green-500'> &lt;</span>

//                 <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


//             </div>
//             <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by CodeWithHarry </div>
//         </div>
//     )
// }

// export default Footer