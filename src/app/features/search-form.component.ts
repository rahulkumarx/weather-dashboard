import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule],
    template: `
    <div class="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto mt-12">
      <form [formGroup]="form" (ngSubmit)="submit()" class="flex items-end gap-16">

          <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Enter city</mat-label>
              <input matInput formControlName="city" placeholder="e.g., Paris" />
          </mat-form-field>

          <mat-slide-toggle formControlName="unit">°F</mat-slide-toggle>

          <button mat-raised-button color="primary" class="py-2 px-6 font-semibold">Search</button>

      </form>
    </div>
  `
})
export class SearchFormComponent implements OnChanges {
    @Output() search = new EventEmitter<{ city: string; unit: 'metric' | 'imperial' }>();
    @Input() city: string | null = null; 

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            city: [''],
            unit: [false] // false = Celsius, true = Fahrenheit
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['city'] && this.city !== null) {
            this.form.patchValue({ city: this.city });
        }
    }

    submit() {
        const { city, unit } = this.form.value;
        this.search.emit({ city: city!, unit: unit ? 'imperial' : 'metric' });
    }
}
