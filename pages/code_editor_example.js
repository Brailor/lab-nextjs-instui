import React from 'react'
import {CodeEditor} from '@instructure/ui-code-editor'

class Example extends React.Component {
    constructor (props) {
      super()
      this.state = { code: `function findSequence(goal) {
    function find(start, history) {
      if (start == goal)
        return history;
      else if (start > goal)
        return null;
      else
        return find(start + 5, "(" + history + " + 5)") ||
               find(start * 3, "(" + history + " * 3)");
    }
    return find(1, "1");
  }` }
    }
  
    handleChange = (value) => {
      this.setState({ code: value})
    }
  
    render () {
      return (
        <CodeEditor
          label='code editor'
          value={this.state.code}
          language='javascript'
          options={{ lineNumbers: false }}
          onChange={this.handleChange}
        />
      )
    }
  }

  export default Example