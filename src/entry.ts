import $ from 'jquery'
import {toUpper} from './utils';

console.log('__FILENAME_LINE__', '> main');

$('#main').text(`Hello, ${toUpper(name)}!`);

