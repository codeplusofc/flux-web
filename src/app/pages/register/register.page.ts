import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  captchaToken: boolean = false;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  validarCaptcha() {
    this.captchaToken = true;
  }

  onRegister() {
    if (this.registerForm.valid && this.captchaToken) {
      console.log('Formulário enviado', this.registerForm.value);
    } else {
      console.log('Formulário inválido ou captcha não validado');
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  trimFinal(event: any) {
    const target = event.target;
    target.value = target.value.trim();
  }
}
