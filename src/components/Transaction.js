import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import * as clr from '../utils/color';

const Transaction = ({
  data,
  onHandleShowModalEditTransaction,
  onHandleDeleteTransaction,
}) => {
  const handleEditTransaction = item => {
    onHandleShowModalEditTransaction(item);
  };

  const handleDeleteTransaction = item => {
    onHandleDeleteTransaction(item);
  };

  const styles = StyleSheet.create({
    transaction: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      position: 'relative',
      type: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: clr.primary1,
        borderRadius: 100,
        marginRight: 10,
        icon: {
          width: 25,
          height: 25,
          tintColor: '#fff',
        },
      },
      transactionInfo: {
        flex: 4,
        flexDirection: 'column',
        price: {
          color: data.transactions_type === 'income' ? clr.black : clr.err,
          fontWeight: 'bold',
        },
      },
      actions: {
        flexDirection: 'row',
        gap: 10,
      },
      icon: {
        width: 20,
        height: 20,
        tintColor: clr.primary1,
      },
    },
  });

  return (
    <View style={styles.transaction}>
      <View style={styles.transaction.type}>
        <Image style={styles.transaction.type.icon} source={data.path} />
      </View>
      <View style={styles.transaction.transactionInfo}>
        <Text>{data.date}</Text>
        <Text style={styles.transaction.transactionInfo.price}>
          {data.transactions_type === 'income' ? '+' : '-'}${data.amount}
        </Text>
        <Text>{data.note}</Text>
      </View>
      <View style={styles.transaction.actions}>
        <Pressable
          onPress={() => {
            handleEditTransaction(data);
          }}>
          <Image
            style={styles.transaction.icon}
            source={require('../assets/icon_pencil.png')}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            handleDeleteTransaction(data);
          }}>
          <Image
            style={styles.transaction.icon}
            source={require('../assets/icon_trash.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Transaction;
