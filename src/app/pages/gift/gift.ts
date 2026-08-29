import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MemoriesComponent } from '../memories/memories';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [NgIf, NgFor, MemoriesComponent],
  templateUrl: './gift.html',
  styleUrl: './gift.css',
})
export class Gift {
  isOpen = false;
  showMemories = true;
  giftConfetti: Array<{ left: number; color: string; delay: number; size: number }> = [];

  constructor(public musicService: MusicService) {}

  toggleGift(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.triggerConfetti();
      if (!this.musicService.isPlaying) {
        this.musicService.play();
      }
    }
  }

  private triggerConfetti(): void {
    const colors = ['#ff4d88', '#ffd166', '#a0c4ff', '#ff99c8', '#bdb2ff', '#ffffff'];
    this.giftConfetti = [];
    for (let i = 0; i < 35; i++) {
      this.giftConfetti.push({
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        size: Math.random() * 8 + 6
      });
    }
  }

  scrollToMemories(): void {
    const el = document.getElementById('memories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

