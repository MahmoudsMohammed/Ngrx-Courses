import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import {
  routerReducer,
  RouterState,
  StoreRouterConnectingModule,
} from "@ngrx/router-store";

import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule } from "@ngrx/data";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { authorizedUserGuard } from "./guards/authorized-user.guard";
import { loggerMetaReducer } from "./app.metaReducers";

const routes: Routes = [
  {
    path: "courses",
    canActivate: [authorizedUserGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(
      { router: routerReducer },
      // Same As Dev Tool make runtimeChecks works in dev mode to avoid errors at production
      {
        metaReducers: [loggerMetaReducer],
        runtimeChecks: {
          // Prevent Mutate State inside of the reducer
          strictStateImmutability: !environment.production,
          // Prevent mutate action object inside reducer or effect
          strictActionImmutability: !environment.production,
          strictStateSerializability: !environment.production,
          strictActionSerializability: !environment.production,
          // Ensures actions are dispatched inside Angular’s zone
          strictActionWithinNgZone: !environment.production,
          // Action is not defined twice anywhere in the app.
          strictActionTypeUniqueness: !environment.production,
        },
      },
    ),
    EffectsModule.forRoot(),
    // Provide Time Travel Debugging
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
