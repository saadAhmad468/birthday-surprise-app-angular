import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BirthdayService } from '../../services/birthday';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './timer.html',
  styleUrls: ['./timer.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  name = 'Lado';
  dob = '2000-08-29'; // YYYY-MM-DD
  countdown: any = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  isBirthday = false;

  private intervalId: any;

  constructor(
    private BirthdayService: BirthdayService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isBirthday = this.BirthdayService.isBirthdayToday(this.dob);

    if (this.isBirthday) {
      this.countdown = this.BirthdayService.getZeroCountdown();
      return;
    }

    // Get target date once
    const target = this.BirthdayService.getNextBirthday(this.dob);
    
    // Initialize countdown immediately
    this.updateCountdown(target);

    // Update every 1s for real-time second tick
    this.intervalId = setInterval(() => {
      this.updateCountdown(target);
    }, 1000);
  }

  private updateCountdown(target: Date): void {
    // Recalculate remaining time on every tick
    const newCountdown = this.BirthdayService.getTimeRemaining(target);
    
    // Create new object reference to ensure Angular detects the change
    this.countdown = {
      days: newCountdown.days,
      hours: newCountdown.hours,
      minutes: newCountdown.minutes,
      seconds: newCountdown.seconds
    };

    // Check if birthday is today or countdown is zero (time reached)
    const allZero = 
      this.countdown.days === 0 &&
      this.countdown.hours === 0 &&
      this.countdown.minutes === 0 &&
      this.countdown.seconds === 0;

    if (
      this.BirthdayService.isBirthdayToday(this.dob) ||
      allZero
    ) {
      this.isBirthday = true;
      this.countdown = this.BirthdayService.getZeroCountdown();
      clearInterval(this.intervalId);
    }

    // Manually trigger change detection to ensure view updates
    this.cdr.markForCheck();
  }

  goToGift() {
    this.router.navigate(['/gift']);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
