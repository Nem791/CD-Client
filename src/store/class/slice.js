import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
    name: "class",
    initialState: {
        classInfo: {}, 
        classId: "",
        loading: true, 
        errorMessage:""
    },
    reducers: {
        setClass: (state,action) => ({
            ...state, 
            classInfo: action.payload,
        }),
        getClass(){}, 
        setClassId: (state,action) => ({
            ...state,
            classId: action.payload,
        }),
    }
})

export const {setClass, getClass, setClassId} = classSlice.actions;

export default classSlice.reducer;