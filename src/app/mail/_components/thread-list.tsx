import { Badge } from '@/components/ui/badge';
import useThreads from '@/hooks/use-threads'
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import DOMPurify from 'dompurify';
import React, { ComponentProps } from 'react'


const ThreadList = () => {
    const { threads, threadId, setThreadId } = useThreads();

    const groupedThreads = threads?.reduce((acc, thread)=>{
        const date = format(thread.emails[0]?.sentAt ?? new Date(), 'yyyy-MM-dd');
        if(!acc[date]){
            acc[date] = [];
        }
        acc[date].push(thread)
        return acc
    }, {} as Record<string, typeof threads>);
  return (
    <div className='max-w-full overflow-y-scroll max-h-[calc(100vh-110px)]'>
        <div className="flex flex-col gap-2 pt-0 p-4">
            {Object.entries(groupedThreads ?? {}).map(([ date, threads ])=>{
                return <React.Fragment key={date} >
                    <div className="text-xs text-muted-foreground font-medium mt-5 first:mt-0">
                        {date}
                    </div>
                    {threads.map(thread=>{
                        return <button key={thread.id} onClick={() => setThreadId(thread.id)} className={cn('flex flex-col items-start gap-1.5 relative transition-all rounded-lg border p-3 text-left text-sm', { 'bg-accent': thread.id===threadId})}>
                            <div className="flex flex-col w-full gap-2">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold text-md">
                                            {thread.emails.at(-1)?.from.name}
                                        </div>
                                    </div>
                                    <div className="ml-auto text-xs text-muted-foreground">
                                        {formatDistanceToNow(thread.emails.at(-1)?.sentAt ?? new Date(), {addSuffix: true})}
                                    </div>
                                </div>
                                <div className="font-medium text-xs">{thread.subject}</div>
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={{
                                 __html: DOMPurify.sanitize(thread.emails.at(-1)?.bodySnippet ?? '',{
                                    USE_PROFILES: { html: true }
                                 })
                                }
                            }></div>
                            {thread.emails[0]?.sysLabels.length && (
                                <div className="flex items-center gap-2">
                                    {thread.emails[0].sysLabels.map(label=>{
                                        return <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                                            {label}
                                        </Badge>
                                    })}
                                </div>
                            )}
                        </button>
                    })}
                </React.Fragment>
            })}
        </div>
    </div>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
    if (["work"].includes(label.toLowerCase())) {
        return "default";
      }
    
      if (["personal"].includes(label.toLowerCase())) {
        return "outline";
      }
    
      return "secondary";
}

export default ThreadList