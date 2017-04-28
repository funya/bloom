import 'whatwg-fetch'

export const storageKey = 'auth'

const apiRoot = "https://localhost:4000/v1"

export const Auth = {
    user: null,
    authenticate(f, u, p) {
        f.setState({ loading: true })
        f.setState({ error: false })
        let r = new Request(`${apiRoot}/sessions`, {
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
                f.setState({ loading: false })

                if (resp.status == 200) {
                    localStorage.setItem(storageKey, resp.headers.get("Authorization"))
                    f.props.history.push('/account')
                    return resp.json()
                } else {
                    f.setState({ error: true, errmsg: "Invalid username or password." })
                    
                    return resp.text()
                }
            })
            .then(data => {
                this.user = data
                console.log(this.user)
            })
            .catch(err => {
                f.setState({ loading: false, error: true, errmsg: "Oops! It looks like the internal server is down. Try again later."})
                console.log(err)
            })

    },
    signout(p) {
        console.log(p)
        let r = new Request(`${apiRoot}/sessions/mine`, {
            method: "DELETE",
            mode: "cors",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })

        fetch(r)
            .then(resp => {
                if (resp.status == 200) {
                    p.props.history.push('/')
                    localStorage.removeItem(storageKey)
                }
                return resp.text()
            })
            .then(data => {
                this.user = null
                
            })
            .catch(err => {
                console.log(err)
            })
    },
    isAuthenticated() {
        return !!this.user || !!localStorage.getItem(storageKey)
    }
}
