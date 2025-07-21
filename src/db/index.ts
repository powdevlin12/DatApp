import {Alert} from 'react-native';
import {
  enablePromise,
  openDatabase,
  ResultSet,
  ResultSetRowList,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

type Table = 'Contacts' | 'UserPreferences';

export type Contact = {
  firstName: string;
  name: string;
  phoneNumber: string;
};

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'my.db', location: 'default'},
    () => {
      console.log('Create database success');
    },
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const userPreferencesQuery = `
    CREATE TABLE IF NOT EXISTS UserPreferences (
        id INTEGER DEFAULT 1,
        colorPreference TEXT,
        languagePreference TEXT,
        PRIMARY KEY(id)
    )
  `;
  const contactsQuery = `
   CREATE TABLE IF NOT EXISTS Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      name TEXT,
      phoneNumber TEXT
   )
  `;
  try {
    await db.executeSql(userPreferencesQuery);
    await db.executeSql(contactsQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
};

export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );
    results?.forEach(result => {
      console.log({result});
      for (let index = 0; index < result.rows.length; index++) {
        console.log({el: result.rows.item(index)});
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get table names from database');
  }
};

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
  try {
    const insertQuery = `
  INSERT INTO Contacts (firstName, name, phoneNumber)
   VALUES (?, ?, ?)
  `;
    const values = [contact.firstName, contact.name, contact.phoneNumber];
    const result = await db.executeSql(insertQuery, values);
    console.log({result});
    if (result[0].rowsAffected !== 0) {
      Alert.alert('Add contact success');
    }
    return result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to add contact');
  }
};

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  console.log('get contacts');
  try {
    const contacts: Contact[] = [];
    const results = await db.executeSql('SELECT * FROM Contacts');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        contacts.push(result.rows.item(index));
      }
    });
    console.log({
      contacts,
    });
    return contacts;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Contacts from database');
  }
};

const handleData = <T>(rows: ResultSetRowList): T[] => {
  const data: T[] = [];
  for (let index = 0; index < rows.length; index++) {
    data.push(rows.item(index));
  }
  return data;
};

export const getContactV2 = ({
  onSuccess,
  db,
}: {
  db?: SQLiteDatabase;
  onSuccess: (d: Contact[]) => void;
}) => {
  if (db) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Contacts',
        [],
        (_, {rows}) => {
          const data = handleData<Contact>(rows);
          onSuccess(data);
        },
        (_, error) => console.log('Query error', error),
      );
    });
  }
};

export const updateContact = async (
  db: SQLiteDatabase,
  id: number,
  contact: Contact,
) => {
  try {
    const updateQuery = `
      UPDATE Contacts
      SET firstName = ?, name = ?, phoneNumber = ?
      WHERE id = ?
    `;
    const values = [contact.firstName, contact.name, contact.phoneNumber, id];
    const result = await db.executeSql(updateQuery, values);

    if (result[0].rowsAffected !== 0) {
      Alert.alert('Contact updated successfully');
    } else {
      Alert.alert('Failed to update contact', 'Contact not found');
    }
    return result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to update contact');
  }
};

export const deleteContact = async (db: SQLiteDatabase, id: number) => {
  try {
    const deleteQuery = `
      DELETE FROM Contacts
      WHERE id = ?
    `;
    const values = [id];
    const result = await db.executeSql(deleteQuery, values);

    if (result[0].rowsAffected !== 0) {
      Alert.alert('Contact deleted successfully');
    } else {
      Alert.alert('Failed to delete contact', 'Contact not found');
    }
    return result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to delete contact');
  }
};
