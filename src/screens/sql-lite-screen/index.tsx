import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  addContact,
  connectToDatabase,
  Contact,
  getContactV2,
  getTableNames,
  updateContact,
  deleteContact,
} from '../../db';

// Extended Contact type to include id for editing and deleting
type ContactWithId = Contact & {
  id?: number;
};

const SQLLiteScreen = () => {
  const dbRef = useRef<SQLiteDatabase | null>(null);
  const [listTab, setListTab] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactWithId>({
    firstName: '',
    name: '',
    phoneNumber: '',
  });
  const [contacts, setContacts] = useState<ContactWithId[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const initDatabase = async () => {
    try {
      const db = await connectToDatabase();
      dbRef.current = db;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initDatabase();
  }, []);

  const getTableNamesFn = useCallback(async () => {
    if (dbRef.current != null) {
      const list: string[] = await getTableNames(dbRef.current);
      setListTab(list);
    } else {
      console.log('db null');
    }
  }, []);

  const onSuccessGetContact = (data: ContactWithId[]) => {
    setContacts(data);
  };

  const handleGetContacts = () => {
    if (dbRef.current) {
      getContactV2({
        db: dbRef.current,
        onSuccess: onSuccessGetContact,
      });
    }
  };

  const handleAddOrUpdateContact = () => {
    if (!dbRef.current) {
      return;
    }

    if (isEditing && contact.id) {
      // Update existing contact
      updateContact(dbRef.current, contact.id, contact)
        .then(() => {
          // Reset form and refresh contacts
          setContact({
            firstName: '',
            name: '',
            phoneNumber: '',
          });
          setIsEditing(false);
          handleGetContacts();
        })
        .catch(error => console.error(error));
    } else {
      // Add new contact
      addContact(dbRef.current, contact)
        .then(() => {
          // Reset form and refresh contacts
          setContact({
            firstName: '',
            name: '',
            phoneNumber: '',
          });
          handleGetContacts();
        })
        .catch(error => console.error(error));
    }
  };

  const handleEditContact = (item: ContactWithId) => {
    setContact(item);
    setIsEditing(true);
  };

  const handleDeleteContact = (id: number) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            if (dbRef.current) {
              deleteContact(dbRef.current, id)
                .then(() => {
                  handleGetContacts();
                })
                .catch(error => console.error(error));
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleCancelEdit = () => {
    setContact({
      firstName: '',
      name: '',
      phoneNumber: '',
    });
    setIsEditing(false);
  };

  useEffect(() => {
    // Load contacts on initial render
    if (dbRef.current) {
      handleGetContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContactItem = ({item}: {item: ContactWithId}) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>
          {item.firstName} {item.name}
        </Text>
        <Text>{item.phoneNumber}</Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditContact(item)}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteContact(item.id!)}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Get Table" onPress={getTableNamesFn} />
      <Text>{listTab.join(', ')}</Text>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          {isEditing ? 'Edit Contact' : 'Add New Contact'}
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              value={contact?.firstName}
              placeholder="first name"
              onChangeText={text => {
                setContact(prev => ({
                  ...prev,
                  firstName: text,
                }));
              }}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={contact?.name}
              placeholder="name"
              onChangeText={text => {
                setContact(prev => ({
                  ...prev,
                  name: text,
                }));
              }}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={contact?.phoneNumber}
              placeholder="phoneNumber"
              onChangeText={text => {
                setContact(prev => ({
                  ...prev,
                  phoneNumber: text,
                }));
              }}
            />
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            title={isEditing ? 'Update Contact' : 'Add Contact'}
            onPress={handleAddOrUpdateContact}
          />

          {isEditing && (
            <Button title="Cancel" onPress={handleCancelEdit} color="#888" />
          )}
        </View>
      </View>

      <Button title="Refresh Contacts" onPress={handleGetContacts} />

      {/* Contacts List */}
      <View style={styles.contactsContainer}>
        <Text style={styles.sectionTitle}>Contacts</Text>
        {contacts.length > 0 ? (
          <FlatList
            data={contacts}
            keyExtractor={item =>
              item.id?.toString() || Math.random().toString()
            }
            renderItem={renderContactItem}
          />
        ) : (
          <Text style={styles.emptyMessage}>No contacts found</Text>
        )}
      </View>
    </View>
  );
};

export default SQLLiteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  formContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  inputContainer: {
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  contactsContainer: {
    flex: 1,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
