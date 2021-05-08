 import {parseCSV} from './Processing.js'

  parseCSV('/paris-restaurant.csv').then(res => console.log(res[1]));
