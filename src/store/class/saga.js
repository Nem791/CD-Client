import { takeLatest } from "redux-saga/effects";
import handleGetClass from "./handlers";
import { getClass } from "./slice";

export default function* classSaga() {
    yield takeLatest(getClass.type, handleGetClass)
}