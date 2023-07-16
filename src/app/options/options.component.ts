import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Input() options: Array<{ value: string, id: number, isCorrect?: boolean }>
  @Input() questionType: string
  @Input() optionsType: string
};
