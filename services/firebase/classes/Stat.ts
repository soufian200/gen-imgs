import admin from "../admin";

class Stat {

    private db = admin.firestore()
    private statsCollection
    private usersDoc
    private unverifiedUsersDoc

    constructor() {
        this.statsCollection = this.db.collection('stats');
        this.usersDoc = this.statsCollection.doc('users')
        this.unverifiedUsersDoc = this.statsCollection.doc('unverified')
    }

    /**
     * 
     * Increase Users Size
     * @param count Set New Count
     * */
    async increaseCountUsers(count: number) {
        await this.usersDoc.set({ count })
    }
    /**
     * 
     * Get How Many Users In DB
     * @return count
     * */
    async getCountUsers(): Promise<number> {
        // Get User Doc
        const doc = await this.usersDoc.get();
        // Check If Doc Exists
        if (!doc.exists) return 0
        // Return Users Count
        return doc.data()?.count || 0
    }
    /**
    * 
    * Increase unverfied Users Size
    * @param unverfied Set New unverfied users
    * */
    async increaseUnverfiedUsers(unverfied: number) {
        await this.unverifiedUsersDoc.set({ unverfied })
    }
    /**
     * 
     * Get How Many Users In DB
     * @return Unverfied count
     * */
    async getUnverfiedUsers(): Promise<number> {
        // Get User Doc
        const doc = await this.unverifiedUsersDoc.get();
        // Check If Doc Exists
        if (!doc.exists) return 0
        // Return Unverfied Count
        return doc.data()?.unverfied || 0
    }
}

export default Stat;