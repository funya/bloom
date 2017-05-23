import 'whatwg-fetch'

export const storageKey = 'auth'

export var apiRoot = "https://api.chayabloom.me/v1";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  apiRoot = "https://localhost:4000/v1"
};

export const Auth = {
    authenticate(f, u, p) {
        f.setState({ loading: true, error: false })
        fetch(`${apiRoot}/sessions`, {
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
            .then(resp => {
                f.setState({ loading: false })

                if (resp.ok) {
                    localStorage.setItem(storageKey, resp.headers.get("Authorization"))
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                localStorage.setItem("u", JSON.stringify(data))
                f.props.history.push('/account')
            })
            .catch(err => {
                console.log(err)
                if (err.status === 401) {
                    f.setState({ error: true, errmsg: "Invalid username or password." })
                } else {
                    f.setState({ loading: false, error: true, errmsg: "Oops! It looks like the internal server is down. Try again later." })
                }
            })

    },
    signout(p) {
        fetch(`${apiRoot}/sessions/mine`, {
            method: "DELETE",
            mode: "cors",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })
            .then(resp => {
                if (resp.ok) {
                    localStorage.removeItem(storageKey)
                    localStorage.removeItem("u")
                }
                return resp.text()
            })
            .then(data => {
                p.props.history.push('/')
                p.forceUpdate()
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    signup(f, e, u, p1, p2) {
        f.setState({ loading: true, error: false })
        fetch(`${apiRoot}/users`, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                userName: u,
                password: p1,
                passwordConf: p2,
                email: e
            })
        })
            .then(resp => {
                f.setState({ loading: false })

                if (resp.ok) {
                    localStorage.setItem(storageKey, resp.headers.get("Authorization"))
                    f.props.history.push('/account')
                    return resp.json()
                } else {
                    f.setState({ error: true })

                    return resp.text()
                }
            })
            .then(data => {
                f.setState({ errmsg: data })
                this.user = data
                console.log(this.user)
            })
            .catch(err => {
                f.setState({ loading: false, error: true, errmsg: "Oops! It looks like the internal server is down. Try again later." })
                console.log(err)
            })
    }
}