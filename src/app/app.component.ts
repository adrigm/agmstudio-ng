import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

declare var OverlayScrollbars;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ob: any[] | any;
  windowWidth: number;
  smallDevice: boolean;
  showSidebar: boolean;
  r = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.setScroll();
    this.changeRouter();

    this.windowWidth = window.innerWidth;

    if (this.windowWidth < 992) {
      this.smallDevice = true;
    } else {
      this.smallDevice = false;
    }

    const layoutChanges = this.breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);

    layoutChanges.subscribe(result => {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 992) {
        this.smallDevice = true;
        this.showSidebar = false;
      } else {
        this.smallDevice = false;
        this.showSidebar = true;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth as number;

    if (this.windowWidth < 992) {
      this.smallDevice = true;
      this.showSidebar = false;
    } else {
      this.smallDevice = false;
      this.showSidebar = true;
    }
  }

  setScroll() {
    this.ob = OverlayScrollbars(document.querySelectorAll('.st-scroll'), {
      // className       : 'os-theme-thin-dark',
      resize          : 'none',
      sizeAutoCapable : false,
      // paddingAbsolute : true,
      // autoUpdate      : true,
      scrollbars : {
          autoHide: 'leave',
          autoHideDelay: 100
      },
      overflowBehavior: {
        x: 'h'
      },
      callbacks: {
        onScroll: () => {
          // this.scroll = this.ob.scroll().position.y;
        }
      }
    });
  }

  changeRouter() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map( (route: NavigationEnd) => route.urlAfterRedirects)
    ).subscribe(url => {
      this.ob.map(op => {
        op.scroll({ y : '0px'  });
        this.showSidebar = false;
      });
    });
  }
}
