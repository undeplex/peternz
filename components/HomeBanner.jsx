import { ChatBubbleBottomCenterIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid'
import { ArrowBigDown, ArrowDown, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HomeBanner() {
  return (
    <div>
        
        <h1 className="md:text-5xl text-4xl font-bold text-center bg-red-400 play text-transparent dark:from-blue-50 dark:to-gray-500 bg-clip-text bg-gradient-to-r mb-0 from-green-400 to-blue-500">Grow,Learn and have fun Reading 
          
           </h1>
        <p className=" break-al my-4 text-center md:text-xl dark:text-gray-200  md:w-8/12 mx-auto">
            Less Theory,Cristal clear Tips & Tricks,countless project based Blogs , D PeterNz is all about results & tangible ware, So Let's Do it all along
        </p>
        <div className="flex flex-col sm:flex-row w-max mx-auto gap-6">


        <Link href="/">
        {/* <ArrowDown className="mx-auto"/> */}

        <button className="dark  flex items-center dark:bg-white dark:text-black bg-black text-white  px-5 py-3 rounded-full mx-auto ">Voir la liste de tous les articles

              <ArrowLeft className="inline"/>

        </button>
        </Link>
        <Link href="/">
        <button className=" text-gray-950 dark:border-gray-300 border-gray-700 dark:text-gray-200 border px-5 py-3 rounded-full mx-auto  block mb-4">
          Nous proposer un sujet <ChatBubbleBottomCenterIcon className="size-5 inline"/>
          </button>
        </Link>
        </div>
    </div>
  )
}
