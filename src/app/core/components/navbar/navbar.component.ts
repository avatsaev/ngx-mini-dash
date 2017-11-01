import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'navbar',
    template: `        
      <nav class="navbar">
        <div class="container">
          
            <div class="navbar-brand">
            <a class="navbar-item" href="../">
              NGX MINI-DASH
            </a>
          </div>
            
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
              <a routerLink="/" class="navbar-item is-active">
                Home
              </a>
            </div>
          </div>
        </div>
      </nav>
    `,
    styles: []
})
export class NavbarComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
