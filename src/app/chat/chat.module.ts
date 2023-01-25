import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
// import { TimeAgo } from '../pipes/timeAgo/time-ago.pipe';
// import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage],
  providers: [],
})
export class ChatPageModule {}
