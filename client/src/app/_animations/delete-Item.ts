import { animate, state, style, transition, trigger } from '@angular/animations';

export const deleteItem = trigger('deleteItem', [
    state('expanded', style({ 
      height: '*', /*display: 'block',*/ 
      color:'black' })),

    state('collapsed', style({ 
      height: '0px', 
      maxHeight: '0', 
      display: 'none', 
      color: 'white' })),

    transition('expanded <=> collapsed', 
    [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ]),
]);