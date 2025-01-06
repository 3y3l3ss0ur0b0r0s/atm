import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  constructor(
    private router: Router
  ) { }

  balance = {
    checking: parseFloat((Math.random() * 450 + 50).toFixed(2)),
    savings: parseFloat((Math.random() * 9000 + 1000).toFixed(2))
  }
  
  checkingAmount = 0.00;
  savingsAmount = 0.00;

  @ViewChild("checkingForm", { static: false }) checkingForm!: NgForm;
  @ViewChild("savingsForm", { static: false }) savingsForm!: NgForm;

  validateAmount(event: KeyboardEvent, account: string) {
    let inputKey = event.key;
    let currentInput;

    if (account === 'checking') {
      currentInput = this.checkingAmount;
    }
    else if (account === 'savings') {
      currentInput = this.savingsAmount;
    }
    else {
      throw new Error(`Invalid account: ${account}`);
    }

    let acceptedNonNumericInput = [ "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab" ];
    
    // Check if input key is 'E', 'e', or beyond input is already 2 decimal places
    if (!acceptedNonNumericInput.includes(inputKey) && ( /E/i.test(inputKey) || /\.\d{2}/.test(currentInput.toString()) )) {
      event.preventDefault()
    }
  }

  onSubmit(event: Event, account: string) {
    event.preventDefault();
    let form;
    let amount;
    let balance;

    // Check for valid account type
    if (account === 'checking') {
      form = this.checkingForm;
      balance = this.balance.checking;
    }
    else if (account === 'savings') {
      form = this.savingsForm;
      balance = this.balance.savings;
    }
    else {
      throw new Error(`Invalid account: ${account}`);
    }

    amount = parseFloat(form.controls['amount'].value);

    // Check for valid transaction type and performa actions
    let transactionType = form.form.controls['transaction'].value;
    if (transactionType == 'withdraw') {
      // Check for sufficient funds (withdrawals only)
      if (amount > balance) {
        alert(`Balance of ${balance} is insufficient to withdraw ${amount}.`);
        return;
      }
      if (account === 'checking') {
        this.balance.checking -= amount;
      }
      else {
        this.balance.savings -= amount;
      }
    } 
    else if (transactionType == 'deposit') {
      if (account === 'checking') {
        this.balance.checking += amount;
      }
      else {
        this.balance.savings += amount;
      }
    } 
    else {
      throw new Error(`Invalid transaction type: ${transactionType}`);
    }

    // Reset form
    form.reset();
  }

  onSignOut() {
    console.log(`Signing out`);
    this.checkingForm.reset();
    this.savingsForm.reset();
    this.router.navigateByUrl("/pin");
  }
}
