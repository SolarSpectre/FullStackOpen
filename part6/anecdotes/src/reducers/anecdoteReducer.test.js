import anecdoteReducer,{ getId } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action CREATE', () => {
    const state = []
    const action = {
      type: 'CREATE',
      payload: {
        content: 'the app state is in redux store',
        votes: 0,
        id: getId()
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})