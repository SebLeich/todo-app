import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWrapperComponent implements AfterContentInit {
	@Input() public label: string | undefined;

  public isCheckbox: boolean = false;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _elementRef: ElementRef) { }

  public ngAfterContentInit(): void {
    this._initClasses();
  }

  public onClick(event: MouseEvent): void {
    if(!this.isCheckbox || event.target === this.input){
      return;
    }

    this.input?.click();
  }

  private _initClasses(): void {
    this.isCheckbox = this.input?.type === 'checkbox' ? true : false;
    this._changeDetectorRef.detectChanges();
  }

  public get input(): HTMLInputElement | null {
    return this._elementRef.nativeElement.querySelector('input');
  }
}
