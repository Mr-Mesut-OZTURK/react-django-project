import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import axios from 'axios'

const App = () => {

  const [todoList, setTodoList] = useState([])


  useEffect(() => {
    fetcData()
  }, [])

  const fetcData = async () => {
    const { data } = await axios.get('http://10.0.3.2:8000/todos/')
    // console.log(data.results)

    setTodoList(data.results)
  }

  const renderTodoList = ({item}) => <Text>{item.title}</Text>
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

export default App
