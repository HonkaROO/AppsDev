// import { Component } from '@angular/core';
// import { Tutorial } from '../../models/tutorial.model';
// import { TutorialService } from '../../services/tutorial.service';

// @Component({
//   selector: 'app-add-tutorial',
//   templateUrl: './add-tutorial.component.html',
//   styleUrls: ['./add-tutorial.component.css']
// })
// export class AddTutorialComponent {

//   tutorial: Tutorial = {
//     title: '',
//     description: '',
//     published: false
//   };
//   submitted = false;

//   constructor(private tutorialService: TutorialService) { }

//   saveTutorial(): void {
//     const data = {
//       title: this.tutorial.title,
//       description: this.tutorial.description
//     };

//     this.tutorialService.create(data)
//       .subscribe({
//         next: (res) => {
//           console.log(res);
//           this.submitted = true;
//         },
//         error: (e) => console.error(e)
//       });
//   }

//   newTutorial(): void {
//     this.submitted = false;
//     this.tutorial = {
//       title: '',
//       description: '',
//       published: false
//     };
//   }

// }

import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { SentimentAnalysisService } from '../../services/sentiment-analysis.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial = {
    title: '',
    description: '',
    published: false,
    comment: '',
    sentiment: ''
  };
  submitted = false;
  sentimentResult: string | null = null;

  constructor(
    private tutorialService: TutorialService, 
    private sentimentAnalysisService: SentimentAnalysisService,
    // private http: HttpClient
  
  ) { }

  ngOnInit(): void {
  }

  analyzeSentiment(): void {
    this.sentimentAnalysisService.analyzeSentiment(this.tutorial.comment).subscribe(
      response => {
        this.sentimentResult = response.sentiment;
        this.tutorial.sentiment = response.sentiment;
      },
      error => {
        console.log(error);
      }
    );
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      comment: this.tutorial.comment,
      sentiment: this.tutorial.sentiment,
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
      comment: '',
      sentiment: ''
    };
  }

}
