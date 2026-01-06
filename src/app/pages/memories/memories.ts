import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-memories',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './memories.html',
  styleUrl: './memories.css',
})
export class MemoriesComponent {
  openCardIndex: number | null = null;

  memories: string[] = [
    'The first time we met, I knew something special was beginning.',
    'That rainy day when we stayed in and talked for hours.',
    'The way you smile when you\'re happy makes my heart skip a beat.',
    'Every moment with you feels like a beautiful dream.',
    'Your laughter is the most beautiful sound in the world.',
    'The way you care for others shows the beautiful person you are.',
    'I love how we can be silly together and laugh at anything.',
    'Your presence makes every day brighter and more meaningful.',
    'The little things you do show how much you care.',
    'Being with you feels like home, safe and warm.',
    'I cherish every memory we\'ve created together.',
    'You make ordinary moments feel extraordinary.'
  ];

  toggleCard(index: number): void {
    if (this.openCardIndex === index) {
      // Close if clicking the same card
      this.openCardIndex = null;
    } else {
      // Open the clicked card
      this.openCardIndex = index;
      // Scroll the opened card into view smoothly
      setTimeout(() => {
        const cardElement = document.getElementById(`memory-card-${index}`);
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }

  closeCard(): void {
    this.openCardIndex = null;
  }
}

