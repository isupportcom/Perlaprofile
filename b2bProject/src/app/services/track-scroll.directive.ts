import { Directive } from '@angular/core';

@Directive({
  selector: '[appTrackScroll]',
  host: {'(window:scroll)': 'track($event)'}
})
export class TrackScrollDirective {

  track($event: Event) {
    console.debug("Scroll Event", $event);
  }


}
