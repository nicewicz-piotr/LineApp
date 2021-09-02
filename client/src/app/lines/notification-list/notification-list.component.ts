import { Component, Input, OnInit } from '@angular/core';
import { Line } from 'src/app/_models/line';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
@Input() line : Line;
  constructor() { }

  ngOnInit(): void {
  }

}
