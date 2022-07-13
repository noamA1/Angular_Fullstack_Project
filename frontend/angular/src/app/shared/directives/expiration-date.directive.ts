import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpirationDate]',
})
export class ExpirationDateDirective {
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    // let trimmed = input.value.replace(/\s+/g, '');
    // if (trimmed.length >= 5) {
    //   trimmed = trimmed.substr(0, 5);
    // }

    const trimmed = input.value
      .replace(/\s+/g, '')
      .slice(0, input.value.indexOf('/') == -1 ? 4 : 5);
    if (trimmed.length > 3) {
      input.value = `${trimmed.slice(0, 2)}/${trimmed.slice(
        trimmed.indexOf('/') == -1 ? 2 : 3
      )}`;
    }
    return input;
    // let numbers = [];
    // for (let i = 0; i <= trimmed.length - 1; i += 2) {
    //   numbers.push(trimmed.substr(i, 2));
    //   // console.log(i);
    //   // console.log(numbers);
    // }
    // // console.log(numbers.join('/'));
    // input.value = numbers.join('/');
  }
}
