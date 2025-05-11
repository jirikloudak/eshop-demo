import { Directive, OnInit } from '@angular/core';

@Directive()
export abstract class BasePageComponent implements OnInit {
  ngOnInit(): void {
    console.log(`Víš, že Alza byla založena v roce 1994?`);
  }
}