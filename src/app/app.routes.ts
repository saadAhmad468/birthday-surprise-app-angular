import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './pages/timer/timer';
import { Gift } from './pages/gift/gift';

export const routes: Routes = [
  { path: '', component: TimerComponent },
  { path: 'gift', component: Gift },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
