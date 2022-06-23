import './styles/styles.scss';
import { mobileMenu } from './js/burger-menu'
import {formValidate} from './js/modal-validate-form'
import { menuActive } from './js/menu-active'
import { getConsultationFormValidate } from './js/get-consultation'

mobileMenu()
menuActive()
formValidate()
getConsultationFormValidate()