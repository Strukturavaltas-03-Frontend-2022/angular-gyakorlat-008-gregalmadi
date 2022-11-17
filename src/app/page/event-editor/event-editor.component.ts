import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap((params) => this.eventService.get(params['id']))
  );

  maxEventId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((events) => {
      this.maxEventId = events.slice(-1)[0].id;
    });
  }

  onUpdate(eventForm: NgForm, event: any) {
    if (event.id === 1001) {
      let newEvent = new Event();
      newEvent.id = this.maxEventId + 1;
      this.eventService
        .create(newEvent)
        .subscribe((event) => this.router.navigate(['/']));
    } else {
      this.eventService
        .update(event)
        .subscribe((event) => this.router.navigate(['/']));
    }
  }
}
