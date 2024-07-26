import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[resaltado]'
})
export class ResaltadoDirective {

  constructor(public el: ElementRef) {
    
  }
  ngOnInit(){
    var element = this.el.nativeElement;
    element.style.background = "pink";
    element.style.padding = "20px";
    element.style.marginTop = "15px";
    element.style.color = "white";
   // var p :string; 
 //   p = element.innerText;
 //   var p = "La pagina de contacto esta en modo de mantenimiento.";
  //  this.el.nativeElement.textContent = p;
   // console.log(p);
   element.innerText = "La pagina de contacto entro en modo de mantenimiento.";
   element.innerText = element.innerText.toUpperCase().replace("ENTRO","ESTA");

  }

}