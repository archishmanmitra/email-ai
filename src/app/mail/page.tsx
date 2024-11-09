"use client"
import dynamic from 'next/dynamic'
import React from 'react'
// import Mail from './_components/mail'
import ThemeToggle from '@/components/theme-toggle'

const Mail = dynamic(() => {
  return import('./_components/mail')
},{
  ssr: false
})

const MailPage = () => {
  return (
    <>
      <div className="absolute left-4 bottom-4">
        <ThemeToggle/>
      </div>
      <Mail 
        defaultLayout={[20,30,50]} 
        defaultCollapsed={false} 
        navCollapsedSize={2} 
      />
    </>
  )
}

export default MailPage