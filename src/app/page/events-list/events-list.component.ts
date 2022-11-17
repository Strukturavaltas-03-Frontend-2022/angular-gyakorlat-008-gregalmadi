import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  eventList$: Observable<Event[]> = this.eventService.getAll();

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    /* this.eventService
      .create({
        id: 1001,
        name: '',
        date: '',
        time: '',
        location: '',
      })
      .subscribe((event) => console.log(event));*/
  }

  onDelete(event: Event) {
    this.eventService
      .remove(event)
      .subscribe((event) =>
        this.eventService
          .getAll()
          .subscribe((events) => console.log('successfully deleted'))
      );
  }
}
