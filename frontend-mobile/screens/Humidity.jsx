import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReusableChart from '../components/ReusableChart'

const Humidity = () => {
  return (
    <View>
      <ReusableChart valuePath={"measurements/humidity"}
      value={"humidity"} title={"Humidity"}/>
    </View>
  )
}

export default Humidity

const styles = StyleSheet.create({})