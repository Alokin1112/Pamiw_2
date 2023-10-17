import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherService } from '@core/services/weather.service';
import { MainViewModel } from '@core/view-models/main.view-model';
import { CitySearchComponent } from '@modules/city-search/city-search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'ds-content',
  standalone: true,
  imports: [CommonModule, CitySearchComponent, MatProgressSpinnerModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {

  protected mainViewModel = inject(MainViewModel);

}
