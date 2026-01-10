import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import {
  isLoggedInSelector,
  isLoggedOutSelector,
} from "./auth/store/auth.selector";
import { AuthActions } from "./auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  loading = true;

  constructor(private router: Router, private _store: Store) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this._store.pipe(select(isLoggedInSelector));
    this.isLoggedOut$ = this._store.pipe(select(isLoggedOutSelector));
  }

  logout() {
    this._store.dispatch(AuthActions.logoutAction());
  }
}
