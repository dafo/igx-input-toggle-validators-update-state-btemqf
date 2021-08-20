import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  styleUrls: ['./reactive-forms.component.scss'],
  templateUrl: './reactive-forms.component.html'
})
export class ReactiveFormsSampleComponent implements OnInit {
  public genres = [];
  public user: FormGroup;
  public minTime = '06:15:30';
  public maxTime = '09:15:30';
  public minDate = new Date();
  public maxDate = new Date(
    new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 14
    )
  );

  private isValidatorReqApplied = true;

  constructor(fb: FormBuilder) {
    this.user = fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      genres: ['', Validators.required],
      movie: ['', Validators.required]
    });

    this.genres = [
      {
        type: 'Action',
        movies: ['The Matrix', 'Kill Bill: Vol.1', 'The Dark Knight Rises']
      },
      {
        type: 'Adventure',
        movies: ['Interstellar', 'Inglourious Basterds', 'Inception']
      },
      // tslint:disable-next-line:object-literal-sort-keys
      {
        type: 'Comedy',
        movies: [
          'Wild Tales',
          'In Bruges',
          'Three Billboards Outside Ebbing, Missouri',
          'Untouchable',
          '3 idiots'
        ]
      },
      { type: 'Crime', movies: ['Training Day', 'Heat', 'American Gangster'] },
      {
        type: 'Drama',
        movies: [
          'Fight Club',
          'A Beautiful Mind',
          'Good Will Hunting',
          'City of God'
        ]
      },
      { type: 'Biography', movies: ['Amadeus', 'Bohemian Rhapsody'] },
      { type: 'Mystery', movies: ['The Prestige', 'Memento', 'Cloud Atlas'] },
      { type: 'Musical', movies: ['All That Jazz'] },
      { type: 'Romance', movies: ['Love Actually', 'In The Mood for Love'] },
      { type: 'Sci-Fi', movies: ['The Fifth Element'] },
      { type: 'Thriller', movies: ['The Usual Suspects'] },
      { type: 'Western', movies: ['Django Unchained'] }
    ];
  }

  ngOnInit(): void {
    /* Initially set errors for all controls */
    requestAnimationFrame(() => {
      Object.keys(this.user.controls).forEach(key => {
        this.user.get(key).markAsTouched();
        this.user.get(key).setErrors({ invalid: true });
      });
    });
  }

  public onSubmit() {
    console.log(this.user);
  }

  public toggle() {
    Object.keys(this.user.controls).forEach((key: string) => {
      if (this.isValidatorReqApplied) {
        this.user.controls[key].setValidators(Validators.required);
      } else {
        this.user.controls[key].clearValidators();
      }
      this.user.controls[key].updateValueAndValidity();

      console.log(key + ' status: ' + this.user.controls[key].status);
    });
    console.log('--------');

    this.isValidatorReqApplied = !this.isValidatorReqApplied;
  }
}
