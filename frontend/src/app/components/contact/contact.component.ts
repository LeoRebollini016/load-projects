import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  public widthSlider!: number;
  public anchuraToSlider!: number;
  public captions: boolean;
  public autor?: any;

  @ViewChild('text',{static: true}) text: any;

  constructor(private _http: HttpClient) {
    this.captions = true;
    
   }
  ngOnInit(): void {
   // let opcion_clasica = console.log(document.querySelector('#texto').innerHTML);
//    console.log(this.text.nativeElement.textContent);
  }
  cargarSlider(){
    this.anchuraToSlider = this.widthSlider;
  }
  resetearSlider(){
    this.anchuraToSlider = 0;
  }
  getAutor(event:any){
    this.autor = event;
  }
}