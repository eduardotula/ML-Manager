import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Get data from localStorage
  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Save data to localStorage
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove data from localStorage
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}