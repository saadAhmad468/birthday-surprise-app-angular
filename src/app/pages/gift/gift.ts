import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MemoriesComponent } from '../memories/memories';
@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [NgIf, MemoriesComponent],
  templateUrl: './gift.html',
  styleUrl: './gift.css',
})
export class Gift {
  isOpen = false;

  toggleGift() {
    this.isOpen = !this.isOpen;
  }

  showMemories = false;

toggleMemories() {
  this.showMemories = !this.showMemories;
}
}
