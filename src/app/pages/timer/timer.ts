import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { BirthdayService } from '../../services/birthday';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './timer.html',
  styleUrls: ['./timer.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  name = 'Ramsha';
  nickname = 'Ladi';
  dob = '2000-08-29'; // YYYY-MM-DD
  countdown: any = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  isBirthday = false;
  candleBlown = false;
  showConfetti = false;
  confettiPieces: Array<{ left: number; color: string; delay: number; size: number }> = [];

  private intervalId: any;

  constructor(
    private BirthdayService: BirthdayService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public musicService: MusicService
  ) {}

  ngOnInit(): void {
    this.isBirthday = this.BirthdayService.isBirthdayToday(this.dob);

    if (this.isBirthday) {
      this.countdown = this.BirthdayService.getZeroCountdown();
      this.generateConfetti();
      return;
    }

    const target = this.BirthdayService.getNextBirthday(this.dob);
    this.updateCountdown(target);

    this.intervalId = setInterval(() => {
      this.updateCountdown(target);
    }, 1000);
  }

  private generateConfetti(): void {
    const colors = ['#ff4d88', '#ffd166', '#a0c4ff', '#ff99c8', '#bdb2ff', '#ffffff', '#ffc6ff'];
    this.confettiPieces = [];
    for (let i = 0; i < 40; i++) {
      this.confettiPieces.push({
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        size: Math.random() * 8 + 6
      });
    }
  }

  blowCandle(): void {
    if (this.candleBlown) return;
    this.candleBlown = true;
    this.showConfetti = true;
    
    // Auto-start soft music if not already playing
    if (!this.musicService.isPlaying) {
      this.musicService.play();
    }

    this.cdr.markForCheck();
  }

  private updateCountdown(target: Date): void {
    const newCountdown = this.BirthdayService.getTimeRemaining(target);
    
    this.countdown = {
      days: newCountdown.days,
      hours: newCountdown.hours,
      minutes: newCountdown.minutes,
      seconds: newCountdown.seconds
    };

    const allZero = 
      this.countdown.days === 0 &&
      this.countdown.hours === 0 &&
      this.countdown.minutes === 0 &&
      this.countdown.seconds === 0;

    if (this.BirthdayService.isBirthdayToday(this.dob) || allZero) {
      this.isBirthday = true;
      this.countdown = this.BirthdayService.getZeroCountdown();
      this.generateConfetti();
      clearInterval(this.intervalId);
    }

    this.cdr.markForCheck();
  }

  goToGift(): void {
    if (!this.musicService.isPlaying) {
      this.musicService.play();
    }
    this.router.navigate(['/gift']);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

