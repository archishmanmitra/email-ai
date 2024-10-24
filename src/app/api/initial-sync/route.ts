import { Account } from "@/lib/account";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { accountId, userId } = await req.json();
    if(!accountId || !userId){
        return NextResponse.json({ error: 'Missing accountid or userid' }, { status: 400})
    }
     
    const dbAccount = db.account.findUnique({
        where:{
            id: accountId,
            userId
        }
    })
    if(!dbAccount) return NextResponse.json({ error: 'Account not found'}, { status: 400});

    //perform initial sync
    const account = new Account(dbAccount.accessToken);
    const response = await account.performInitialSync();
    if (!response){
        return NextResponse.json({ error: 'Failed to perform initial sync' }, { status: 500 })
    }
    const { emails, deltaToken } = response
    console.log('emails', emails);
    
    // await db.account.update({
    //     where: {
    //         id: accountId,
    //     },
    //     data:{
    //         nextdeltaToken: deltaToken
    //     }
    // })

    console.log('Sync Completed', deltaToken);
    return NextResponse.json({ success: true }, { status: 200 })
}