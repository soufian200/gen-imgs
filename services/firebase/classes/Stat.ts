import admin from "../admin";

class Stat {

    private db = admin.firestore()
    private statsCollection
    private usersDoc

    constructor() {


        this.statsCollection = this.db.collection('stats');
        this.usersDoc = this.statsCollection.doc('users')
    }

    /**
     * Increase Users Size
     * @param count Set New Count
     * */
    async increaseCountUsers(count: number) {

        await this.usersDoc.set({ count })
    }



    /**
     * Get How Many Users In DB
     * @return count
     * */
    async getCountUsers(): Promise<number> {

        const doc = await this.usersDoc.get();

        if (!doc.exists) return 0
        return doc.data()?.count || 0


    }
}

export default Stat;