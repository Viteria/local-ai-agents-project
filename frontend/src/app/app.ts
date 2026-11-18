import { Component, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  private http = inject(HttpClient);
  isLoading = signal(false);
  lessonHtml = signal('')
  extractVocabulary(){
    this.isLoading.set(true);
    console.log('sendToApi')
    this.http.post('/api/vocabulary',{html:this.lessonHtml()}).pipe(finalize(()=>{
      this.isLoading.set(false);
    })).subscribe({next:(res)=>{
      console.log('vocabulary',res);
      },
    error:(err)=>{
      console.error('Extraction failed:',err)
    }})
  }


}
