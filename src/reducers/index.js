import {combineReducers} from 'redux';
import {cars, carsAreLoading, carModels, imgUrl} from './cars';
import {states} from './states';
import {invaderList, shameCount} from './invaders';
import {toggleModal} from './modal';
import {canViewMobileNav} from './mobile';
import {currentUser, isLoggedIn} from './auth';

export default combineReducers({
  cars,
  carsAreLoading,
  states,
  carModels,
  imgUrl,
  invaderList,
  toggleModal,
  currentUser,
  canViewMobileNav,
  isLoggedIn,
  shameCount
});
