import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get an item from local storage', () => {
    const key = 'testKey';
    const value = { name: 'John', age: 30 };

    service.setItem(key, value);
    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should handle null when getting an item that does not exist', () => {
    const key = 'nonExistentKey';

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should remove an item from local storage', () => {
    const key = 'toBeRemoved';
    const value = { data: 'some data' };

    service.setItem(key, value);
    service.removeItem(key);

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should clear all items from local storage', () => {
    const key1 = 'item1';
    const key2 = 'item2';
    const value1 = { data: 'value1' };
    const value2 = { data: 'value2' };

    service.setItem(key1, value1);
    service.setItem(key2, value2);
    service.clear();

    const retrievedValue1 = service.getItem(key1);
    const retrievedValue2 = service.getItem(key2);

    expect(retrievedValue1).toBeNull();
    expect(retrievedValue2).toBeNull();
  });
});