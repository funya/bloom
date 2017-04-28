import 'whatwg-fetch'

export const storageKey = 'auth'

export const currentUser = null

export const Auth = {
    user: null,
    authenticate(f, u, p) {
        this.isAuthenticated = true
        console.log(f)
        f.setState({loading: true})
        f.setState({error: false})
        let r = new Request("https://localhost:4000/v1/sessions", {
            method: "POST",
            redirect: "/account",
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
                f.setState({loading: false})
                
                if (resp.status != 200) {
                    f.setState({error: true})
                    return resp.text()
                } else {
                    localStorage.setItem(storageKey, resp.headers.get("Authorization"))
                    f.props.history.push('/account')
                    return resp.json()
                }
            })
            .then(data => {
                console.log(data)
                this.user = data
            })
            .catch(err => {
                console.log(err)
            })
        
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    },
    isAuthenticated() {
        return !!this.user || !!localStorage.getItem(storageKey)
    }
}
