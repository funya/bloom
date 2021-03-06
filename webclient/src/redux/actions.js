import { find, isEqual, includes, sortBy } from 'lodash';

const headerContentType = "Content-Type"
const charsetUTF8 = "charset=utf-8"
const contentTypeText = "text/plain"
const contentTypeJSON = "application/json"
const contentTypeJSONUTF8 = contentTypeJSON + "; " + charsetUTF8
const contentTypeTextUTF8 = contentTypeText + "; " + charsetUTF8
const storageKey = "auth"


export var apiRoot = "https://api.bloom.jadiego.me/v1/";
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

export const getStories = () => {
	return (dispatch, getState) => {
		const { currentUser } = getState()
		dispatch({ type: 'FETCH START', fetch: "get stories" })

		return fetch(`${apiRoot}stories`, {
			mode: "cors"
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET STORIES', data })
			})
			.catch(error => { dispatch({ type: 'FETCH END', message: error.message, fetch: "get stories" }) })
	}
}

export const signUp = (e, u, p1, p2) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "sign up" })

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
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET CURRENT USER', data })
			})
			.catch(error => { console.log(error); dispatch({ type: 'FETCH END', message: error.message, fetch: "sign up" }) })
	}
}

export const signIn = (u, p) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "sign in" })

		return fetch(`${apiRoot}sessions`, {
			method: "POST",
			mode: "cors",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				userName: u,
				password: p
			})
		})
			.then(resp => {
				localStorage.setItem(storageKey, resp.headers.get("Authorization"))
				return handleResponse(resp)
			})
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET CURRENT USER', data })
			})
			.catch(error => { dispatch({ type: 'FETCH END', message: error.message, fetch: "sign in" }) })
	}
}

export const signOut = () => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "sign out" })

		return fetch(`${apiRoot}sessions/mine`, {
			method: "DELETE",
			mode: "cors",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey)
			})
		})
			.then(handleResponse)
			.then(data => {
				localStorage.removeItem(storageKey)
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET CURRENT USER', data: {} })
			})
			.catch(error => { dispatch({ type: 'FETCH END', message: error.message, fetch: "sign out" }) })
	}
}

export const checkSession = () => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "check session" })

		return fetch(`${apiRoot}users/me`, {
			mode: "cors",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey)
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET CURRENT USER', data })
			})
			.catch(error => {
				localStorage.removeItem(storageKey)
				dispatch({ type: 'FETCH END', message: "", fetch: "check session" })
				dispatch({ type: 'SET CURRENT USER', data: {} })
			})
	}
}

export const createStory = (modal, title, description) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "create new story" })

		return fetch(`${apiRoot}stories`, {
			mode: "cors",
			method: "POST",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8,
				"Authorization": localStorage.getItem(storageKey)
			}),
			body: JSON.stringify({
				name: title,
				description: description,
				private: true

			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'ADD STORY', data })
				modal.setState({ visible: false, title: "", description: "" })
				modal.props.history.replace(`story/${data.id}/edit`)
				return data.id
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "create new story" })
				return ""
			})
	}
}

export const deleteStory = (storyid) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "delete story" })

		return fetch(`${apiRoot}stories/${storyid}`, {
			mode: "cors",
			method: "DELETE",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey)
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'DELETE STORY', storyid })
				return true
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "delete story" })
				return false
			})
	}
}

export const getMyStories = () => {
	return (dispatch, getState) => {
		const { currentUser } = getState()
		dispatch({ type: 'FETCH START', fetch: "get my stories" })

		return fetch(`${apiRoot}stories?author=${currentUser.id}`, {
			mode: "cors",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey)
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET MY STORIES', data })
			})
			.catch(error => { dispatch({ type: 'FETCH END', message: error.message, fetch: "get my stories" }) })
	}
}

export const togglePrivacy = (privacy, story) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "update privacy" })
		return fetch(`${apiRoot}stories/${story.id}`, {
			mode: "cors",
			method: "PATCH",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey),
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				name: story.name,
				description: story.description,
				private: privacy
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'UPDATE PRIVACY', storyid: story.id, data })
				return true
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "update privacy" })
				return false
			})
	}
}

export const getSections = (storyid) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "get sections" })

		return fetch(`${apiRoot}stories/${storyid}`, {
			mode: "cors",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey)
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'SET SECTIONS', data: sortBy(data, (s) => { return s.index }), storyid })
				return true
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "get sections" })
				return false
			})
	}
}

export const setCurrentPublicStory = (storyid) => {
	return (dispatch, getState) => {
		const { stories } = getState()
		let story = find(stories, (s => { return s.id === storyid }))
		return dispatch({ type: "SET CURRENT STORY", data: story })
	}
}

export const setCurrentStory = (editpage, storyid) => {
	return (dispatch, getState) => {
		const { myStories } = getState()
		let story = find(myStories, (s => { return s.id === storyid }))
		editpage.setState({ title: story.name, description: story.description })
		return dispatch({ type: "SET CURRENT STORY", data: story })
	}
}

export const createSection = (modal, text) => {
	return (dispatch, getState) => {
		dispatch({ type: 'FETCH START', fetch: "create section" })
		const { currentStory } = getState()

		return fetch(`${apiRoot}sections`, {
			method: 'POST',
			mode: "cors",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8,
				"Authorization": localStorage.getItem(storageKey)
			}),
			body: JSON.stringify({
				body: text,
				storyid: currentStory.id
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'ADD SECTION', data, storyid: currentStory.id })
				modal.setState({ visible: false, text: "" })
				return true
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "create section" })
				return false
			})
	}
}

export const createImageSection = (modal, image, text) => {
	return (dispatch, getState) => {
		dispatch({ type: 'FETCH START', fetch: "create section" })
		const { currentStory } = getState()

		var img64 = new FileReader()
		img64.readAsDataURL(image)
		return img64.onload = () => {
			return fetch(`${apiRoot}sections`, {
				method: 'POST',
				mode: "cors",
				headers: new Headers({
					"Content-Type": contentTypeJSONUTF8,
					"Authorization": localStorage.getItem(storageKey)
				}),
				body: JSON.stringify({
					body: text,
					storyid: currentStory.id,
					image: img64.result,
				})
			})
				.then(handleResponse)
				.then(data => {
					dispatch({ type: 'FETCH END', message: "", fetch: "" })
					modal.setState({ visible: false, text: "", image: {}, imageUrl: "" })
					dispatch({ type: 'ADD SECTION', data, storyid: currentStory.id })
				})
				.catch(error => {
					dispatch({ type: 'FETCH END', message: error.message, fetch: "create section" })
				})
		}
	}
}

export const editImageSection = (modal, image, text, section) => {
	return (dispatch, getState) => {
		dispatch({ type: 'FETCH START', fetch: "edit image section" })
		const { currentStory } = getState()

		var img64 = new FileReader()
		img64.readAsDataURL(image)
		return img64.onload = () => {
			return fetch(`${apiRoot}sections/${section.id}`, {
				method: 'PATCH',
				mode: "cors",
				headers: new Headers({
					"Content-Type": contentTypeJSONUTF8,
					"Authorization": localStorage.getItem(storageKey)
				}),
				body: JSON.stringify({
					body: text,
					image: img64.result,
					index: section.index
				})
			})
				.then(handleResponse)
				.then(data => {
					dispatch({ type: 'FETCH END', message: "", fetch: "" })
					modal.setState({ visible: false, text: data.text, image: undefined })
					dispatch({ type: 'EDIT SECTION', data, storyid: currentStory.id })
				})
				.catch(error => {
					dispatch({ type: 'FETCH END', message: error.message, fetch: "edit image section" })
				})
		}
	}
}

export const editSection = (modal) => {
	return (dispatch, getState) => {
		dispatch({ type: 'FETCH START', fetch: "edit section" })
		const { currentSection } = getState()
		return fetch(`${apiRoot}sections/${currentSection.id}`, {
			method: 'PATCH',
			mode: "cors",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8,
				"Authorization": localStorage.getItem(storageKey)
			}),
			body: JSON.stringify({
				body: currentSection.body,
				image: currentSection.image,
				index: currentSection.index
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'EDIT SECTION', data, storyid: currentSection.storyid })
				modal.setState({ visible: false })
			})
			.catch(error => {
				console.log(error)
				//dispatch({ type: 'FETCH END', message: error.message, fetch: "edit section" })
			})
	}
}

export const arrangeSections = (sections, oldIndex, newIndex) => {
	let storyid = sections[oldIndex].storyid
	let section1 = sections[oldIndex]
	let section2 = sections[newIndex]

	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "rearrange sections" })

		return fetch(`${apiRoot}sections/${section1.id}`, {
			mode: "cors",
			method: "PATCH",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey),
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				body: section1.body,
				image: section1.image,
				index: section1.index
			})
		})
			.then(handleResponse)
			.then(data => {
				return fetch(`${apiRoot}sections/${section2.id}`, {
					mode: "cors",
					method: "PATCH",
					headers: new Headers({
						"Authorization": localStorage.getItem(storageKey)
					}),
					body: JSON.stringify({
						body: section2.body,
						image: section2.image,
						index: section2.index
					})
				})
			})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: "REARRANGE SECTION", data: sections, storyid })

			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "rearrange sections" })
			})
	}
}

export const deleteSection = (modal, sectionid, storyid) => {
	return (dispatch, getState) => {
		dispatch({ type: 'FETCH START', fetch: "delete section" })

		return fetch(`${apiRoot}sections/${sectionid}`, {
			method: 'DELETE',
			mode: "cors",
			headers: {
				"Authorization": localStorage.getItem(storageKey)
			},
		})
			.then(handleResponse)
			.then(data => {
				modal.setState({ visible: false })
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				sortSections(data, dispatch, storyid)
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "delete section" })
			})
	}
}

const sortSections = (sections, dispatch, storyid) => {
	sections = sortBy(sections, (s) => { return s.index })
	Promise.all(
		sections.map((ele, index) => {
			dispatch({ type: 'FETCH ARRANGE START', fetch: "rearrange sections after delete" })
			return fetch(`${apiRoot}sections/${ele.id}`, {
				mode: "cors",
				method: "PATCH",
				headers: new Headers({
					"Authorization": localStorage.getItem(storageKey),
					"Content-Type": contentTypeJSONUTF8
				}),
				body: JSON.stringify({
					body: ele.body,
					image: ele.image,
					index: index
				})
			})
				.then(handleResponse)
				.then(data => {
					dispatch({ type: 'FETCH ARRANGE END', message: "", fetch: "" })
					return data
				})
		})
	)
		.then(data => {
			dispatch({ type: 'REARRANGE SECTION', data, storyid })
		})
		.catch(error => {
			dispatch({ type: 'FETCH END', message: error.message, fetch: "rearrange sections after delete" })
		})
}

export const setCurrentEditSection = (section) => {
	return dispatch => {
		dispatch({ type: "SET CURRENT SECTION", data: section })
	}
}

export const handleTextSection = (text) => {
	return dispatch => {
		dispatch({ type: "UPDATE NEW SECTION TEXT", data: text })
	}
}

export const handleImage = (newImageBlob, newImageFile) => {
	return dispatch => {
		dispatch({ type: "UPDATE NEW SECTION IMAGE", data: { newImageBlob, newImageFile } })
	}
}

export const setGridWidth = (event) => {
	return dispatch => {
		dispatch({ type: "SET GRID WIDTH", data: event.target.value })
	}
}

export const updateTitle = (editpage, title) => {
	return (dispatch, getState) => {
		const { currentStory } = getState()

		dispatch({ type: 'FETCH START', fetch: "update story title" })
		return fetch(`${apiRoot}stories/${currentStory.id}`, {
			mode: "cors",
			method: "PATCH",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey),
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				name: title,
				description: currentStory.description,
				private: currentStory.private
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'UPDATE TITLE', data })
				editpage.setState({ disabledTitle: true })
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "update story title" })
			})
	}
}

export const updateDescription = (editpage, description) => {
	return (dispatch, getState) => {
		const { currentStory } = getState()

		dispatch({ type: 'FETCH START', fetch: "update story description" })
		return fetch(`${apiRoot}stories/${currentStory.id}`, {
			mode: "cors",
			method: "PATCH",
			headers: new Headers({
				"Authorization": localStorage.getItem(storageKey),
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				name: currentStory.name,
				description: description,
				private: currentStory.private
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				dispatch({ type: 'UPDATE DESCRIPTION', data })
				editpage.setState({ disabledDescription: true })
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "update story description" })
			})
	}
}

export const sendResetCode = (resetpage, email) => {
	return (dispatch) => {
		dispatch({ type: 'FETCH START', fetch: "send reset code" })
		return fetch(`${apiRoot}resetcodes`, {
			mode: "cors",
			method: "POST",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				email: email
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				resetpage.setState({ successmessage: data })
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "send reset code" })
			})
	}
}

export const verifyCode = (resetpage, code, email, password, passwordConf) => {
	return dispatch => {
		dispatch({ type: 'FETCH START', fetch: "reset password" })
		return fetch(`${apiRoot}passwords/${email}`, {
			mode: "cors",
			method: "PUT",
			headers: new Headers({
				"Content-Type": contentTypeJSONUTF8
			}),
			body: JSON.stringify({
				code: code,
				password: password,
				passwordConf: passwordConf
			})
		})
			.then(handleResponse)
			.then(data => {
				dispatch({ type: 'FETCH END', message: "", fetch: "" })
				resetpage.setState({ successmessage: data })
			})
			.catch(error => {
				dispatch({ type: 'FETCH END', message: error.message, fetch: "reset password" })
			})
	}
}
