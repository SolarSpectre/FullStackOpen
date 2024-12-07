import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const sortedByVotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  const dispatch = useDispatch()
  const updateVote = (id) => {
    dispatch(vote(id))
  }
  const addAnecdote = (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => updateVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App