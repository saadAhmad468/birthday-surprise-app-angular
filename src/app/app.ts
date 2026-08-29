import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  hearts: Array<{ left: number; size: number; duration: number; delay: number; icon: string }> = [];

  constructor(public musicService: MusicService) {}

  ngOnInit(): void {
    const icons = ['💖', '💕', '✨', '🌸', '💐', '🌹', '❤️', '💞'];
    for (let i = 0; i < 24; i++) {
      this.hearts.push({
        left: Math.random() * 96 + 2,
        size: Math.random() * 18 + 14,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 8,
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }
  }
}

