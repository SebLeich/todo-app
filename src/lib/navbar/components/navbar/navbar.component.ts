import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { showAnimation } from 'src/lib/animations/show.animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ showAnimation ]
})
export class NavbarComponent {
  public currentPath$ = this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => location.pathname)
  );

  constructor(private _router: Router){}
}
