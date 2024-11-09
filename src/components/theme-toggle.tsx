'use client';
import { useTheme } from 'next-themes';
import React from 'react'
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
  return (
    <Button onClick={toggleTheme} variant={'outline'} size='icon'>
        <SunIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0 dark:rotate-90'/>
        <MoonIcon className=' absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:scale-100 dark:rotate-0'/>
    </Button>
  )
}

export default ThemeToggle