"use client"
import dynamic from 'next/dynamic'
import React from 'react'
// import Mail from './_components/mail'
const Mail = dynamic(()=>{
  return import('./_components/mail')
},{
  ssr: false
})

const MailPage = () => {
  return (
    <Mail defaultLayout={[20,30,50]} defaultCollapsed={false} navCollapsedSize={20}/>
  )
}

export default MailPage