import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();
export const UserContext	=	createContext({
	userId: null,
	firstname: null,
	lastname: null,
	username: null,
	token: null,
	login: () => {},
	logout: () => {}
});	
// Build a provider 
export const StateProvider = ({reducer, initialState, children}) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
)
export const useStateValue = () => useContext(StateContext);