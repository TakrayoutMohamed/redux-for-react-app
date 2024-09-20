# paractice-redux-for-react-app
redux for react is loading...


# redux for managing global states and caching

in the context of a self-contained app like below :

```
function Counter() {
	// State: a counter value
	const [counter, setCounter] = useState(0)

	// Action: code that causes an update to the state when something happens
	const increment = () => {
		setCounter(prevCounter => prevCounter + 1)
	}

	// View: the UI definition
	return (
		<div>
			Value: {counter} <button onClick={increment}>Increment</button>
		</div>
	)
}
```

* the **state**    : the source of the thruth that drives our app
* The **view**     : a declarative description of the UI based on the current state
* The **action**   : the event that occur in the app based on user input, and trigger updates in the state

This is a small example of "one-way data flow":

* State describes the condition of the app at a specific point in time
* The UI is rendered based on that state
* When something happens (such as a user clicking a button), the state is updated based on what occurred
* The UI re-renders based on the new state

<img src="./READMEASSETS/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png">

However, the simplicity can break down when we have ***multiple components that need to share and use the same state***, especially if those components are located in different parts of the application. Sometimes this can be solved by "lifting state up" to parent components, but that doesn't always help.

One way to solve this is to extract the shared state from the components, and put it into a centralized location outside the component tree. With this, our component tree becomes a big "view", and any component can access the state or trigger actions, no matter where they are in the tree!

By defining and separating the concepts involved in state management and enforcing rules that maintain independence between views and states, we give our code more structure and maintainability.

This is the basic idea behind Redux: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable.

## Action :

An **action** is a plain JavaScript object that has a type field. **You can think of an action as an event that describes something that happened in the application**.

The `type` field should be a string that gives this action a descriptive name, like `"todos/todoAdded"`. we usually write that type string like `"domain/evnetName"`, where the firstpart is the feature or category that this action belongs to, and the second part is the specific thing that happened.

An action can have other fields with additional information about what happened . By convention, we put that information in a field called `payload`.

A typical action object might look like this:

```
const addTodoAction = {
	type: 'todos/todoAdded',
	payload: 'Buy milk',
}
```

## Action creators: 


An action creator is a function that creates and returns an action object. We typically use these so we don't have to write the action object by hand every time:

```
const addTodo = text => {
	return {
		type: 'todos/todoAdded',
		payload: text
	}
}
```

## Reducers:

A reducer is a function that receives the current `state` and an `action` object , decides how to update the state if necessary, and returns the new state: `(state, action) => newState` . **You can think of a reducer as an event listner which handles events based on the received action (event) type**

Reducers <u>must always</u> follow some specific rules:

* They should only calculte the new state value based on the `state` and `action` arguments .
* They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
* They must be "pure" - they cannot do any asynchronous logic, calculate random values, or cause other "side effects"

The logic inside reducer functions typically follows the same series of steps:

* Check to see if the reducer cares about this action
	* if so ,make a copy of the state, update the copy with new values, and return it 
* Otherwise, return the existing state unchanged

Here's a small example of a reducer, showing the steps that each reducer should follow:

```
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
	// Check to see if the reducer cares about this action
	if (action.type === 'counter/increment') {
		// If so, make a copy of `state`
		return {
			...state,
			// and update the copy with the new value
			value: state.value + 1
		}
	}
	// otherwise return the existing state unchanged
	return state
}
```
Reducers can use any kind of logic inside to decide what the new state should be: `if/else`, `switch`, `loops`, and so on.

## Store

The current Redux application state lives in an object called the **store**.

The store is created by passing a reducer, and has a method called `getState` that returns the current state value :

```
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
```

## Dispatch

The redux store has a method called `dispatch`. **The only way to update the state is to call `store.dispatch()` and pass in an action object**. The store will run its reducer function and save the new state value inside, and we can call `getState()` to retreive the update value:

```
store.dispatch({ type: 'counter/increment' })

console.log(store.getState())
// {value: 1}
```

**You can think dispatching actions as "triggering an event"** in the application. Sothing happened, and we want the store to know about it. Reducers act like event listeners, and when they hear an action they are interested in, they update the state in response.

We typically call action creators to dispatch the right action:

```
const increment = () => {
	return {
		type: 'counter/increment'
	}
}

store.dispatch(increment())

console.log(store.getState())
// {value: 2}
```

## Selectors

**Selectors** are functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to be read the same data :

```
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
```

## Redux Application Data Flow

Earlier, we talked about "one-way data flow", which describes this sequence of steps to update the app:

* State describes the condition of the app at a specific point in time
* The UI is rendered based on that state
* When something happens (such as a user clicking a button), the state is updated based on what occurred
* The UI re-renders based on the new state

For Redux specifically, we can break these steps into more detail:

* initial setup:
	* A Redux store is created using a root reducer function
	* The store calls the root reducer once, and saves the return value as its initial state
	* When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.
* Updates:
	* Something happens in the app, such as a user clicking a button
	* The app code dispatches an action to the Redux store, like `dispatch({type: 'counter/increment'})`
	* The store runs the reducer function again with the previous `state` and the current `action`, and saves the return value as the new `state`
	* The store notifies all parts of the UI that are subscribed that the store has been updated
	* Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
	* Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen.

Here's what that data flow looks like visually:

<img src="./READMEASSETS/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif">



























