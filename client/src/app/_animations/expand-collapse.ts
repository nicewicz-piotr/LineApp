import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [  
    state('collapsed', style({  
      height: 0,  
      paddingTop: 0,  
      paddingBottom: 0,  
      overflow: 'hidden'      // This will hide the children of the div  
    })),  
  
    state('expanded', style({  
      height: '*',          // Height depends upon the content. So Angular computes it dynamically  
      padding: '*',  
      overflow: 'hidden'  
    })),  
  
    // finally we need to add transition  
    transition('collapsed => expanded', [  
      // Don't want any initially animation at collapsed state. So,  
      animate('300ms ease-out')  
    ]),  
  
    transition('expanded => collapsed', [  
      animate('300ms ease-in')  
    ])  
  ]);