import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReusableChart from '../components/ReusableChart'

const Temperature = () => {
  return (
    <View>
      <ReusableChart valuePath={"measurements/temperature"}
      value={"temperature"} title={"Temperature"}/>
    </View>
  )
}

export default Temperature

const styles = StyleSheet.create({})