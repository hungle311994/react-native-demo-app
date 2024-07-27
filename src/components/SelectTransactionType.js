import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';

import * as clr from '../utils/color';

const SelectTransactionType = ({onSelectType}) => {
  const [isAll, setIsAll] = useState(true);
  const [isIncome, setIsIncome] = useState(false);
  const [isExpense, setIsExpense] = useState(false);

  const handleSelectType = type => {
    setIsAll(type === 'all');
    setIsIncome(type === 'income');
    setIsExpense(type === 'expense');
    onSelectType(type);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.typeBtn}
        onPress={() => {
          handleSelectType('all');
        }}>
        <View style={styles.typeBtn.type}>
          <Image
            style={styles.typeBtn.iconAll}
            source={require('../assets/icon_select_all.png')}
          />
        </View>
        {isAll && <Text style={styles.typeBtn.text}>All</Text>}
      </Pressable>
      <Pressable
        style={styles.typeBtn}
        onPress={() => {
          handleSelectType('income');
        }}>
        <View style={styles.typeBtn.type}>
          <Image
            style={styles.typeBtn.iconType}
            source={require('../assets/icon_income.png')}
          />
        </View>
        {isIncome && <Text style={styles.typeBtn.text}>Income</Text>}
      </Pressable>
      <Pressable
        style={styles.typeBtn}
        onPress={() => {
          handleSelectType('expense');
        }}>
        <View style={styles.typeBtn.type}>
          <Image
            style={styles.typeBtn.iconType}
            source={require('../assets/icon_expense.png')}
          />
        </View>
        {isExpense && <Text style={styles.typeBtn.text}>Expense</Text>}
      </Pressable>
    </View>
  );
};

export default SelectTransactionType;

const styles = StyleSheet.create({
  container: {
    backgroundColor: clr.primary,
    paddingHorizontal: 15,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  typeBtn: {
    height: 60,
    backgroundColor: clr.primary1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
    gap: 10,
    type: {
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: clr.primary,
      borderRadius: 100,
    },
    iconAll: {
      width: 40,
      height: 40,
      tintColor: clr.txtWhite,
    },
    iconType: {
      width: 20,
      height: 20,
      tintColor: clr.txtWhite,
    },
    text: {
      color: clr.txtWhite,
      marginRight: 10,
    },
  },
});
