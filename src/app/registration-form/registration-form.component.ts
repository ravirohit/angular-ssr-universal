import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'


/*
Have implemented use cases of formGroup, formControl form builder 
*/
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  disabled = true;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
    this.subscribeForChangeInForm()
    this.initFormGroupWithDefaultValue()
  }
  
  // initialize formGroup with default value during component init time
  initFormGroupWithDefaultValue() {
    //This also allows partial for fully update, so you would still be able to do something like:
    this.registerForm.patchValue({ name: 'rohit',email:'ravi@gmail.com',username:'rohit kumar' });
    // will print false
    console.log("checking if status of dirty bit is changing while updating from ts file:",this.registerForm.dirty) 

    // Below is the way to update selected formcontrol under form group  
    this.registerForm.get('name').setValue("updated using form-control");
  }

  // binding function to variable
  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    } else {
      //alert("invalid form can't submit")
    }
  }

  subscribeForChangeInForm(): void {
    // subscribe the event if formgroup is being updated
    this.registerForm.valueChanges.subscribe(val => {
      console.log("changed val:", val)
       // will print true if form has been updated from UI. it doesn't matter after the update, form has still has same value.
      console.log("is form changed:", this.registerForm.dirty) 
      console.log("status of flag:",this.registerForm.status)
      this.disableOrEnableFunctionBasedOnDirtyBit(this.registerForm.dirty)
      this.disableOrEnableSubmitBtn(this.registerForm.status)
    });
  }

  // disable or enable action if form's content has been updated. 
  disableOrEnableFunctionBasedOnDirtyBit(isFormUpdated) {
    if (isFormUpdated) {
      // Form value has been changed from UI by the user, allow corresponding action.
    } else {
      // Form value has not been changed from UI by the user, allow corresponding action.
    }
  }
  // disable or enable the submit button if form'scontent is valid and invalid
  disableOrEnableSubmitBtn(status) {
    if (status == 'INVALID') {
      // one of form group's content is invalid so disable button
    } else if (status == 'VALID') {
      // enable button  content of the form is valid
    }
  }
}
