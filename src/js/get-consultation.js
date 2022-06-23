const form = document.querySelector('.get-consultation__form'),
    email = document.querySelector('.form-email'),
    name = document.querySelector('.form-name'),
    emailError = document.querySelector('.email-error'),
    nameError = document.querySelector('.name-error'),
    btn = document.querySelector('.get-consultation__btn'),
    success = document.querySelector('.success-notif')


export const getConsultationFormValidate = () => {
    function checkEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email.value.trim())) {
                emailError.style.display = 'none'
                email.classList.remove('input-err')
                emailErr = true
            }else {
                email.classList.add('input-err')
                emailError.style.display = 'block'
                emailErr = false
            }
    }

    let nameErr;
    let emailErr;

    const checkName = () => {
        if(!name.value) {
            name.classList.add('input-err')
            nameError.style.display = 'block'
        } else if(name.value.length < 3) {
            name.classList.add('input-err')
            nameError.style.display = 'block'
        } else {
            name.classList.remove('input-err')
            nameError.style.display = 'none'
        }
    }

    function initOnchange(inputArr) {
        inputArr.forEach(item => {
          item.addEventListener("input", () => {
            if (item.name == "name") checkName();
            else if (item.name == "email") checkEmail();
          });
        });
    }

    const sendFrom = () => {
        if(emailErr == true && name.value) {
            btn.textContent = 'идет отправка...'
            btn.classList.add('success')
            success.style.display = 'block'

            setTimeout(() => {
                name.value = ''; email.value = ''
                btn.textContent = 'Получить консультацию'
                btn.classList.remove('success')
                success.style.display = 'none'
            }, 2000);
        }
    }

    form.addEventListener('submit',  function(e) {
        e.preventDefault(),
        checkEmail()
        checkName()
        console.log(name.value, email.value);
        initOnchange([name, email])
        sendFrom()
    })
}