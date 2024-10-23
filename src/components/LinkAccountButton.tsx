"use client"
import React from 'react'
import { Button } from './ui/button'
import { getAurinkoAuthURL } from '@/lib/aurinko'

const LinkAccountButton = () => {
  return (
    <Button onClick={async ()=>{
      const authUrl =await getAurinkoAuthURL('Google')
      window.location.href=authUrl;      
    }}>
      Link acc
    </Button>
  )
}

export default LinkAccountButton