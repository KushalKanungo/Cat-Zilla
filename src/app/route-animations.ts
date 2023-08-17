import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
  stagger
} from '@angular/animations'

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)'
        })
      ]),
      // Animate the new page in
      query(':enter', [
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ])
  ])

export const slider =
  trigger('routeAnimations', [
    transition('* => isTop', slideTo('top')),
    transition('* => isBottom', slideTo('bottom')),
    transition('isBottom => *', slideTo('top')),
    transition('isTop => *', slideTo('bottom'))
  ])

function slideTo (direction: string): any {
  const optional = { optional: true }
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        [direction]: 0,
        height: '100%',
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ [direction]: '0%' }))
      ])
    ])
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ]
}

export const fadeIn =
trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-100px)' }),
      stagger(-30, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
])
