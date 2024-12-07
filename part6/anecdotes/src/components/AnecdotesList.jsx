import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from "react-redux";

export default function AnecdotesList(){
const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const updateVote = (id) => {
    dispatch(vote(id))
  }
  const sortedByVotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    return <>
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
    </>
}