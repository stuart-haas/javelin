import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faToolbox,
  faPlus,
  faMinus,
  faTimes,
  faHome,
  faShoppingCart,
  faBoxes,
  faTh,
  faUser,
  faAngleDown,
  faCaretUp,
  faCaretDown,
  faTrashAlt,
  faMask,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faStar,
  faToolbox,
  faPlus,
  faMinus,
  faTimes,
  faHome,
  faShoppingCart,
  faBoxes,
  faTh,
  faUser,
  faAngleDown,
  faCaretUp,
  faCaretDown,
  faTrashAlt,
  faMask
);

Vue.component('Icon', FontAwesomeIcon);
