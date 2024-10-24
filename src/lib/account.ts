import axios, { AxiosError } from "axios";
import { EmailMessage, SyncResponse, SyncUpdatedResponse } from "./types";

export class Account{
    private token: string;

    constructor(token: string){
        this.token = token;
    }

    private async startSync(){
        const response = await axios.post<SyncResponse>('https://api.aurinko.io/v1/email/sync', {}, {
            headers:{
                Authorization: `Bearer ${this.token}`
            },
            params:{
                daysWithin: 4,
                bodytype: 'html'
            }
        })
        return response.data
    }

    async getUpdatedEmails({deltaToken, pageToken} : {deltaToken?: string, pageToken?: string}) {
        let params: Record<string, string> = {};
        if(deltaToken) params.deltaToken = deltaToken;
        if(pageToken) params.pageToken = pageToken;

        const response = await axios.get<SyncUpdatedResponse>('https://api.aurinko.io/v1/email/sync/updated', {
            headers: {
                Authorization: `Bearer ${this.token}` 
            },
            params
        })
        return response.data
    }

    async performInitialSync(){
        try {
            //start sync
            let syncResponse = await this.startSync()
            while(!syncResponse.ready){
                await new Promise(resolve => setTimeout(resolve, 1000))
                syncResponse = await this.startSync();
            }

            //get bookmark delta token
            let storedDeltaToken: string = syncResponse.syncUpdatedToken

            let updatedResponse = await this.getUpdatedEmails({deltaToken: storedDeltaToken})
            if(updatedResponse.nextDeltaToken){
                //sync is updated
                storedDeltaToken = updatedResponse.nextDeltaToken;
            }
            let allMails: EmailMessage[] = updatedResponse.records;

            //fetch all pages if there are some
            while (updatedResponse.nextPageToken){
                updatedResponse = await this.getUpdatedEmails({pageToken: updatedResponse.nextPageToken})
                allMails = allMails.concat(updatedResponse.records)
                if(updatedResponse.nextDeltaToken){
                    //sync has ended
                    storedDeltaToken = updatedResponse.nextDeltaToken
                }
            }

            console.log('Initial sync completed we have synced ', allMails.length, ' mails');
            
            return {
                emails: allMails,
                deltaToken: storedDeltaToken
            }
        } catch (error) {
            if (axios.isAxiosError(error)){
                console.error('Error during sync', JSON.stringify(error.response?.data, null, 2))
            } else {
                console.error('Error during sync', error)
            }
            throw error;
        }
    }
}