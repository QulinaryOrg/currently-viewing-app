/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ViewersService } from './viewers.service';

describe('ViewersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewersService]
    });
  });

  it('should ...', inject([ViewersService], (service: ViewersService) => {
    expect(service).toBeTruthy();
  }));
});
