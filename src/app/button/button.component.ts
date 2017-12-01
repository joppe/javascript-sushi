import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() private disabled: boolean;

    @Output() private handleClick: EventEmitter<void>;

    constructor() {
        this.handleClick = new EventEmitter();
    }

    onClick(): void {
        this.handleClick.emit();
    }
}
