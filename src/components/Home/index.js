import {useState} from 'react'
import {v4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const Home = () => {
  const [task, setTask] = useState('')
  const [tag, setTag] = useState(tagsList[0].displayText)
  const [activeTag, setActiveTag] = useState('INITIAL')
  const [taskList, setTaskList] = useState([])
  const filteredList =
    activeTag === 'INITIAL'
      ? taskList
      : taskList.filter(each => each.tag === activeTag)
  const handleSubmit = e => {
    e.preventDefault()
    const each = {
      id: v4(),
      task,
      tag,
    }
    setTaskList(prevList => [...prevList, each])
    setTask('')
    setTag('')
  }
  const handleTag = e => {
    setActiveTag(prevState =>
      prevState.activeTag === e.target.value ? 'INITIAL' : e.target.value,
    )
  }

  return (
    <div className="main">
      <div className="main-left">
        <h1 className="heading">Create a Task!</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="task">Task</label>
          <br />
          <input
            id="task"
            placeholder="Enter the task here"
            onChange={e => setTask(e.target.value)}
            style={{color: 'black'}}
            value={task}
          />
          <br />
          <label htmlFor="tags">Tags</label>
          <br />
          <select
            id="tags"
            style={{color: 'black'}}
            onChange={e => setTag(e.target.value)}
            value={tag}
          >
            {tagsList.map(each => (
              <option
                style={{color: 'black'}}
                value={each.optionId}
                key={each.optionId}
              >
                {each.displayText}
              </option>
            ))}
          </select>
          <br />
          <button type="submit" style={{color: 'black'}}>
            Add Task
          </button>
        </form>
      </div>
      <div className="main-right">
        <h1>Tags</h1>
        <ul className="tags">
          {tagsList.map(each => (
            <li className="eachTag" key={each.optionId}>
              <button
                type="button"
                className={
                  activeTag === each.optionId ? 'active-tags-btn' : 'tags-btn'
                }
                key={each.optionId}
                onClick={e => handleTag(e)}
                value={each.optionId}
              >
                {each.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1>Tasks</h1>
        {taskList.length !== 0 ? (
          <ul>
            {filteredList.map(each => (
              <li className="eachTask" key={each.id}>
                <p>{each.task}</p>
                <button type="button" className="taskBtn">
                  {each.tag}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Tasks Added Yet</p>
        )}
      </div>
    </div>
  )
}

export default Home
