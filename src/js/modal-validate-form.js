// import {Modal} from 'bootstrap/dist/js/bootstrap.bundle.js'
import {Modal} from "bootstrap/js/src/modal";

const form = document.querySelector('.modal-form'),
      name = document.querySelector('.name'),
      email = document.querySelector('.email'),
      textarea = document.querySelector('.textarea'),
      textError = document.querySelector('.warning-textarea-error'),
      nameError = document.querySelector('.warning-name-error'),
      emailError = document.querySelector('.warning-email-error'),
      btn = document.querySelector('.modal-send-btn'),
      success = document.querySelector('.success-notification'),
      modalDiv = document.querySelector('#modal')

export const formValidate = () => {
    function checkEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email.value.trim())) {
            emailError.textContent = ""
            email.classList.remove('input-err')
        }else {
            email.classList.add('input-err')
            emailError.textContent = 'поле обязательно*'
        }
    }

    const check = () => {
        if(name.value.length > 3 && textarea.value.length && !emailError.textContent) {
            btn.textContent = "идет отправка..."
            btn.classList.add('success')
            success.style.display = "block"

            setTimeout(() => {
                modalDiv.Modal('hide')
            }, 2000);

        }
    }

    const checkField = () => {
        if(!name.value) {
            name.classList.add('input-err')
            nameError.textContent = 'поле обязательно*'
        } else if(name.value.length < 3) {
            name.classList.add('input-err')
            nameError.textContent = 'длина должна быть не менее 3 символов'
        } else {
            name.classList.remove('input-err')
            nameError.textContent = ''
        }
    }

    const checkField2 = () => {
        if(!textarea.value) {
            textarea.classList.add('input-err')
            textError.textContent = 'поле обязательно*'
        } else if(textarea.value.length < 3) {
            textarea.classList.add('input-err')
            textError.textContent = 'длина должна быть не менее 3 символов'
        } else {
            textarea.classList.remove('input-err')
            textError.textContent = ''
        }
    }


    function initOnchange(inputArr) {
        inputArr.forEach((item) => {
          item.addEventListener("input", () => {
            if (item.name == "name") {
              checkField();
            } else if (item.name == "email") {
              checkEmail();
            } else if (item.name == 'textarea') {
                checkField2()
            }
          });
        });
      }

    // form.addEventListener('submit', e => {
    //     e.preventDefault()
    //     checkEmail()
    //     check()
    //     checkField()
    //     checkField2()
    //     initOnchange([name, email, textarea])
    // })
}