import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface MemoryItem {
  id: number;
  image: string;
  title: string;
  category: 'all' | 'dates' | 'calls' | 'family' | 'us';
  categoryLabel: string;
  subtitle: string;
  story: string;
  likes: number;
  isLiked: boolean;
  rotation: number;
}

export interface LoveReason {
  id: number;
  icon: string;
  title: string;
  description: string;
  flipped: boolean;
}

@Component({
  selector: 'app-memories',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './memories.html',
  styleUrl: './memories.css',
})
export class MemoriesComponent implements OnInit {
  activeCategory: string = 'all';
  selectedPhotoIndex: number | null = null;
  wished: boolean = false;
  wishText: string = '';

  // All 17 Uploaded Memories with personalized romantic captions from Saad to Ramsha
  memories: MemoryItem[] = [
    {
      id: 1,
      image: 'images/Me and my finace (On our first date).jpeg',
      title: 'Our Very First Date ☕✨',
      category: 'dates',
      categoryLabel: 'Pehli Date',
      subtitle: 'Where Our Magical Journey Began',
      story: 'Hmari pehli date... Nervousness b thi, dil b tezi se dharak rha tha, but jab pehli baar tumhein dekha toh bas dekhta hi reh gya! Wahin dil haar betha tha.',
      likes: 520,
      isLiked: false,
      rotation: -2
    },
    {
      id: 2,
      image: 'images/Me and my fiance on first date pic 2.jpeg',
      title: 'First Date Sweet Moments 💕',
      category: 'dates',
      categoryLabel: 'Pehli Date',
      subtitle: 'Falling in Love All Over Again',
      story: 'Wo nervous hasi or non-stop baten! Mujhe us waqt hi pta chal gya tha k ye larki meri zindagi ki sab se special or pyaari insaan ha.',
      likes: 480,
      isLiked: false,
      rotation: 2
    },
    {
      id: 3,
      image: 'images/Me and my fiance on velantaine day.jpeg',
      title: "Valentine's Day With My Valentine 🌹",
      category: 'dates',
      categoryLabel: 'Special Occasions',
      subtitle: 'My Forever Valentine',
      story: 'Wese toh har din hi tumhare sath Valentine jesa hota ha, but ye din tumhare sath celebrate kr k laga k duniya ka sab se lucky banda main hoon.',
      likes: 999,
      isLiked: false,
      rotation: -1
    },
    {
      id: 4,
      image: 'images/both of us picture 1.jpeg',
      title: 'Meri Pyari Ladi 👑',
      category: 'us',
      categoryLabel: 'Love of My Life',
      subtitle: 'Pure Radiance & Grace',
      story: 'Ye pyari si smile dekh k din bhar ki saari thakan or pareshani khatam ho jati ha. You are the bestest partner a man can have!',
      likes: 777,
      isLiked: false,
      rotation: 3
    },
    {
      id: 5,
      image: 'images/Me and my fiance.jpeg',
      title: 'Together Forever 💖',
      category: 'us',
      categoryLabel: 'Together Forever',
      subtitle: 'Hamesha Sath',
      story: 'Holding your hand and knowing you are my future wife. Zindagi ma is se zada khubsurat ehsaas koi ni ho sakta.',
      likes: 640,
      isLiked: false,
      rotation: -3
    },
    {
      id: 6,
      image: 'images/Me and my fiance pic 2.jpeg',
      title: 'Sweetest Smiles with You 🥰',
      category: 'us',
      categoryLabel: 'Pure Joy',
      subtitle: 'Mera Safe Space',
      story: 'Jab b hum sath haste hain, lagta ha sari duniya ki khushiyan mil gyi hain. You are loving, caring, darling and sexy — all in one pack!',
      likes: 560,
      isLiked: false,
      rotation: 1
    },
    {
      id: 7,
      image: 'images/Me( Male) and my Fiance (Female).jpeg',
      title: 'Made For Each Other 💍',
      category: 'us',
      categoryLabel: 'Soulmates',
      subtitle: 'Muqadar Tha Ya Jo B Tha...',
      story: 'Pta ni zindagi ma kon sa acha kaam kiya tha jo tu mili! Written in our destiny and blessed by Allah. Love you forever!',
      likes: 888,
      isLiked: false,
      rotation: -2
    },
    {
      id: 8,
      image: 'images/both of us picture.jpeg',
      title: 'Unbreakable Bond 💫',
      category: 'us',
      categoryLabel: 'Cherished Times',
      subtitle: 'Pyar Hamesha Barhta Ha',
      story: 'Chahy hum jitna b lar lain, akhir ma ana toh idhr hi ha. Har larai k baad mera toh pyar or barh jata ha tumhara pta ni! 🙈❤️',
      likes: 490,
      isLiked: false,
      rotation: 2
    },
    {
      id: 9,
      image: 'images/both of us picture 2.jpeg',
      title: 'Beautiful Memories Together ✨',
      category: 'us',
      categoryLabel: 'Memories',
      subtitle: '8 Years of Our Bond',
      story: 'Total of 8 years together and inshallah many more! Har ek picture hamari pyari journey ka khoobsurat hissa ha.',
      likes: 620,
      isLiked: false,
      rotation: -1
    },
    {
      id: 10,
      image: 'images/both of us picture 3.jpeg',
      title: 'Our Forever Smiles 🌸',
      category: 'us',
      categoryLabel: 'Memories',
      subtitle: 'Happy Birthday Meri Jaan',
      story: 'Tumhari ye smile hamesha aisi hi chamakti rahy. I promise I will take care of you and protect your smile for your whole life.',
      likes: 710,
      isLiked: false,
      rotation: 3
    },
    {
      id: 11,
      image: 'images/me and my fiance on video call.jpeg',
      title: 'Late Night Video Calls 🌙📱',
      category: 'calls',
      categoryLabel: 'Video Calls',
      subtitle: 'Ghanton Ki Baten',
      story: 'Late night video calls pe ghanton baten krna, hasna or ek dusry ko dekhna. Distance bilkul feel ni hota jab screen pe tumhara chehra hota ha.',
      likes: 540,
      isLiked: false,
      rotation: -2
    },
    {
      id: 12,
      image: 'images/Me and my fiance on video call pic 2.jpeg',
      title: 'Screen-Filling Laughter 💖',
      category: 'calls',
      categoryLabel: 'Video Calls',
      subtitle: 'Silly Faces & Pure Love',
      story: 'Video call pe silly faces banana, hasna or future k dreams plan krna. Har ek call dil ko sukoon de jati ha.',
      likes: 580,
      isLiked: false,
      rotation: 2
    },
    {
      id: 13,
      image: 'images/Me in office.jpeg',
      title: 'Thinking of You at Work 💼💭',
      category: 'us',
      categoryLabel: 'Always in Mind',
      subtitle: 'Har Lamha Khayal',
      story: 'Office ma chahe jitna b kaam ho, dimagh or dil ma bas tumhara hi khayal chal rha hota ha meri Ladi.',
      likes: 430,
      isLiked: false,
      rotation: -1
    },
    {
      id: 14,
      image: 'images/Me and her father.jpeg',
      title: 'Uncle k Sath Pyara Lamha 🤝💐',
      category: 'family',
      categoryLabel: 'Family Love',
      subtitle: 'Respect & Blessings',
      story: 'Uncle k sath boht izzat or pyar bhara lamha. Unki duain or blessings hamare sath hain, Alhamdulillah.',
      likes: 950,
      isLiked: false,
      rotation: 2
    },
    {
      id: 15,
      image: 'images/my fiance and my mother.jpeg',
      title: 'Maa & You — Meri Zindagi ❤️🌸',
      category: 'family',
      categoryLabel: 'Family Love',
      subtitle: 'My Two Pillars of Happiness',
      story: 'Maa or tumhein ek sath haste huay dekh k dil ko bohot khushi milti ha. You are already family to all of us.',
      likes: 1200,
      isLiked: false,
      rotation: -2
    },
    {
      id: 16,
      image: 'images/My fiance and my all three sisters and my sister childs (during engagment).jpeg',
      title: 'Engagement Celebrations 🎉👨‍👩‍👧‍👦',
      category: 'family',
      categoryLabel: 'Engagement Day',
      subtitle: 'Sisters & Kids Happiness',
      story: 'Engagement wale din teeno behnain or bachy tumhare sath itny khush! Pehly din se hi sab k dil ma tumhari jagah ban gyi.',
      likes: 1100,
      isLiked: false,
      rotation: 1
    },
    {
      id: 17,
      image: 'images/My fiance and my all three sisters and my sister childs (during engagment) pic 2.jpeg',
      title: 'Family Love & Pure Smiles 💕',
      category: 'family',
      categoryLabel: 'Engagement Day',
      subtitle: 'Pyara Sa Rishta',
      story: 'Hamari families ka ek sath mil k celebrate krna. Sab k chehron pe khushi or tumhare liye bohot sara pyar!',
      likes: 1050,
      isLiked: false,
      rotation: -1
    }
  ];

  // Reasons Why I Love You Interactive Flip Cards
  reasons: LoveReason[] = [
    {
      id: 1,
      icon: '✨',
      title: 'All In One Package',
      description: 'You are beautiful, you are loving, you are caring, you are Darling, you are sexy. Allllll in one pack!',
      flipped: false
    },
    {
      id: 2,
      icon: '❤️',
      title: 'Kyun k Tu Mili',
      description: 'Pta ni zindagi ma kon sa acha kaam kiya tha jo tu mili! You are the bestest partner a man can ever have.',
      flipped: false
    },
    {
      id: 3,
      icon: '🛡️',
      title: 'My Forever Promise',
      description: 'I will never let you down. I will always take your side & stand in front of you. No one can even see you with evil eyes.',
      flipped: false
    },
    {
      id: 4,
      icon: '😂',
      title: 'Larai K Baad Wala Pyar',
      description: 'Chahy hum jitna b lar lain akhir ma ana toh idhr hi ha. Har larai k baad mera toh pyar or barh jata ha!',
      flipped: false
    },
    {
      id: 5,
      icon: '🏡',
      title: 'Ghar Jesa Sukoon',
      description: 'Duniya bhar k shor ma tumhare sath ek ajeeb sa sukoon milta ha jese ghar aa gya hoon.',
      flipped: false
    },
    {
      id: 6,
      icon: '🌸',
      title: 'Family Ka Pyar',
      description: 'Maa, behno or bachon k sath jis tarah tum ghul mil gyi ho, dil bohot khush hota ha.',
      flipped: false
    },
    {
      id: 7,
      icon: '🌙',
      title: 'Late Night Talks',
      description: 'Raat ko late night ghanton baten krna, hasna or future k dreams plan krna.',
      flipped: false
    },
    {
      id: 8,
      icon: '💍',
      title: 'Next Birthday Together',
      description: 'Inshallah next birthday akhty celebrate krain gy sath! Forever & always yours.',
      flipped: false
    }
  ];

  ngOnInit(): void {}

  get filteredMemories(): MemoryItem[] {
    if (this.activeCategory === 'all') {
      return this.memories;
    }
    return this.memories.filter(m => m.category === this.activeCategory);
  }

  setCategory(category: string): void {
    this.activeCategory = category;
  }

  toggleLike(memory: MemoryItem, event: Event): void {
    event.stopPropagation();
    memory.isLiked = !memory.isLiked;
    memory.likes += memory.isLiked ? 1 : -1;
  }

  openLightbox(index: number): void {
    this.selectedPhotoIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedPhotoIndex = null;
    document.body.style.overflow = 'auto';
  }

  prevPhoto(): void {
    if (this.selectedPhotoIndex !== null) {
      const list = this.filteredMemories;
      this.selectedPhotoIndex = (this.selectedPhotoIndex - 1 + list.length) % list.length;
    }
  }

  nextPhoto(): void {
    if (this.selectedPhotoIndex !== null) {
      const list = this.filteredMemories;
      this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % list.length;
    }
  }

  flipReason(reason: LoveReason): void {
    reason.flipped = !reason.flipped;
  }

  makeWish(): void {
    this.wished = true;
  }
}


