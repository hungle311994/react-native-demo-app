/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStringFromStorage, setToStorage} from '../store/store';

import * as clr from '../utils/color';
import {showAlert} from '../utils/common';
import HSpace from '../utils/HSpace';
import {useMMKVString} from 'react-native-mmkv';

const ImportantSpending = () => {
  const [dataStorage, setDataStorage] = useMMKVString('importants');
  const [data, setData] = useState([]);
  const [isReresh, setIsReresh] = useState(false);

  const getDataFromStorage = () => {
    return JSON.parse(getStringFromStorage('importants'));
  };

  const handleDeleteTransaction = item => {
    const importants = getDataFromStorage();
    const dataFilter = importants.filter(e => e.id !== item.id);
    setToStorage('importants', JSON.stringify(dataFilter));
    showAlert('Notifications', 'Delete successfully!');
    setData(dataFilter);
  };

  const onRefresh = () => {
    setIsReresh(true);
    const importants = getDataFromStorage();
    setData(importants);
    setIsReresh(false);
  };

  useEffect(() => {
    const importants = getStringFromStorage('importants');
    if (importants) {
      setData(JSON.parse(importants));
    }
  }, []);

  useEffect(() => {}, [dataStorage]);

  return (
    <>
      {dataStorage === '[]' || dataStorage === undefined ? (
        <View style={styles.noData}>
          <Text>There is no transaction.</Text>
          <Text>Please refresh after added.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(transaction, index) => String(index)}
          refreshControl={
            <RefreshControl
              refreshing={isReresh}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }
          ItemSeparatorComponent={() => <HSpace />}
          renderItem={({item, index}) => {
            return (
              <View style={styles.item} key={index}>
                <View style={styles.type}>
                  <Image style={styles.type.icon} source={item.path} />
                </View>
                <View style={styles.info}>
                  <Text>{item.date}</Text>
                  <Text style={styles.info.price}>
                    {item.transactions_type === 'income' ? '+' : '-'}$
                    {item.amount}
                  </Text>
                  <Text>{item.note}</Text>
                </View>
                <Pressable
                  style={styles.actions}
                  onPress={() => {
                    handleDeleteTransaction(item);
                  }}>
                  <Image
                    style={styles.actions.icon}
                    source={require('../assets/icon_trash.png')}
                  />
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </>
  );
};

export default ImportantSpending;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'column',
    gap: 10,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
  },
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
  info: {
    flex: 4,
    flexDirection: 'column',
    price: {
      color: clr.black,
      fontWeight: 'bold',
    },
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    icon: {
      width: 20,
      height: 20,
      tintColor: clr.primary1,
    },
  },
});
