import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChatRequest, Message } from "../models/message.model";
import { Observable } from "rxjs";
import { ChatResponse } from "../models/message.model";

@Injectable({providedIn : 'root'})
export class ChatService
{
    private apiUrl = 'http://localhost:8000/api/chat';
    constructor(private http : HttpClient){}

sendMessage(message: string, history: Message[]) : Observable<ChatResponse>
{
    const body:ChatRequest = {message, history};
    return this.http.post<ChatResponse>(this.apiUrl,body)
}
}