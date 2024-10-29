"use client"
import { api } from '@/trpc/react'
import { useLocalStorage } from 'usehooks-ts'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { getAurinkoAuthURL } from '@/lib/aurinko'

type Props = {
    isCollapsed: boolean
}

const AccountSwitcher = ({ isCollapsed }: Props) => {
    const { data } = api.account.getAccounts.useQuery();
    const [accountId, setAccountId] = useLocalStorage('accountId', '');

    if(!data) return null;
  return (
    <Select defaultValue={accountId} onValueChange={setAccountId}>
        <SelectTrigger 
        className={cn(
            "flex w-full flex-1 items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
            isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
          )}
          aria-label="Select account">
            <SelectValue placeholder="Select an account">
                <span className={cn({'hidden': !isCollapsed})}>
                  {data?.find(acc => acc.id === accountId)?.emailAddress[0]}
                </span>
                <span className={cn({'hidden': isCollapsed, 'ml-2': true})}>
                  {data?.find(acc => acc.id === accountId)?.emailAddress}
                </span>
            </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {data.map(acc=>{
            return (
              <SelectItem key={acc.id} value={acc.id}>
                {acc.emailAddress}
              </SelectItem>
            )
          })}
          <div onClick={async ()=>{
      const authUrl =await getAurinkoAuthURL('Google')
      window.location.href=authUrl;      
           } } className="flex hover:bg-gray-50 w-full items-center cursor-pointer rounded-sm pl-2 pr-8 py-2 outline-none focus:bg-accent text-sm">
            <Plus className='size-4 mr-1'/>
            Add account
          </div>
        </SelectContent>
    </Select>
  )
}

export default AccountSwitcher