import { Component } from '@angular/core';

@Component({
  selector: 'app-paper-listing',
  templateUrl: './paper-listing.component.html',
  styleUrls: ['./paper-listing.component.scss']
})
export class PaperListingComponent {

  query = ''
  onSearch(): void {
    console.log(this.query)
  }

}
