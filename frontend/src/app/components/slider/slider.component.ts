import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare const $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  
  @Input() anchura!: number;
  @Input('etiquetas') captions!: boolean;
  
  public autor: any;
  @Output() conseguirAutor = new EventEmitter();

  constructor() { 
      this.autor = {
        nombre: "Leonel Rebollini",
        website: "leorebollini.com",
        youtube: "Leo rebollini YT"
      }
  }

  ngOnInit(): void {
    $("#logo").click(function(e:any){
      e.preventDefault();
      $("header").css("background","red")
                  .css("height", "100px");
    });
    $(".galeria").bxSlider({
      mode: 'fade',
      captions: this.captions,
      slideWidth: this.anchura
    });
    // Imprimir el autor antes que el slider
    //this.conseguirAutor.emit(this.autor);
  }
  lanzar(event: any){
    this.conseguirAutor.emit(this.autor);
  }
}
