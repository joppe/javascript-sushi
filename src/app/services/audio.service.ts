import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';

@Injectable()
export class AudioService {

    load(src: string): Observable<HTMLAudioElement> {
        return fromPromise(new Promise<HTMLAudioElement>((resolve: Function, reject: Function) => {
            const audio: HTMLAudioElement = document.createElement('audio');

            audio.addEventListener('canplaythrough', () => {
                resolve(audio);
            });

            audio.addEventListener('error', () => {
                reject(audio);
            });

            audio.setAttribute('src', src);
        }));
    }
}
