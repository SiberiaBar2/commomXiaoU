import { createStore } from 'redux'

import reduce from './reduce'

console.log('reduce', reduce);

const store = createStore(reduce)

export default store