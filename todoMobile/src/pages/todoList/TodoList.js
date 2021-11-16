import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'

import axios from 'axios'

import TodoCard from '../../components/todoCard'


const TodoList = ({ navigation }) => {

    const [todoList, setTodoList] = useState([])


    useEffect(() => {
        fetcData()
    }, [])

    const fetcData = async () => {
        const { data } = await axios.get('http://10.0.3.2:8000/todos/')
        setTodoList(data.results)
    }

    const renderTodoList = ({ item }) => <TodoCard todo={item} navigation={navigation}/>
    return (
        <View>

            <Text>Merhaba</Text>

            <FlatList
                data={todoList}
                renderItem={renderTodoList}
            />

        </View>
    )
}

export default TodoList
