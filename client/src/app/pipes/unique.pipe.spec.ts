import { UniquePipe } from './unique.pipe';

describe('UniquePipe', () => {
  it('create an instance', () => {
    const pipe = new UniquePipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter array and remove duplicate values', () => {
    const pipe = new UniquePipe();
    const given = [
      '192.201.30.99',
      '192.201.30.98',
      '192.201.30.59',
      '192.201.30.99'
    ];

    const shoulget = [
      '192.201.30.99',
      '192.201.30.98',
      '192.201.30.59'
    ];

    expect( pipe.transform( given, 'unique' ) ).toEqual(shoulget);
  });

});
