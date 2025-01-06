import { Routes } from '@angular/router';
import { PinComponent } from './pin/pin.component';
import { ActivitiesComponent } from './activities/activities.component';

export const routes: Routes = [
    { path: 'pin', component: PinComponent },
    { path: 'activities', component: ActivitiesComponent},
    { path: '', redirectTo: 'pin', pathMatch: 'full'}
];
