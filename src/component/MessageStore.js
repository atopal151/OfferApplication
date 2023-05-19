import { observable, makeObservable, action, runInAction } from 'mobx'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class MessageStore {


    realmessageList = []

    constructor() {
        makeObservable(this, {
            realmessageList: observable,
        })
    }

   

}

export default new MessageStore();