/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HSpace from '../utils/HSpace';
import {categories} from '../utils/common';
import Transaction from './Transaction';
import {useNavigation} from '@react-navigation/native';

const Transactions = ({
  type,
  transactions,
  onHandleShowModalEditTransaction,
  onHandleDeleteTransaction,
}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempData = [];
    if (type === 'income') {
      tempData = transactions.filter(e => e.transactions_type === 'income');
    } else if (type === 'expense') {
      tempData = transactions.filter(e => e.transactions_type === 'expense');
    } else {
      tempData = transactions;
    }
    setData(tempData);
  }, [type]);

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        {data !== null &&
          data.map((item, index) => {
            const getIconCategory = cat => {
              if (categories) {
                const category = categories.find(c => c.category === cat);
                return category.value;
              }
            };
            const tempItem = {
              ...item,
              path: getIconCategory(item.category),
            };
            return (
              <View key={index}>
                <Pressable
                  onPress={() => {
                    navigation.push('Transaction', {
                      transaction: tempItem,
                      name: item.title,
                    });
                  }}>
                  <Transaction
                    data={tempItem}
                    onHandleShowModalEditTransaction={
                      onHandleShowModalEditTransaction
                    }
                    onHandleDeleteTransaction={onHandleDeleteTransaction}
                  />
                </Pressable>
                <HSpace />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
  },
});
