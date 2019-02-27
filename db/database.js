import {SQLite} from 'expo';
import migrations from './migrations'

/*
Find the god dam db file
    cd Library/Developer/CoreSimulator/Devices
    find $PWD -name “db.db” -print
 */
const db = SQLite.openDatabase('db.db');
export default class Database {

    constructor() {
    }

    async migrate() {
        return new Promise(async (resolve, reject) => {
            await this.createMigrationTable();
            let version = await this.getLatestMigrationVersion();
            // set version to 0 if null
            version = version.version === null ? 0 : version.version;
            console.log('Latest migration', version);
            for (let i = 0; i < migrations.queries.length; i++) {
                let query=migrations.queries[i];
                // Check syntax
                if (query.version === undefined) throw new Error("Missing Version");
                if (query.query === undefined) throw new Error("Missing Query");
                //Only run it if it is a new migration
                if (version < query.version) {
                    console.log('run:', query);
                    let s = await this.runMigration(query.query, query.version);
                    console.log('huh?', s);
                    if (!s) reject(s);
                }
            }
            resolve(version);
        })
    };

    async runMigration(query, version) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    null,
                    async () => {
                        await this.addVersion(version);
                        resolve(true)
                    },
                    (t, e) => {
                        console.log('Error in run migration:', e);
                        resolve(false)
                    }
                );
            });
        });
    }

    async addVersion(version) {
        return new Promise(function (resolve, reject) {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO migrations (version) VALUES ("${version}");`,
                    null,
                    () => {
                        resolve(true)
                    },
                    (t, e) => {
                        // Give back the error
                        reject(e)
                    }
                );
            });
        });
    }


    /**
     *
     */
    createMigrationTable() {
        return new Promise(function (resolve, reject) {
            db.transaction(tx => {
                tx.executeSql(
                    'create table if not exists migrations (id integer primary key not null, version text UNIQUE NOT NULL);',
                    null,
                    () => {
                        resolve(true)
                    },
                    (t, e) => {
                        console.log('migration error:', e);
                        resolve(false)
                    }
                );
            });
        });
    }

    getLatestMigrationVersion() {
        return new Promise(function (resolve, reject) {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT MAX(version) as version FROM migrations;',
                    null,
                    (t, rs) => {
                        resolve(rs.rows._array[0])
                    },
                    (t, e) => {
                        console.log('error fetching latest migration version:', e);
                        resolve(false)
                    }
                );
            });
        });
    }
}
