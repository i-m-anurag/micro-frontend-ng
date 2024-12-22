import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, NgModuleFactory, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-load-card',
  templateUrl: './load-card.component.html',
  styleUrls: ['./load-card.component.scss']
})
export class LoadCardComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }



  async loadCard() {
    const module = await loadRemoteModule({
      remoteEntry: 'http://localhost:4300/remoteEntry.js',
      remoteName: 'remoteApp',
      exposedModule: './CardComponent'
    });
    console.log(module)
    const moduleFactory = module.default as NgModuleFactory<any>;
    const { CardComponent } = module;
    console.log(CardComponent)
    // Dynamically create the component
    const componentRef = this.viewContainerRef.createComponent(CardComponent);
    //@ts-ignore
    componentRef.instance.title = 'Dynamic Title from Host App'; // Set @Input
    //@ts-ignore
    componentRef.instance.clicked.subscribe((message: string) => {
      console.log('Event from CardComponent:', message); // Listen to @Output
    });
  }

}
