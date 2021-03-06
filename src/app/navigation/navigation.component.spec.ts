import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { NavigationComponent } from './navigation.component';
import { HomeComponent } from '../home/home.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
  
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent, 
                      
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.debugElement.componentInstance;
    // fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  
  
});
