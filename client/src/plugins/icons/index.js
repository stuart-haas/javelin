import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faToolbox,
  faPlus,
  faMinus,
  faTimes,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'fontsource-libre-baskerville';
import 'fontsource-nunito';
import 'fontsource-nunito/600.css';
import 'fontsource-nunito/700.css';

library.add(faStar, faToolbox, faPlus, faMinus, faTimes, faHome);

Vue.component('Icon', FontAwesomeIcon);
