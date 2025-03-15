import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedonproductComponent } from './basedonproduct.component';

describe('BasedonproductComponent', () => {
  let component: BasedonproductComponent;
  let fixture: ComponentFixture<BasedonproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasedonproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasedonproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
