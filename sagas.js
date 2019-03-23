import Saga,{effects} from './libs/redux-saga'
import regeneratorRuntime from './libs/regenerator-runtime/runtime';
const { put, takeEvery } = effects;

function* mySaga() {
    yield takeEvery("ADD", (e)=>{
      console.log("hello saga",e)
    });
}

export default mySaga;