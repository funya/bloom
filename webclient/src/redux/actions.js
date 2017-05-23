import { find, isEqual, includes } from 'lodash';

const headerContentType = "Content-Type"
const charsetUTF8 = "charset=utf-8"
const contentTypeText = "text/plain"
const contentTypeJSON = "application/json"
const contentTypeJSONUTF8 = contentTypeJSON + "; " + charsetUTF8
const contentTypeTextUTF8 = contentTypeText + "; " + charsetUTF8
const storageKey = "auth"


export var apiRoot = "https://api.chayabloom.me/v1/";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
	apiRoot = "https://localhost:4000/v1/"
}

//Handler for fetch calls that either calls handleJSONResponse or handleTextresponse
//depending on the response from fetch call
export const handleResponse = (response) => {
	let contentType = response.headers.get(headerContentType)
	if (contentType.includes(contentTypeJSON)) {
		return handleJSONResponse(response)
	} else if (contentType.includes(contentTypeText)) {
		return handleTextResponse(response)
	} else {
		//For other response types besides JSON and text
		throw new Error(`Sorry, content-type ${contentType} not yet supported`)
	}
}

//Handler for JSON response fetch calls
export const handleJSONResponse = (response) => {
	return response.json()
		.then(json => {
			if (response.ok) {
				return json
			} else {
				return Promise.reject(Object.assign({}, json, {
					status: response.status,
					statusText: response.statusText
				}))
			}
		})
}

//Handler for Text response fetch calls
export const handleTextResponse = (response) => {
	return response.text()
		.then(text => {
			if (response.ok) {
				return text
			} else {
				return Promise.reject({
					status: response.status,
					message: text,
				})
			}
		})
}

export const signUp = (event, e, u, p1, p2) => {
	event.preventDefault()

	return dispatch => {
		dispatch({ type: 'FETCH START' })

		return fetch(`${apiRoot}users`, {
			method: "POST",
			mode: "cors",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				userName: u,
				password: p1,
				passwordConf: p2,
				email: e
			})
		})
			.then(resp => {
				localStorage.setItem(storageKey, resp.headers.get("Authorization"))
				return handleResponse(resp)
			})
			.then(data => {
				dispatch({ type: 'SET CURRENT USER', data })
				dispatch({ type: 'FETCH END', message: "" })
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message })
			})
	}
}

