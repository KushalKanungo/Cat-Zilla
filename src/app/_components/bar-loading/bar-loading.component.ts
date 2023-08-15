import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-bar-loading',
  templateUrl: './bar-loading.component.html',
  styleUrls: ['./bar-loading.component.scss']
})
export class BarLoadingComponent {
  @Input() height: string = '1.5em'
  @Input() width: string = '3.5em'
}
