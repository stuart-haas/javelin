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
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faArrowLeft,
  faArchive,
  faBan,
  faUnlock,
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
  faArrowUp,
  faCaretUp,
  faCaretDown,
  faTrashAlt,
  faMask,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
  faArchive,
  faBan,
  faUnlock
);

Vue.component('Icon', FontAwesomeIcon);
