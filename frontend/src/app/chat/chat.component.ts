import { Component } from "@angular/core";
import { ChatService } from "./chat.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Message } from "../models/message.model";
import { FormGroup } from "@angular/forms";
import { OnInit } from "@angular/core";

@Component({
    selector: 'app-chat', //app- prefix is important
    standalone: true, 
    //doesn't have to use NgModule, which acted as a middleman for the imports
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl:'./chat.component.html',
})

export class ChatComponent implements OnInit
{
    constructor(private cs:ChatService, private fb: FormBuilder) {}
    history : Message[] = [] //variable : type : value
    loading = false
    chatForm !: FormGroup //shows it'll be initialized before it's used, hence the !
    //! = non-null assertion
    ngOnInit(): void {
        this.chatForm = this.fb.group({message:""})
    }
    onSubmit(): void{
        // this.cs = this.chatForm.value.message.trim();
        const message = this.chatForm.value.message.trim();
        // this.history.role = 'user';
        this.history.push({ role: 'user', content: message });
        // this.history.content = this.cs;
        //history is an array, not an object. `this` doesn't work.
        this.loading = true;
        this.cs.sendMessage(message, this.history).subscribe({
            next : (response) => { 
                // response.reply;
                this.history.push({role:'assistant', content : response.reply});
                this.loading = false;
                this.chatForm.reset()

             },
            error: () => { this.loading = false }
        })

    }
}