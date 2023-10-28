import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavComponent } from './profile-nav.component';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileNavComponent', () => {
  let component: ProfileNavComponent;
  let fixture: ComponentFixture<ProfileNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileNavComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ProfileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
