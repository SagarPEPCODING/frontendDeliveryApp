import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements OnInit {
  title = '1 WAY DATA BINDING';
  imgSrc: string = 'https://via.placeholder.com/100';
  colSpan = 2;
  class1: string = 'myclass';
  count: number = 0;
  array: string[] = [];
  

  constructor() {}

  booleanVal: boolean = false;
  boolCOunt: number = 0;

  /**
   * classBinding
   */
  public classBinding() {
    return this.booleanVal;
  }

  /**
   * changeBoolVal
   */
  public changeBoolVal() {
    this.boolCOunt += 1;
    if(this.boolCOunt == 10) {
      this.booleanVal = !this.booleanVal;
    }
  }

  /**
   * onCLick
   */
  public onCLick() {
    this.array.push('count' + this.count);
    console.log('onCLick is clicked...');
    this.count += 1;
  }

  innerHtmlText: string = '';
  arrayStr: string[] = [];

  /**
   * inputGiven
   */
  public inputGiven(event: any) {
    this.innerHtmlText = event.target.value;
    console.log(event.target.value);
  }

  /**
   * pushElement
   */
  public pushElement() {
    this.arrayStr.push(this.innerHtmlText);
    this.innerHtmlText = '';
    let InputTag = <HTMLInputElement>document.getElementById('input');
    InputTag.value = '';
  }

  /**
   * buttonClicked
   */
  public buttonClicked() {
    this.pushElement();
  }

  /**
   * buttonDblClicked
   */
  public buttonDblClicked() {
    this.pushElement();
  }

  /**
   * buttonMouseUP
   */
  public buttonMouseUP() {
    this.pushElement();
  }

  /**
   * buttonMouseDown
   */
  public buttonMouseDown() {
    this.pushElement();
  }

  mouseUpString: string = '';
  arrMouseUpTRing: any[] = [];
  public mouseUpCLicked() {
    console.log('Mouse UP function called');
    this.arrMouseUpTRing.push(this.mouseUpString);
  }

  /**
   * mouseUpInput
   */
  public mouseUpInput(event: any) {
    this.mouseUpString = event.target.value;
    console.log(this.mouseUpString);
  }

  ngOnInit(): void {}
}
