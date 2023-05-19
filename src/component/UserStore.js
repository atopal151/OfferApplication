import { observable, makeObservable, action, runInAction } from 'mobx'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class UserStore {

    userid = "";
    name = "bb";
    role = "";
    email = "";
    address = "";
    companyName = "aa";
    error = '';

    constructor() {
        makeObservable(this, {
            userid: observable,
            name: observable,
            role: observable,
            email: observable,
            address: observable,
            companyName: observable,
            getUser: action.bound,
        })
    }

    //* async/await methot
    async getUser() {
        await firestore()
            .collection('Users')
            .where('uid', '==', auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    this.name = documentSnapshot.data().name
                    this.role = documentSnapshot.data().role
                    this.email = documentSnapshot.data().email
                    this.address = documentSnapshot.data().address
                    this.companyName = documentSnapshot.data().companyName
                });
            });
    }
}

export default new UserStore();