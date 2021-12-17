import { Message } from './../../services/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

 
  messages: Observable<Message[]>;
  newMsg = '';
  selectedAssistant="";
  
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    const supportAssistants = ['t1@gmail.com','t2@gmail.com', 't3@gmail.com','t4@gmail.com'];
    const rndInt = Math.floor(Math.random() * 4) + 1;
    this.messages = this.chatService.getChatMessages();
    this.selectedAssistant = supportAssistants[rndInt];
    console.log('Selected Assistant===>',supportAssistants[rndInt-1]);
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg,this.selectedAssistant).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
