import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadCardComponent } from './load-card/load-card.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/counterApp', pathMatch: 'full'
  },
  {
    path: 'counterApp', loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        remoteName: 'remoteApp',
        exposedModule: './CardModule'
      }).then(m => m.CardModule).catch(err => console.log(err))
    }
  }
  ,
  {
    path: 'load-card', component: LoadCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
