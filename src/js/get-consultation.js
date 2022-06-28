const emailCon = document.querySelector('.form-email'),
      nameCon = document.querySelector('.form-name'),
      emailErrorCon = document.querySelector('.email-error'),
      nameErrorCon = document.querySelector('.name-error'),
      btng = document.querySelector('.get-consultation__btn'),
      successCon = document.querySelector('.success-notif')

export const getConsultationFormValidate = () => {
    function checkEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(emailCon.value.trim())) {
                emailErrorCon.style.display = 'none'
                emailCon.classList.remove('input-err')
                emailErrC = true
            }else {
                emailCon.classList.add('input-err')
                emailErrorCon.style.display = 'block'
                emailErrC = false
            }
    }
    let emailErrC;

    const checkName = () => {
        if(!nameCon.value) {
            nameCon.classList.add('input-err')
            nameErrorCon.style.display = 'block'
        } else if(nameCon.value.length < 3) {
            nameCon.classList.add('input-err')
            nameErrorCon.style.display = 'block'
        } else {
            nameCon.classList.remove('input-err')
            nameErrorCon.style.display = 'none'
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

    const sendData = () => {
        if(emailErrC == true && nameCon.value) {
            btng.textContent = 'идет отправка...'
            btng.classList.add('success')
            console.log({
                name: nameCon.value, 
                email: emailCon.value
            });
            setTimeout(() => {
                successCon.style.display = 'block'
            }, 2000);

            setTimeout(() => {
                nameCon.value = ''; emailCon.value = ''
                btng.textContent = 'Получить консультацию'
                btng.classList.remove('success')
                successCon.style.display = 'none'
            }, 3000);
        }
    }

    btng?.addEventListener('click', () => {
        checkEmail()
        checkName()
        initOnchange([nameCon, emailCon])
        sendData()
    })
}