import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { CardHeaderComponent } from "./commons/components/card-header/card-header.component";
import { MenuBarComponent } from "./commons/components/menu-bar/menu-bar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'barbe-shop-ui';

  private routerSubscription?: Subscription

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ){}
  ngOnDestroy(): void {
    if(this.routerSubscription){
      this.routerSubscription.unsubscribe()
    }
  }
  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getRouteTitle(this.activatedRoute))
    ).subscribe(title => this.title = title)
  }
 
  private getRouteTitle( route: ActivatedRoute): string {
    
    let child= route;
    while(child.firstChild){
      child = child.firstChild;
    }
    return child.snapshot.data['title']||'Default Title';
  }
}
