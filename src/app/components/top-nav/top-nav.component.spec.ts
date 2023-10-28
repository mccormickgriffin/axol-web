import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavComponent } from './top-nav.component';
import { ProfileNavComponent } from '../profile-nav/profile-nav.component';
import { HttpClientModule } from '@angular/common/http';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent, ProfileNavComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
