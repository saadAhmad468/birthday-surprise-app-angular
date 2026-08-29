import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  isBirthdayToday(dob: string): boolean {
    const now = new Date();
    // Keep birthday surprise open until August 31, 2026 11:59:59 PM
    const startDate = new Date(2026, 7, 29, 0, 0, 0, 0); // Month 7 is August (0-indexed)
    const expiryDate = new Date(2026, 7, 31, 23, 59, 59, 999);

    if (now >= startDate && now <= expiryDate) {
      return true;
    }

    const [_, month, day] = dob.split('-').map(Number);
    return (
      now.getMonth() + 1 === month &&
      now.getDate() === day
    );
  }

  getNextBirthday(dob: string): Date {
    const today = new Date();
    const [_, month, day] = dob.split('-').map(Number);

    let target = new Date(
      today.getFullYear(),
      month - 1,
      day,
      0, 0, 0, 0
    );

    if (target.getTime() <= today.getTime()) {
      target.setFullYear(today.getFullYear() + 1);
    }

    return target;
  }

  getZeroCountdown() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  getTimeRemaining(target: Date) {
    const now = new Date().getTime();
    const diff = target.getTime() - now;

    if (diff <= 0) {
      return this.getZeroCountdown();
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }
}
