export const storageKey = 'auth'

export const currentUser = null

export const Auth = {
    isAuthenticated: false,
    authenticate(u, p) {
        this.isAuthenticated = true

        let r = new Request("https://localhost:4000/v1/sessions", {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                userName: u,
                password: p
            })
        })

        fetch(r)
            .then(resp => {
                console.log(resp)
                return resp.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}
