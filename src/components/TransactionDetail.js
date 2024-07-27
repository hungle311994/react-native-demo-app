/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, endpoint} from '../api/api';

import * as clr from '../utils/color';
import Devider from '../utils/Devider';
import {Pressable} from 'react-native';
import {height, showAlert} from '../utils/common';
import {getStringFromStorage, setToStorage} from '../store/store';

const TransactionDetail = ({route}) => {
  const {transaction} = route.params;
  const [data, setData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const getTransactionDetail = async () => {
    try {
      const response = await fetch(
        BASE_URL + endpoint.getTransactionById(transaction.id),
      );
      const result = await response.json();
      setData(result.transaction);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onRefresh = () => {
    setIsRefresh(true);
    getTransactionDetail().then(() => {
      setTimeout(() => {
        setIsRefresh(false);
      }, 2000);
    });
  };

  const addToImportantSpending = e => {
    let tempData = [];
    const importants = getStringFromStorage('importants');
    if (importants !== undefined) {
      tempData = JSON.parse(importants);
    }
    const itemAdded = tempData.find(item => item.id === e.id);
    if (itemAdded) {
      showAlert('Notifications', 'Already added to important');
      return;
    }
    tempData.unshift(e);
    setToStorage('importants', JSON.stringify(tempData));
    showAlert('Notifications', 'Add to important successfully!');
  };

  useEffect(() => {
    getTransactionDetail();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        {/* Price */}
        <View style={styles.price}>
          <Text style={styles.price.usd}>$</Text>
          <Text style={styles.price.amount}>{transaction.amount}</Text>
        </View>
        {/* Transaction Type */}
        <View style={styles.types}>
          <Text style={styles.type}>{transaction.transactions_type}</Text>
        </View>
        <Devider color={clr.txtLightestGrey} />
        {/* Category */}
        <View style={styles.category}>
          <View style={styles.categoryImage}>
            <Image
              style={styles.categoryImage.icon}
              source={transaction.path}
            />
          </View>
          <View style={styles.categoryTitle}>
            <Text style={styles.categoryTitle.text}>Category:</Text>
            <Text style={styles.categoryTitle.name}>
              {transaction.category}
            </Text>
          </View>
        </View>
        <Devider color={clr.txtLightestGrey} />
        {/* Note */}
        <View style={styles.note}>
          <View style={styles.noteImage}>
            <Image
              style={styles.noteImage.icon}
              source={require('../assets/icon_notes.png')}
            />
          </View>
          <Text>{transaction.note ?? '-'}</Text>
        </View>
        <Devider color={clr.txtLightestGrey} />
        {/* Date */}
        <View style={styles.date}>
          <View style={styles.dateImage}>
            <Image
              style={styles.dateImage.icon}
              source={require('../assets/icon_calendar.png')}
            />
          </View>
          <Text>{transaction.date}</Text>
        </View>
        {/* Add To Important Spending */}
        <Pressable
          onPress={() => {
            addToImportantSpending(transaction);
          }}
          style={styles.addBtn}>
          <Text style={styles.addBtn.text}>Add To Important Spending</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    height: height - 85,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'column',
    gap: 20,
  },
  numberInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    inStock: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      inStockIcon: {
        width: 25,
        height: 25,
      },
    },
    discount: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      discountIcon: {
        width: 23,
        height: 23,
      },
    },
    rating: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      ratingIcon: {
        width: 26,
        height: 26,
      },
    },
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: 10,
    usd: {
      color: clr.black,
      fontSize: 20,
      fontWeight: 'bold',
    },
    amount: {
      color: clr.black,
      fontSize: 45,
    },
  },
  types: {
    alignSelf: 'flex-start',
    backgroundColor: clr.lightestGrey,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 100,
  },
  type: {
    textTransform: 'uppercase',
    color: clr.black,
    fontSize: 12,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  categoryImage: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: clr.primary1,
    borderRadius: 100,
    icon: {
      width: 15,
      height: 15,
      tintColor: '#fff',
    },
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    name: {
      fontSize: 13,
      color: clr.black,
      fontWeight: 'bold',
    },
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  noteImage: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    icon: {
      width: 25,
      height: 25,
    },
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  dateImage: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    icon: {
      width: 20,
      height: 20,
    },
  },
  addBtn: {
    backgroundColor: clr.primary1,
    marginTop: 'auto',
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    text: {
      color: clr.txtWhite,
    },
  },
});
