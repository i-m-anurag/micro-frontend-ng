import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title: string = 'Default Title';
  @Output() clicked = new EventEmitter<string>();

  handleClick() {
    this.clicked.emit(`Card clicked: ${this.title}`);
  }

}
