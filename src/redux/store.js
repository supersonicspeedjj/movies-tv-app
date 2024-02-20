import dataSlice from './slice'
import  {configureStore} from '@reduxjs/toolkit'
// import reducer from './slice'

export const store = configureStore({
   reducer: dataSlice 
})