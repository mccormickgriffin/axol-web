import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const code: string = this.route.snapshot.queryParams['code']; 
  }
}
