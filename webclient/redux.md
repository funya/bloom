# Presentational Components
- how things look(markup, styles)
- *NOT* aware of Redux
- read data from *props*
- change data by invoking *callbacks* from props

# Container Components
- how things work (data fetching, state updates)
- *aware* of Redux
- read data by subscribing to Redux state
- change data by dispatching redux actions

# Actions
- defines facts about "what happened"
- payloads of information that send data from application to the store
- define actions by strings
- just a big switch case
- *Action Creators* are functions that create actions, they return an action
    - an action return an action type, and the payload

# Reducers
- defines the updates to the state according to actions
- specify how the application's state changes in response
- it's a *pure function*
- it calculates the next state and returns it. thats it.
- redux will call the reducer for

# Store
- holds app state
- there is only a *single* store in redux app