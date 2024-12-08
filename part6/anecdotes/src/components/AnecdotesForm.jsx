import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/notificationReducer";

export default function AnecdoteForm() {
    const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(setMessage(`you created a new anecdote: '${content}'`))
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
