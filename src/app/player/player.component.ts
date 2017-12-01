import {Component, Input, OnInit} from '@angular/core';
import {AudioService} from '../audio.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {
    @Input() src: string;

    private loaded = false;
    private disabled = true;
    private audio: HTMLAudioElement;

    constructor(private audioService: AudioService) {}

    ngOnInit(): void {
        this.audioService.load(this.src).subscribe((audio: HTMLAudioElement): void => {
            this.audio = audio;
            this.loaded = true;

            this.audio.addEventListener('play', (): void => {
                this.disabled = true;
            });
            this.audio.addEventListener('ended', (): void => {
                this.disabled = false;
            });

            this.disabled = false;
        });
    }

    play(): void {
        if (true === this.disabled) {
            return;
        }

        this.disabled = true;
        this.audio.play();
    }
}
