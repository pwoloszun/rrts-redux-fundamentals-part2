import React from 'react';
import { connect } from 'react-redux';

import MyList from '../../../../components/MyList';
import styles from './index.module.css';

import { thunks, selectors, actions } from '../../../../store/24b-todos'

import { statusesMapFor } from '../../../../components/MyList/item-status';
import MyTodoForm from '../../../../components/MyTodoForm';
import { Todo, TodoParams } from '../../models/todo';
import { RootState } from '../../../../store/store';

interface EntityIdBoolMap {
  [id: number]: boolean;
}

interface Props {
  todos: Todo[];
  isFetching: boolean;
  isRemoving: EntityIdBoolMap;
  isSaving: EntityIdBoolMap;
  isEditing: EntityIdBoolMap;

  fetchTodos: () => void;
  removeTodo: (item: Todo) => void;
  createTodo: (params: TodoParams) => void;
  editTodo: (item: Todo) => void;
  saveEditTodo: (item: Todo, params: TodoParams) => void;
  cancelEditTodo: (item: Todo) => void;
}

class NormalizedTodoList extends React.Component<Props> {
  render() {
    const {
      // global state
      todos,
      isFetching,

      // global actions
      removeTodo,
      editTodo,
      saveEditTodo,
      cancelEditTodo,
      createTodo,

      // feature specific state
      isRemoving,
      isSaving,
      isEditing,
    } = this.props;
    const statuses = statusesMapFor(todos, {
      removing: isRemoving,
      saving: isSaving,
      editing: isEditing,
    });
    // console.log('statuses', statuses);

    return (
      <div className={styles.todoNormalizedListCont}>
        <MyList
          isLoading={isFetching}
          items={todos}
          statuses={statuses}
          onRemove={removeTodo}
          onEdit={editTodo}
          onCancelEdit={cancelEditTodo}
          onSaveEdit={saveEditTodo}
        />
        <hr />
        <MyTodoForm
          onCreate={createTodo}
        />
      </div>
    );
  }

  componentWillMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    todos: selectors.selectAllTodos(state),
    isFetching: selectors.selectIsFetchingMany(state),
    // todos statuses
    isRemoving: selectors.selectIsRemovingTodosMap(state),
    isSaving: selectors.selectIsSavingTodosMap(state),
    isEditing: selectors.selectIsEditingTodosMap(state),
  }
};

const mapDispatchToProps = function (dispatch: any) {
  return {
    fetchTodos() {
      dispatch(thunks.fetchAllTodos());
    },
    removeTodo(item: Todo) {
      dispatch(thunks.removeTodo(item));
    },
    createTodo(params: TodoParams) {
      console.log('createTodo TODO'); // TODO
    },
    editTodo(item: Todo) {
      dispatch(actions.startEditingTodo(item));
    },
    saveEditTodo(item: Todo, params: TodoParams) {
      dispatch(thunks.optimisticUpdateTodo(item, params));
    },
    cancelEditTodo(item: Todo) {
      dispatch(actions.cancelEditingTodo(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalizedTodoList);
