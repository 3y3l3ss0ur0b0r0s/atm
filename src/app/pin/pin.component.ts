import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.css'
})
export class PinComponent {
  constructor(
    private router: Router
  ) { }

  @ViewChild("pinForm", { static: false }) pinForm!: NgForm;

  pin = '';

  validatePin(event: KeyboardEvent) {
    let inputKey = event.key;

    // Check if accepted non-numeric input key was pressed
    let acceptedNonNumericInput = [ "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab" ];
    if (acceptedNonNumericInput.includes(inputKey)) {
      console.log(`Accepted non-numeric input key: ${inputKey}`);
    }
    // Check for non-numeric input
    else if (!/^[0-9]$/.test(inputKey)) {
      event.preventDefault();
      console.log(`Ignoring non-numeric input key: ${inputKey}`);
      return;
    }
    // Check for too-long input
    else if (/[a-z]/i.test(inputKey) && this.pin.length == 4) {
      event.preventDefault();
      console.log(`Ignoring key since input length is already 4: ${this.pin}`);
      return;
    }
    this.pin = this.pinForm.form.controls['pin'].value;
  }

  onSubmit() {
    console.log(`Submitted PIN: ${this.pin}`);
    this.pinForm.reset();
    this.router.navigateByUrl("/activities");
  }
}
