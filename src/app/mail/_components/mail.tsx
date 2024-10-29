"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { TabsList } from '@radix-ui/react-tabs'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import React, { useState } from 'react'
import AccountSwitcher from './account-switcher'

type Props = {
    defaultLayout: number[] | undefined,
    navCollapsedSize: number,
    defaultCollapsed: boolean
}

const Mail = ({defaultLayout = [20, 30, 50], navCollapsedSize, defaultCollapsed}: Props) => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup direction='horizontal' onLayout={(sizes: number[])=>{
            console.log(sizes)
        }}
        className='h-full items-stretch min-h-screen'>
            <ResizablePanel 
            defaultSize={defaultLayout[0]} 
            collapsedSize={navCollapsedSize} 
            collapsible={true} 
            maxSize={40} 
            minSize={15} 
            onCollapse={()=>[
              setIsCollapsed(true)
            ]}
            onResize={()=>{
              setIsCollapsed(false)
            }} className={cn( isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}>
                <div className="flex flex-col h-full flex-1">
                  <div className={cn("flex items-center h-12", isCollapsed? 'h-12': 'px-2')}>
                    {/* Account Switcher */}
                    <AccountSwitcher isCollapsed={isCollapsed}/>
                  </div>
                  <Separator/>
                  {/* Sidebar */}
                  Sidebar
                  <div className="flex-1">
                    {/* Ask AI */}
                    Ask AI
                  </div>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel 
            defaultSize={defaultLayout[1]}
            minSize={30}>
              <Tabs defaultValue='inbox'>
                <div className='flex items-center justify-between px-4 py-2'>
                  <h1 className='font-bold text-xl'>Inbox</h1>
                  <TabsList className='ml-auto bg-zinc-100 rounded-md'>
                    <TabsTrigger value='inbox' className='text-zinc-600 dark:text-zinc-200'>Inbox</TabsTrigger>
                    <TabsTrigger value='done' className='text-zinc-600 dark:text-zinc-200'>Done</TabsTrigger>
                  </TabsList>
                </div>
                <Separator/>
                {/* Search Bar  */}
                Search bar
                <TabsContent value='inbox'>inbox</TabsContent>
                <TabsContent value='done'>done</TabsContent>
              </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[2]}
            minSize={30}>
              Threads Display
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default Mail