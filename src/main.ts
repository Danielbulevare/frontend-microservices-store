import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, initKeycloak } from './app/app.config';
import { AppComponent } from './app/app.component';

initKeycloak().then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
});
